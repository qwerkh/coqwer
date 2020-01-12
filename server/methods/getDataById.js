/**
 * Created by snr on 3/15/17.
 */

import {Co_Medicine} from '../../imports/collection/medicine'
import {Co_Machin} from '../../imports/collection/machin'
import {Co_Service} from '../../imports/collection/service'
import {Co_Patient} from '../../imports/collection/patient'
import {Co_Register} from '../../imports/collection/register'
import {Co_MachinType} from '../../imports/collection/machinType'
import {Co_MedicineType} from '../../imports/collection/medicineType'
import {Co_ServiceType} from '../../imports/collection/serviceType'
import {Co_Company} from "../../imports/collection/company";

Meteor.methods({
    co_serviceById(id, rolesArea) {
        let serviceDoc = Co_Service.findOne({_id: id});
        let machinId = [];
        if (serviceDoc) {
            if (serviceDoc.machinTypeId && serviceDoc.machinTypeId.length > 0) {
                serviceDoc.machinTypeId.forEach(function (obj) {

                    if (obj) {
                        let machin = Co_Machin.findOne({machinTypeId: obj, status: true, rolesArea: rolesArea});
                        if (machin) {
                            machinId.push(machin._id);
                        }
                    }
                })
            }
            serviceDoc.machinId = machinId;
        }
        return serviceDoc;

    },
    co_medicineById(id) {
        return Co_Medicine.findOne({$or: [{_id: id}, {barcode: id}]});
    },
    co_patientById(id) {
        let doc = Co_Patient.findOne({_id: id});
        return doc;
    },
    co_registerById(id) {
        let data = Co_Register.findOne({_id: id});
        data.patientDoc = Co_Patient.findOne({_id: data.patientId});
        return data;
    },
    co_registerByPatientId(patientId) {
        return Co_Register.find({patientId: patientId}, {sort: {registerDate: -1}}).fetch();
    },
    co_getPatientAndRegisterByPatientId(patientId, userId) {
        let data = {};
        let patientDoc = Co_Patient.findOne({_id: patientId});
        data.patientDoc = patientDoc || {};
        let registerList = [];
        let companyDoc = Co_Company.findOne();
        if (companyDoc.asigneUser.indexOf(userId) > -1) {
            registerList = Co_Register.find({patientId: patientId}, {sort: {registerDate: -1}}).fetch();

        } else {
            registerList = Co_Register.find({patientId: patientId}, {sort: {registerDate: -1}}).fetch().map((obj) => {
                if (obj.netTotal < companyDoc.hideIfGreater || 0) {
                    return obj;
                } else {
                    obj.netTotalService = 0;
                    obj.totalService = 0;
                    obj.services = [];

                    obj.netTotal = obj.netTotalMedicine;
                    obj.balance = 0;
                    obj.description = "";

                    return obj;
                }

            });
        }
        data.registerList = registerList || [];

        return data;
    }
})


let checkProvision = function (companyDoc, date) {
    let percentage = 0;
    let month = moment(moment(date, "DD/MM/YYYY").toDate()).format("MM");
    switch (month) {
        case "01":
            percentage = companyDoc.jan;
            break;
        case "02":
            percentage = companyDoc.feb;
            break;
        case "03":
            percentage = companyDoc.mar;
            break;
        case "04":
            percentage = companyDoc.apr;
            break;
        case "05":
            percentage = companyDoc.may;
            break;
        case "06":
            percentage = companyDoc.jun;
            break;
        case "07":
            percentage = companyDoc.jul;
            break;
        case "08":
            percentage = companyDoc.aug;
            break;
        case "09":
            percentage = companyDoc.sep;
            break;
        case "10":
            percentage = companyDoc.oct;
            break;
        case "11":
            percentage = companyDoc.nov;
            break;
        case "12":
            percentage = companyDoc.dec;
            break;
    }
    return percentage / 100;


}





