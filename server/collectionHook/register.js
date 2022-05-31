import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_Register} from '../../imports/collection/register';
import {Co_Payment} from '../../imports/collection/payment';
import moment from "moment";
import {Co_Patient} from "../../imports/collection/patient";
import {Co_Counter} from "../../imports/collection/counter";
import {Co_PatientCode} from "../../imports/collection/patientCode";
import GlobalFn from "../../imports/lib/globalFn";


Co_Register.before.insert(function (userId, doc) {
    doc.printId = doc._id;
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;
    doc.patientName = Co_Patient.findOne({_id: doc.patientId}).khName;

    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_Register, prefix, 6);

    let year = moment().format("YY");
    let codePrefix = "";
    let i = 0;
    doc.services.forEach((d) => {
        if (d && d.code && d.code !== "" && d.code !== null) {
            let patientCodeDoc = Co_PatientCode.findOne({patientId: doc.patientId, type: d.code})
            if (patientCodeDoc && patientCodeDoc !== undefined) {

            } else {
                let newPatientDoc = {};
                newPatientDoc.patientId = doc.patientId;
                newPatientDoc.registerId = doc._id;
                newPatientDoc.rolesArea = doc.rolesArea;
                newPatientDoc.type = d.code;
                newPatientDoc.lastDate = moment(doc.registerDate).format("DD/MM/YYYY");
                codePrefix = d.code;
                codePrefix += year;
                newPatientDoc.code = generateCodePrefix({
                    prefix: codePrefix,
                    collectionName: "co_register",
                    length: 4,
                    groupType: d.code
                });

                Meteor.call("insertPatientCode", newPatientDoc, (err, r) => {
                    if (err) {
                        console.log(err.message);
                    }
                })
            }
        }
    })

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


        payment.createdAt = moment().toDate();
        payment.createdBy = userId;

        let prefix = doc.rolesArea + moment().format("YYYY");
        payment.paymentDateString = moment(payment.paymentDate).format("DD/MM/YYYY");
        payment._id = GeneralFunction.generatePrefixId(Co_Payment, prefix, 6);

        Co_Payment.direct.insert(payment);

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

    payment.createdAt = moment().toDate();
    payment.createdBy = userId;

    payment.paymentDateString = moment(payment.paymentDate).format("DD/MM/YYYY");

    let updatePayment = Co_Payment.direct.update({registerId: doc._id}, {$set: payment});

    if (doc.paidAmountUSD > 0 || doc.paidAmountKHR > 0 || doc.paidAmountTHB > 0) {
        payment.registerId = doc._id;
        if (updatePayment == 0) {
            Co_Payment.direct.insert(payment);
        }
    }

    let year = moment().format("YY");
    let codePrefix = "";
    let i = 0;
    doc.services.forEach((d) => {
        if (d && d.code && d.code !== "" && d.code !== null) {
            let patientCodeDoc = Co_PatientCode.findOne({patientId: doc.patientId, type: d.code})
            if (patientCodeDoc && patientCodeDoc !== undefined) {

            } else {
                let newPatientDoc = {};
                newPatientDoc.patientId = doc.patientId;
                newPatientDoc.registerId = doc._id;
                newPatientDoc.rolesArea = doc.rolesArea;
                newPatientDoc.type = d.code;
                newPatientDoc.lastDate = moment(doc.registerDate).format("DD/MM/YYYY");
                codePrefix = d.code;
                codePrefix += year;
                newPatientDoc.code = generateCodePrefix({
                    prefix: codePrefix,
                    collectionName: "co_register",
                    length: 4,
                    groupType: d.code
                });

                Meteor.call("insertPatientCode", newPatientDoc, (err, r) => {
                    if (err) {
                        console.log(err.message);
                    }
                })
            }
        }
    })


})

Co_Register.after.remove(function (userId, doc) {
    Co_Payment.find({registerId: doc._id}).fetch().forEach((d) => {
        GlobalFn.collectionAudit("Co_PaymentAudit", d, "Remove");
    });
    Co_Payment.direct.remove({registerId: doc._id});
    Co_PatientCode.direct.remove({registerId: doc._id});
})

Co_Register.before.remove(function (userId, doc) {
    GlobalFn.collectionAudit("Co_RegisterAudit", doc, "Remove");

})

Co_Register.before.update(function (userId, doc, fieldName, modifier, option) {
    GlobalFn.collectionAudit("Co_RegisterAudit", doc, "Update");

})


Co_Payment.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;

    GlobalFn.collectionAudit("Co_PaymentAudit", doc, "Update");


})


let generateCodePrefix = ({prefix, collectionName, length, groupType}) => {
    let doc = Co_Counter.findOne({type: collectionName + "", groupType: groupType});
    let padCount = pad(1, length);
    if (!!doc) {
        Co_Counter.update({type: collectionName + "", groupType: groupType}, {$inc: {count: 1}});
        padCount = pad(doc.count + 1, length);
    } else {
        Co_Counter.insert({type: collectionName + "", count: 1, groupType: groupType});
    }
    return !!prefix ? prefix + padCount : padCount;

}


function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}
