import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_Exchange} from '../../imports/collection/exchange';


Co_Exchange.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;

    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_Exchange, prefix, 6);

})

Co_Exchange.after.insert(function (userId, doc) {
    if (doc.status == true) {
        Co_Exchange.direct.update({_id: {$ne: doc._id}},
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


Co_Exchange.after.update(function (userId, doc) {
    if (doc.status == true) {
        Co_Exchange.direct.update({_id: {$ne: doc._id}},
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

Co_Exchange.before.update(function (userId, doc, fieldNames, modifier, options) {

    doc.updatedAt = moment().toDate();
    doc.updatedBy = userId;
})
