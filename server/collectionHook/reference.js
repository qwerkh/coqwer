import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_Reference} from '../../imports/collection/reference';
import moment from "moment";


Co_Reference.before.insert(function (userId, doc) {

    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix =  moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_Reference, prefix, 6);

})



Co_Reference.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})
