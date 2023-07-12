import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_NurseRegister} from '../../imports/collection/nurseRegister';
import moment from "moment";


Co_NurseRegister.before.insert(function (userId, doc) {

    doc.date = moment().format("YYYY-MM-DD");
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_NurseRegister, prefix, 6);

})


Co_NurseRegister.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})

