import {GeneralFunction} from '../../imports/api/methods/generalFunction';

import {Co_Patient} from '../../imports/collection/patient';
import moment from "moment";


Co_Patient.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
    doc.createdBy = userId;


    let prefix = doc.rolesArea + moment().format("YYYY");
    doc.dobString = moment(doc.dob).format("DD/MM/YYYY");

    let nameByCharacter = doc.khName.charAt(0);
    let nameSearch = new RegExp("\^" + nameByCharacter);
    let numPatientByCharacter = Co_Patient.find({khName: {$regex: nameSearch, $options: 'mi'}}).count();
    doc.order = numPatientByCharacter + 1;

    doc._id = GeneralFunction.generatePrefixId(Co_Patient, prefix, 6);

})

Co_Patient.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set.updatedAt = moment().toDate();
    modifier.$set.updatedBy = userId;
    modifier.$set.dobString = moment(modifier.$set.dob).format("DD/MM/YYYY");
})


