import './journalDetail.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Journal} from '../../collection/journal';


var journalDetailPaymentTmpl = Template.co_journalDetailPayment,
    journalDetailReceiveTmpl = Template.co_journalDetailReceive;


var journalDetailPaymentTem = new Meteor.Collection(null);
var journalDetailReceiveTem = new Meteor.Collection(null);



journalDetailPaymentTmpl.onCreated(function () {


})
journalDetailPaymentTmpl.helpers({

})

journalDetailPaymentTmpl.onRendered(function () {

})


journalDetailPaymentTmpl.events({

})


journalDetailReceiveTmpl.helpers({

})

journalDetailReceiveTmpl.onRendered(function () {

})

journalDetailReceiveTmpl.onCreated(function () {


})

journalDetailReceiveTmpl.events({


})


journalDetailReceiveTmpl.onDestroyed(function () {

})

journalDetailPaymentTmpl.onDestroyed(function () {

})
