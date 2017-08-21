import './journalDetail.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Journal} from '../../collection/journal';

import {SpaceChar} from "../../../both/config/space"


var journalDetailTmpl = Template.co_journalDetail;


journalDetailTem = new Meteor.Collection(null);

var cashMethod = new ReactiveVar("");

var chartAccountOpt = new ReactiveVar([]);
var paymentReceiveMethodOpt = new ReactiveVar([]);
var journalDoc = new ReactiveVar();
var total = new ReactiveVar(0);


journalDetailTmpl.onCreated(function () {

    let data = Template.currentData();
    if (data.transaction) {
        cashMethod.set(data.paymentReceiveMethod);

        data.transaction.forEach(function (obj) {
            if (data.paymentReceiveMethod != obj.account) {
                let docTransaction = {};
                docTransaction.chartAccountId = obj.account;
                docTransaction.chartAccountName = SpaceChar.space(obj.accountDoc.level * 6) + obj.accountDoc.name;
                docTransaction.amount = math.abs(obj.drcr);
                journalDetailTem.insert(docTransaction);
                reactTotal();
            }
        })
    }
    this.autorun(() => {
        Meteor.call("chartAccountOption", function (err, result) {
            if (result) {
                chartAccountOpt.set(result);
            }
        })

        Meteor.call("paymentReceiveMethodOpt", function (err, result) {
            if (result) {
                paymentReceiveMethodOpt.set(result);
            }
        })
    })

})
journalDetailTmpl.helpers({
    schema(){
        return Co_Journal.journalDetalPaymentReceive;
    },
    chartAccountOption(){
        return chartAccountOpt.get();
    },
    journalList(){
        return journalDetailTem.find();
    },
    total(){

        return total.get();
    },
    paymentReceiveMethodOption(){
        return paymentReceiveMethodOpt.get();
    },
    cashMethod(){
        return cashMethod.get();
    }
})

journalDetailTmpl.onRendered(function () {

})


journalDetailTmpl.events({
    'click .add-journal'(e, t){
        let journalDoc = {};
        journalDoc.chartAccountId = $("#account").val();
        journalDoc.chartAccountName = $("#account").parents('.selection.dropdown').dropdown('get text');
        journalDoc.amount = parseFloat($("#amount").val());
        journalDetailTem.insert(journalDoc);
        reactTotal();

    },
    'keyup #amountValue'(e, t){
        debugger;
        let id = $(e.currentTarget).attr("data_id");
        if (id) {
            journalDetailTem.update(
                id,
                {
                    $set: {amount: e.currentTarget.value}
                }
            );
            reactTotal();
        }

    },
    'click .delete-service'(e, t){
        let self = this;
        journalDetailTem.remove({_id: self._id});
        reactTotal();
    }
})


journalDetailTmpl.onDestroyed(function () {
    total.set(0);
    journalDetailTem.remove({});
})


let reactTotal = function () {
    let totalAmount = 0;
    journalDetailTem.find().forEach(function (obj) {
        totalAmount += obj.amount;
    })
    total.set(totalAmount);
    $("#account").parents('.selection.dropdown').dropdown('clear');
    $("#amount").val(0);

}