import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_FixAsset} from '../../imports/collection/fixAsset';
import moment from "moment";


Co_FixAsset.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;

    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_FixAsset, prefix, 6);
})

Co_FixAsset.after.insert(function (userId, doc) {
    Meteor.defer(function () {
        let transaction = [];
        var curMonth = moment(doc.buyDate).format("MM");
        let depPerYear = (doc.value - doc.estSalvage) / doc.life;

        if (curMonth != "12") {
            for (let i = 1; i <= doc.life + 1; i++) {
                if (i == 1 || i == doc.life + 1) {
                    let maxMonth = i == 1 ? 12 - parseInt(curMonth) : parseInt(curMonth);
                    transaction.push({
                        year: i,
                        perMonth: math.round((depPerYear / 12), 2),
                        perYear: math.round((depPerYear / 12) * maxMonth, 2),
                        month: 0,
                        maxMonth: maxMonth,
                        status: false
                    })
                } else {
                    transaction.push({
                        year: i,
                        perMonth: math.round((depPerYear / 12), 2),
                        perYear: depPerYear,
                        month: 0,
                        maxMonth: 12,
                        status: false
                    })
                }
            }
        } else {
            for (let i = 1; i <= doc.life; i++) {
                transaction.push({
                    year: i,
                    perMonth: math.round((depPerYear / 12), 2),
                    perYear: depPerYear,
                    month: 0,
                    maxMonth: 12,
                    status: false
                })
            }
        }
        Co_FixAsset.update({_id: doc._id}, {
            $set: {
                transaction: transaction
            }
        });
    })
})


Co_FixAsset.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})

Co_FixAsset.after.update(function (userId, doc, fieldNames, modifier, options) {
    Meteor.defer(function () {
        let transaction = [];
        var curMonth = moment(modifier.$set.buyDate).format("MM");
        let depPerYear = (modifier.$set.value - modifier.$set.estSalvage) / modifier.$set.life;

        if (curMonth != "12") {
            for (let i = 1; i <= modifier.$set.life + 1; i++) {
                if (i == 1 || i == modifier.$set.life + 1) {
                    let maxMonth = i == 1 ? 12 - parseInt(curMonth) : parseInt(curMonth);
                    transaction.push({
                        year: i,
                        perMonth: math.round((depPerYear / 12), 2),
                        perYear: math.round((depPerYear / 12) * maxMonth, 2),
                        month: 0,
                        maxMonth: maxMonth,
                        status: false
                    })
                } else {
                    transaction.push({
                        year: i,
                        perMonth: math.round((depPerYear / 12), 2),
                        perYear: depPerYear,
                        month: 0,
                        maxMonth: 12,
                        status: false
                    })
                }
            }
        } else {
            for (let i = 1; i <= modifier.$set.life; i++) {
                transaction.push({
                    year: i,
                    perMonth: math.round((depPerYear / 12), 2),
                    perYear: depPerYear,
                    month: 0,
                    maxMonth: 12,
                    status: false
                })
            }
        }

        Co_FixAsset.update({_id: modifier.$set._id}, {
            $set: {
                transaction: transaction
            }
        });
    })
})



