import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_MedicineType} from '../../imports/collection/medicineType';
import moment from "moment";


Co_MedicineType.before.insert(function (userId, doc) {

    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_MedicineType, prefix, 6);

})

Co_MedicineType.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})
