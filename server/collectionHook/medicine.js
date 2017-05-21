import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_Medicine} from '../../imports/collection/medicine';
import moment from "moment";


Co_Medicine.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_Medicine, prefix, 6);

})

Co_Medicine.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})
