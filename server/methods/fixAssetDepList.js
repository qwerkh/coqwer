import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {moment} from  'meteor/momentjs:moment';

// Collection

import {Co_FixAsset} from '../../imports/collection/fixAsset';
import {Co_Company} from '../../imports/collection/company';
import {Co_Exchange} from '../../imports/collection/exchange';

Meteor.methods({
    co_fixAssetDepList: function (params) {
        if (!this.isSimulation) {
            var data = {
                title: {},
                header: {},
                content: [{
                    index: 'No Result'
                }],
                footer: {}
            };


            /****** Title *****/
            data.title = Co_Company.findOne();

            /****** Header *****/

            params.rolesAreaName = Meteor.call("getBranchHeader", [params.rolesArea]);

            data.header = params;

            /****** Content *****/

            var self = params;
            var selector = {};
            var content = "";


            selector._id = params._id;
            var depList = Co_FixAsset.findOne(selector);

            if (depList && depList.transaction.length != 0) {
                let cumDeprec = 0;
                let bvEndYear = depList.value;
                let accountDoc = Meteor.call("getChartAccountById", depList.account);

                content += "<tr style='background-color: #e5e5e5'><td colspan='6'>" + accountDoc.code + " : " + accountDoc.name + " : " + numeral(depList.value).format('0,0.00') + getCurrenySymbol(depList.currencyId) + "</td></tr>";
                depList.transaction.forEach(function (obj) {
                    cumDeprec += obj.perYear;
                    bvEndYear -= obj.perYear;
                    content += "<tr><td>" + obj.year + "</td><td>" + numeral(obj.perMonth).format('0,0.00') + "</td><td>" + numeral(obj.perYear).format('0,0.00') + "</td><td>" + numeral(cumDeprec).format('0,0.00') + "</td><td>" + numeral(bvEndYear).format('0,0.00') + "</td><td>" + obj.month + "</td></tr>";

                })
            }
            data.content = content;
            return data;
        }
    },

    co_fixAssetDepSummaryList: function (params) {
        if (!this.isSimulation) {
            var data = {
                title: {},
                header: {},
                content: [{
                    index: 'No Result'
                }],
                footer: {}
            };


            /****** Title *****/
            data.title = Co_Company.findOne();

            /****** Header *****/
            params.date = moment().format('DD/MMMM/YYYY');

            let exchangeData = Co_Exchange.findOne({_id: params.exchangeId});

            params.rolesAreaName = Meteor.call("getBranchHeader", [params.rolesArea]);
            params.exchangeData = moment(exchangeData.exDate).format("DD/MM/YYYY") + ' | ' + JSON.stringify(exchangeData.rates)


            data.header = params;
            /****** Content *****/

            var self = params;
            var selector = {};
            var content = "";


            selector.rolesArea = self.rolesArea;
            selector.isDep = false;


            var depList = Co_FixAsset.find(selector).fetch();
            // var depConfig = ConfigDep.findOne({});

            var accountShow = "";
            if (depList.length != 0) {
                depList.sort(compareASD);
                var i = 0;
                var totalAmount = 0;
                var totalCumDeprec = 0;
                var totalDepExp = 0;
                var totalNetBookValue = 0;
                var baseCurrency = Co_Company.findOne({}).baseCurrency;
                var mainCurrency = getCurrenySymbol(baseCurrency)

                // var exchangeId = Co_Exchange.findOne({_id: self.exchangeId})._id;
                depList.forEach(function (obj) {


                    var cumDeprec = 0;
                    var monthDep = 0;
                    var depExp = 0;

                    obj.transaction.forEach(function (ob) {

                        var depMonth = ob.maxMonth < 1 ? ob.maxMonth : 1;
                        if (ob.month != 0) {
                            monthDep += ob.month;
                            cumDeprec += ob.month * ob.perMonth;
                            depExp = depMonth * ob.perMonth;
                        }
                    })
                    var currency = getCurrenySymbol(obj.currencyId);
                    if (accountShow != obj.account && i > 1) {
                        content += "<tr><td colspan='4' style='border-bottom: none' align='center'>Total</td><td>" + numeral(totalAmount).format('0,0.00') + mainCurrency + "</td><td></td><td>" + numeral(totalDepExp).format('0,0.00') + mainCurrency + "</td><td>" + numeral(totalCumDeprec).format('0,0.00') + mainCurrency + "</td><td>" + numeral(totalNetBookValue).format('0,0.00') + mainCurrency + "</td></tr>";
                    }

                    if (accountShow != obj.account) {
                        totalAmount = 0;
                        totalCumDeprec = 0;
                        totalDepExp = 0;
                        totalNetBookValue = 0;

                        i = 1;
                        let accountDoc = Meteor.call("getChartAccountById", obj.account);
                        content += "<tr style='background-color: lightgrey'><td colspan='9' style='border-bottom: none'>" + accountDoc.code + " : " + accountDoc.name + "</td></tr>";
                    }

                    content += "<tr><td>" + i + "</td><td>" + obj.code + "</td><td>" + obj.description + "</td><td>" + moment(obj.buyDate).format("DD-MM-YYYY") + "</td><td>" + numeral(obj.value).format('0,0.00') + currency + "</td><td>" + monthDep + "</td><td>" + numeral(depExp).format('0,0.00') + currency + "</td><td>" + numeral(cumDeprec).format('0,0.00') + currency + "</td><td>" + numeral(obj.estSalvage).format('0,0.00') + currency + "</td></tr>";
                    accountShow = obj.account;
                    i++;


                    totalAmount += (Meteor.call('exchange', obj.currencyId, baseCurrency, obj.value, params.exchangeId));
                    totalCumDeprec += (Meteor.call('exchange', obj.currencyId, baseCurrency, cumDeprec, params.exchangeId));

                    totalDepExp += (Meteor.call('exchange', obj.currencyId, baseCurrency, depExp, params.exchangeId));

                    totalNetBookValue += (Meteor.call('exchange', obj.currencyId, baseCurrency, obj.estSalvage, params.exchangeId));


                })
                content += "<tr><td colspan='4' style='border-bottom: none' align='center'>Total</td><td>" + numeral(totalAmount).format('0,0.00') + mainCurrency + "</td><td></td><td>" + numeral(totalDepExp).format('0,0.00') + mainCurrency + "</td><td>" + numeral(totalCumDeprec).format('0,0.00') + mainCurrency + "</td><td>" + numeral(totalNetBookValue).format('0,0.00') + mainCurrency + "</td></tr>";
            }
            data.content = content;
            return data;
        }
    }
});

var getCurrenySymbol = function (currency) {

    if (currency == "KHR") {
        return "៛";
    } else if (currency == "USD") {
        return "$";
    } else {
        return "B";
    }
}

var compareASD = function (a, b) {
    if (a.account < b.account) {
        return -1;
    } else if (a.account > b.account) {
        return 1;
    } else {
        return 0;
    }
}
