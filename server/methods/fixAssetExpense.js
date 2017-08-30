import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {moment} from  'meteor/momentjs:moment';

// Collection

import {Co_Journal} from '../../imports/collection/journal';
import {Co_FixAsset} from '../../imports/collection/fixAsset';
import {Co_EndOfProcess} from '../../imports/collection/endOfProcess';

Meteor.methods({
    removeEndOfProcess: function (id) {
        let depType = {};
        depType.depPerTime = 1;
        Co_FixAsset.update({isDep: true}, {$inc: {increment: -1}}, {multi: true});
        var depList = Co_FixAsset.find({increment: 0}).fetch();

        if (depList.length != 0) {
            depList.forEach(function (obj) {
                //Update DepExpList
                var transactionUpdate = [];
                var i = 1;

                obj.transaction.sort(compare);
                obj.transaction.forEach(function (ob) {
                    if (i == 1 && ob.month > 0) {
                        ob.month -= depType.depPerTime;
                        ob.month = ob.month > 0 ? ob.month : 0;
                        i++;

                        if (ob.month < ob.maxMonth) {
                            obj.isDep = false;
                        }
                    }
                    if (ob.month < ob.maxMonth) {
                        ob.status = false;
                    }
                    transactionUpdate.push(ob);
                })
                transactionUpdate.sort(compareASD);
                obj.numberOfExpense -= 1;
                obj.transaction = transactionUpdate;
                Co_FixAsset.update({_id: obj._id},
                    {

                        $set: obj
                    })
                ;
            })
        }

        Co_Journal.remove({endId: id});
        Co_EndOfProcess.remove({_id: id});

    },
    getLastEndOfProcess: function (branchId, id) {

        /*let lastId = FixAssetExpense.findOne({branchId: branchId}, {sort: {date: -1}});
         if (lastId._id == id) {
         return true;
         }
         return false;*/
    }
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


