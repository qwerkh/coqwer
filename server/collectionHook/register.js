import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_Register} from '../../imports/collection/register';
import {Co_Payment} from '../../imports/collection/payment';
import moment from "moment";


Co_Register.before.insert(function (userId, doc) {

    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_Register, prefix, 6);

})

Co_Register.after.insert(function (userId, doc) {

    if (doc.paidAmountUSD > 0 || doc.paidAmountKHR > 0 || doc.paidAmountTHB > 0) {
        let payment = {};
        payment.patientId = doc.patientId;
        payment.voucherId = doc.voucherId == undefined ? "" : doc.voucherId;

        payment.registerId = doc._id;
        payment.paymentDate = doc.registerDate;
        payment.paidAmountUSD = doc.paidAmountUSD;
        payment.paidAmountKHR = doc.paidAmountKHR;
        payment.paidAmountTHB = doc.paidAmountTHB;
        payment.returnAmountUSD = doc.returnAmountUSD;
        payment.returnAmountKHR = doc.returnAmountKHR;
        payment.returnAmountTHB = doc.returnAmountTHB;
        payment.balance = doc.balance;
        payment.oldBalance = 0;
        payment.fromRegister = true;
        payment.canRemove = true;
        payment.rolesArea = doc.rolesArea;

        Co_Payment.insert(payment);

    }

})

Co_Register.after.update(function (userId, doc) {
    let payment = {};
    payment.patientId = doc.patientId;
    payment.voucherId = doc.voucherId == undefined ? "" : doc.voucherId;
    payment.paymentDate = doc.registerDate;
    payment.paidAmountUSD = doc.paidAmountUSD;
    payment.paidAmountKHR = doc.paidAmountKHR;
    payment.paidAmountTHB = doc.paidAmountTHB;
    payment.returnAmountUSD = doc.returnAmountUSD;
    payment.returnAmountKHR = doc.returnAmountKHR;
    payment.returnAmountTHB = doc.returnAmountTHB;
    payment.balance = doc.balance;
    payment.oldBalance = doc.balance;
    payment.rolesArea = doc.rolesArea;
    payment.fromRegister = true;
    payment.canRemove = true;


    let updatePayment = Co_Payment.update({registerId: doc._id}, {$set: payment});

    if (doc.paidAmountUSD > 0 || doc.paidAmountKHR > 0 || doc.paidAmountTHB > 0) {
        payment.registerId = doc._id;
        if (updatePayment == 0) {
            Co_Payment.insert(payment);
        }
    }


})

Co_Register.after.remove(function (userId, doc) {
    Co_Payment.direct.remove({registerId: doc._id});
})



Co_Payment.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})
