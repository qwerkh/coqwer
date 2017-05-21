import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_ChartAccount} from '../../imports/collection/chartAccount';


Co_ChartAccount.before.insert(function (userId, doc) {

    doc.createdAt = moment().toDate();
    doc.createdBy = userId;

    doc.code = doc.code.padStart(5, "0");
    doc.level = 0;


    let check = checkParent(doc.parentId);
    if (check) {
        doc.level = check.level + 1;
    }

    doc._id = GeneralFunction.generateId(Co_ChartAccount, 4);
})

Co_ChartAccount.before.update(function (userId, doc, fieldNames, modifier, options) {

    doc.updatedAt = moment().toDate();
    doc.updatedBy = userId;

    modifier.$set.code = modifier.$set.code.padStart(5, "0");
    modifier.$set.level = 0;

    let check = checkParent(modifier.$set.parentId);
    if (check) {
        modifier.$set.level = check.level + 1;
    }

    doc._id = GeneralFunction.generateId(Co_ChartAccount, 4);

    Co_ChartAccount.direct.update(
        {
            parentId: modifier.$set._id
        }, {
            $set: {
                parentName: modifier.$set.name
            }
        })
})


function checkParent(id) {
    return Co_ChartAccount.findOne({_id: id});
}
