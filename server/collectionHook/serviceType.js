import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_ServiceType} from '../../imports/collection/serviceType';
import moment from "moment";


Co_ServiceType.before.insert(function (userId, doc) {

    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_ServiceType, prefix, 6);

})



Co_ServiceType.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})
