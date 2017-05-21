import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_Service} from '../../imports/collection/service';
import moment from "moment";


Co_Service.before.insert(function (userId, doc) {

    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix = doc.rolesArea + moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_Service, prefix, 6);

})


Co_Service.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})

