import './journalDetail.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Journal} from '../../collection/journal';

import {SpaceChar} from "../../../both/config/space"


var journalDetailPaymentTmpl = Template.co_journalDetailPayment,
    journalDetailReceiveTmpl = Template.co_journalDetailReceive;


journalDetailTem = new Meteor.Collection(null);

var cashMethod = new ReactiveVar("");

var chartAccountOpt = new ReactiveVar([]);
var paymentReceiveMethodOpt = new ReactiveVar([]);
var journalDoc = new ReactiveVar();
var total = new ReactiveVar(0);

let journalDocUpdateLine = new ReactiveObj();

journalDetailPaymentTmpl.onCreated(function () {

    debugger;
    let data = Template.currentData();
    if (data.transaction) {
        cashMethod.set(data.paymentReceiveMethod);
        data.transaction.forEach(function (obj) {
            if (obj.drcr > 0) {
                let docTransaction = {};
                docTransaction.chartAccountId = obj.account;
                docTransaction.chartAccountName = SpaceChar.space(obj.accountDoc.level * 6) + obj.accountDoc.name;
                docTransaction.amount = obj.drcr;
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
journalDetailPaymentTmpl.helpers({
    schemaPayment(){
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

journalDetailPaymentTmpl.onRendered(function () {

})


journalDetailPaymentTmpl.events({
    'click .add-journal'(e, t){
        let journalDoc = {};
        journalDoc.chartAccountId = $("#account").val();
        journalDoc.chartAccountName = $("#account").parents('.selection.dropdown').dropdown('get text');
        journalDoc.amount = parseFloat($("#amount").val());
        journalDetailTem.insert(journalDoc);
        reactTotal();

    },
    'keyup #amountValue'(e, t){
        let self = this;
        if (journalDocUpdateLine) {
            journalDetailTem.update(
                journalDocUpdateLine._id,
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
    },
    'click .journal-row'(e, t){
        journalDocUpdateLine = this;
    }/*,
     'select .journal-row'(){
     journalDocUpdateLine = this;
     }*/
})


journalDetailReceiveTmpl.helpers({})

journalDetailReceiveTmpl.onRendered(function () {

})

journalDetailReceiveTmpl.onCreated(function () {


})

journalDetailReceiveTmpl.events({})


journalDetailReceiveTmpl.onDestroyed(function () {

})

journalDetailPaymentTmpl.onDestroyed(function () {
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