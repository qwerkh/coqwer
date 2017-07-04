import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_Journal} from '../../imports/collection/journal';
import {Co_ChartAccount} from '../../imports/collection/chartAccount';
import moment from "moment";


Co_Journal.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;

    let newTransaction = [];

    let paymentReceiveMethodDoc = Co_ChartAccount.findOne({_id: doc.paymentReceiveMethod});

    if (doc.type == "Payment") {
        doc.transaction.forEach(function (obj) {
            let paidDoc = Co_ChartAccount.findOne({_id: obj.account});

            newTransaction.push({
                account: paidDoc._id,
                dr: obj.drcr,
                cr: 0,
                drcr: obj.drcr,
                accountDoc: paidDoc
            })

        })

        newTransaction.push({
            account: paymentReceiveMethodDoc._id,
            dr: 0,
            cr: doc.total,
            drcr: -doc.total,
            accountDoc: paymentReceiveMethodDoc
        })
    } else {

        newTransaction.push({
            account: paymentReceiveMethodDoc._id,
            dr: doc.total,
            cr: 0,
            drcr: doc.total,
            accountDoc: paymentReceiveMethodDoc
        })

        doc.transaction.forEach(function (obj) {
            let paidDoc = Co_ChartAccount.findOne({_id: obj.account});

            newTransaction.push({
                account: paidDoc._id,
                dr: 0,
                cr: obj.drcr,
                drcr: -obj.drcr,
                accountDoc: paidDoc
            })

        })


    }

    doc.transaction = newTransaction;

    let prefix = doc.rolesArea + moment().format("YYYY");
    doc.journalDateName = moment(doc.journalDate).format("DD/MM/YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_Journal, prefix, 6);
})


Co_Journal.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
    modifier.$set.journalDateName = moment(modifier.$set.journalDate).format("DD/MM/YYYY");

    let newTransaction = [];
    let paymentReceiveMethodDoc = Co_ChartAccount.findOne({_id: modifier.$set.paymentReceiveMethod});
    if (modifier.$set.type == "Payment") {
        modifier.$set.transaction.forEach(function (obj) {
            let paidDoc = Co_ChartAccount.findOne({_id: obj.account});

            newTransaction.push({
                account: paidDoc._id,
                dr: obj.drcr,
                cr: 0,
                drcr: obj.drcr,
                accountDoc: paidDoc
            })

        })

        newTransaction.push({
            account: paymentReceiveMethodDoc._id,
            dr: 0,
            cr: doc.total,
            drcr: -doc.total,
            accountDoc: paymentReceiveMethodDoc
        })
    } else {
        newTransaction.push({
            account: paymentReceiveMethodDoc._id,
            dr: doc.total,
            cr: 0,
            drcr: doc.total,
            accountDoc: paymentReceiveMethodDoc
        })

        modifier.$set.transaction.forEach(function (obj) {
            let paidDoc = Co_ChartAccount.findOne({_id: obj.account});

            newTransaction.push({
                account: paidDoc._id,
                dr: 0,
                cr: obj.drcr,
                drcr: -obj.drcr,
                accountDoc: paidDoc
            })

        })


    }
    modifier.$set.transaction = newTransaction;
})


