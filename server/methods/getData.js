/**
 * Created by snr on 3/15/17.
 */

import {Co_Medicine} from '../../imports/collection/medicine'
import {Co_Machin} from '../../imports/collection/machin'
import {Co_Service} from '../../imports/collection/service'
import {Co_Patient} from '../../imports/collection/patient'
import {Co_MachinType} from '../../imports/collection/machinType'
import {Co_MedicineType} from '../../imports/collection/medicineType'
import {Co_ServiceType} from '../../imports/collection/serviceType'

Meteor.methods({
    co_serviceById(id, rolesArea){
        let serviceDoc = Co_Service.findOne({_id: id});
        let machinId = [];
        if (serviceDoc) {
            serviceDoc.machinTypeId.forEach(function (obj) {

                if (obj) {
                    let machin = Co_Machin.findOne({machinTypeId: obj, status: true, rolesArea: rolesArea});
                    if (machin) {
                        machinId.push(machin._id);
                    }
                }
            })
            serviceDoc.machinId = machinId;
        }
        return serviceDoc;

    },
    co_medicineById(id){
        return Co_Medicine.findOne({_id: id});
    },
    co_patientById(id){
        return Co_Patient.findOne({_id: id});
    }
})