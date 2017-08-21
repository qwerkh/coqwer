import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_MapFixAsset} from '../../imports/collection/mapFixAsset';
import moment from "moment";


Co_MapFixAsset.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;

    let prefix = moment().format("YYYY");
    doc._id = GeneralFunction.generatePrefixId(Co_MapFixAsset, prefix, 6);

})


Co_MapFixAsset.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
})

