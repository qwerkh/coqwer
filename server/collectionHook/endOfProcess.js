import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_EndOfProcess} from '../../imports/collection/endOfProcess';
import {Co_Journal} from '../../imports/collection/journal';
import {Co_FixAsset} from '../../imports/collection/fixAsset';
import {Co_AccountType} from '../../imports/collection/accountType';
import {VW_MapFixAsset} from '../../imports/collection/mapFixAsset';

//Ensure Index
Co_EndOfProcess._ensureIndex({month: 1, year: 1, rolesArea: 1}, {unique: 1});


Co_EndOfProcess.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;

    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_EndOfProcess, prefix, 6);

})

Co_EndOfProcess.after.insert(function (userId, doc) {
    let depType = {};
    depType.depPerTime = 1;
    var selectorList = {};
    selectorList.buyDate = {$lte: moment(doc.endDate).add(-1, 'months').endOf('months').toDate()};
    selectorList.isDep = false;
    selectorList.rolesArea = doc.rolesArea;
    var depList = Co_FixAsset.find(selectorList).fetch();

    var startYear = moment(doc.endDate).year();
    var startDate = moment(startYear + '-' + '01-01').toDate();
    if (depList.length != 0) {
        doc.endDate = doc.endDate;
        doc.rolesArea = doc.rolesArea;
        var selectorExpenseList = [];
        Co_FixAsset.update({isDep: true}, {$inc: {increment: 1}}, {multi: true});

        depList.forEach(function (obj) {
            obj.transaction.sort(compareASD);

            //Insert into FixAssetExpense
            var selectorExpenseObj = {};
            selectorExpenseObj.account = obj.account;
            selectorExpenseObj.buyDate = obj.buyDate;
            selectorExpenseObj.currencyId = obj.currencyId;

            selectorExpenseObj.depExpListId = obj._id;

            for (let ob of obj.transaction) {
                if (ob.status == false) {
                    var depTime = ob.maxMonth < depType.depPerTime ? ob.maxMonth : depType.depPerTime;
                    var depValue = numeral(depTime * ob.perMonth).format('0,0.00');
                    selectorExpenseObj.value = numeral().unformat(depValue);
                    break;
                }
            }
            selectorExpenseList.push(selectorExpenseObj);


            //Insert Into Journal
            var selectorJournal = {};
            selectorJournal.journalDate = doc.endDate;
            selectorJournal.currencyId = obj.currencyId;
            selectorJournal.memo = "Depreciation Expense " + moment(doc.endDate).format("DD/MM/YYYY");

            var year = moment(doc.endDate, "DD/MM/YYYY").format("YYYY");

            selectorJournal.voucherId = "000000";
            selectorJournal.rolesArea = doc.rolesArea;
            selectorJournal.total = selectorExpenseObj.value;
            selectorJournal.endId = doc._id;

            var accountMap = VW_MapFixAsset.findOne({fixAsset: obj.account});


            if (accountMap) {
                var transaction = [];
                selectorJournal.type = "Payment";
                selectorJournal.paymentReceiveMethod = accountMap.fixAssetExpense;

                transaction.push({
                    account: accountMap.accuFixAsset,
                    dr: 0,
                    cr: selectorExpenseObj.value,
                    drcr: (-1) * selectorExpenseObj.value
                });
                selectorJournal.transaction = transaction;
                Co_Journal.insert(selectorJournal);


                //Update DepExpList

                var transactionUpdate = [];
                var i = 1;
                var yearLength = obj.transaction.length;
                obj.transaction.forEach(function (ob) {
                    if (i == 1 && ob.status == false) {
                        var depTime = ob.maxMonth < depType.depPerTime ? ob.maxMonth : depType.depPerTime;
                        ob.month += depTime;
                        i++;

                        if (ob.month == ob.maxMonth && yearLength == ob.year) {
                            obj.isDep = true;
                        }
                    }
                    if (ob.month == ob.maxMonth) {
                        ob.status = true;
                    }
                    transactionUpdate.push(ob);
                })

                obj.transaction = transactionUpdate;
                obj.numberOfExpense += 1;
                Co_FixAsset.update({_id: obj._id},
                    {
                        $set: obj
                    });

                // Co_FixAsset.direct.update({_id: obj._id}, {$inc: {numberOfExpense: 1}});
            }
        })
        doc.transactionExpense = selectorExpenseList;
    }
})

Co_EndOfProcess.after.remove(function (userId, doc) {
    Co_Journal.direct.remove({endId: doc._id});
})

function compare(a, b) {
    if (a.year < b.year) {
        return 1;
    } else if (a.year > b.year) {
        return -1;
    } else {
        return 0;
    }
}
function compareASD(a, b) {
    if (a.year < b.year) {
        return -1;
    } else if (a.year > b.year) {
        return 1;
    } else {
        return 0;
    }
}
