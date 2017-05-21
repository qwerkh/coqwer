import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_MachinType} from '../../imports/collection/machinType';
import moment from "moment";


Co_MachinType.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_MachinType, prefix, 6);

})


Co_MachinType.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})

