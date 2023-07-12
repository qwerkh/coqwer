import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_DrRegister} from '../../imports/collection/drRegister';
import moment from "moment";


Co_DrRegister.before.insert(function (userId, doc) {

    doc.date = moment().format("YYYY-MM-DD");
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_DrRegister, prefix, 6);

})


Co_DrRegister.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})

