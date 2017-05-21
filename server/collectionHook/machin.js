import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_Machin} from '../../imports/collection/machin';
import moment from "moment";


Co_Machin.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_Machin, prefix, 6);
})

Co_Machin.after.insert(function (userId, doc) {
    if (doc.status == true) {
        Co_Machin.direct.update({_id: {$ne: doc._id}, machinTypeId: doc.machinTypeId, rolesArea: doc.rolesArea},
            {
                $set: {
                    status: false
                }
            },
            {
                multi: true
            }
        )
    }
})

Co_Machin.after.update(function (userId, doc) {
    if (doc.status == true) {
        Co_Machin.direct.update({_id: {$ne: doc._id}, machinTypeId: doc.machinTypeId, rolesArea: doc.rolesArea},
            {
                $set: {
                    status: false
                }
            },
            {
                multi: true
            }
        )
    }
})


Co_Machin.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})


