import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_Payment} from '../../imports/collection/payment';
import {Co_Register} from '../../imports/collection/register';
import moment from "moment";


Co_Payment.before.insert(function (userId, doc) {

    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix = doc.rolesArea + moment().format("YYYY");
    doc.paymentDateString = moment(doc.paymentDate).format("DD/MM/YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_Payment, prefix, 6);

})

Co_Payment.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set.paymentDateString = moment(modifier.$set.paymentDate).format("DD/MM/YYYY");
})

Co_Payment.after.insert(function (userId, doc) {

    let status = "Partial";
    if (doc.balance <= 0) {
        status = "Complete";
    } else if (doc.balance == doc.netTotal) {
        status = "Active";
    } else {
        status = "Partial";
    }

    Co_Register.direct.update(
        {_id: doc.registerId},
        {
            $inc: {
                paidAmountUSD: doc.paidAmountUSD,
                paidAmountKHR: doc.paidAmountKHR,
                paidAmountTHB: doc.paidAmountTHB,
                returnAmountUSD: doc.returnAmountUSD,
                returnAmountKHR: doc.returnAmountKHR,
                returnAmountTHB: doc.returnAmountTHB,
                paymentNumber: 1,
            },
            $set: {
                balance: doc.balance <= 0 ? 0 : doc.balance,
                status: status
            }
        }
    )

    Co_Payment.direct.update({registerId: doc.registerId, _id: {$ne: doc._id}}, {
            $set: {
                canRemove: false
            }
        },
        {
            multi: true
        }
    )
    ;

})


Co_Payment.after.remove(function (userId, doc) {

    Co_Register.direct.update(
        {_id: doc.registerId},
        {
            $inc: {
                paidAmountUSD: -doc.paidAmountUSD,
                paidAmountKHR: -doc.paidAmountKHR,
                paidAmountTHB: -doc.paidAmountTHB,
                returnAmountUSD: -doc.returnAmountUSD,
                returnAmountKHR: -doc.returnAmountKHR,
                returnAmountTHB: -doc.returnAmountTHB,
                paymentNumber: -1,

            }
            ,
            $set: {
                balance: doc.oldBalance,
                status: doc.oldStatus
            }
        }
    )

    let paymentDoc = Co_Payment.find({registerId: doc.registerId}, {sort: {paymentDate: -1}}).fetch();
    if (paymentDoc.length > 0) {
        Co_Payment.direct.update({_id: paymentDoc[0]._id}, {$set: {canRemove: true}});
    }

})


Co_Payment.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})
