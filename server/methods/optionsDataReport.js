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
import {Co_Register} from '../../imports/collection/register'
import {Co_ChartAccount} from '../../imports/collection/chartAccount'
import {Co_AccountType} from '../../imports/collection/accountType'
import {Co_Exchange} from '../../imports/collection/exchange'
import {SpaceChar} from "../../both/config/space"

Meteor.methods({
    fetchPatientOption(rolesArea) {
        let selector = {};
        if (rolesArea.length > 0) {
            selector.rolesArea = {$in: rolesArea};
        }
        let list = [];
        Co_Patient.find(selector).fetch().forEach(function (obj) {
            list.push({label: obj.khName, value: obj._id});
        })
        return list;
    },
    fetchServiceOption(rolesArea) {
        let selector = {};
        if (rolesArea.length > 0) {
            selector.rolesArea = {$in: rolesArea};
        }
        let list = [];
        Co_Service.find(selector).fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        })
        return list;
    },
    fetchMedicineOption(rolesArea) {
        let selector = {};
        if (rolesArea.length > 0) {
            selector.rolesArea = {$in: rolesArea};
        }
        let list = [];
        Co_Medicine.find(selector).fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        })
        return list;
    },

    fetchMachinTypeOption(rolesArea) {
        let selector = {};
        if (rolesArea.length > 0) {
            selector.rolesArea = {$in: rolesArea};
        }
        let list = [];
        Co_MachinType.find(selector).fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        })
        return list;
    },
    fetchMachinOption(rolesArea, machinType) {
        let selector = {};
        if (rolesArea.length > 0) {
            selector.rolesArea = {$in: rolesArea};
        }
        if (machinType.length > 0) {
            selector.machinTypeId = {$in: machinType};
        }

        let list = [];
        Co_Machin.find(selector).fetch().forEach(function (obj) {
            list.push({label: obj.model + " : " + obj.name, value: obj._id});
        })
        console.log(list);
        return list;
    },
    fetchExchangeOption() {

        let list = [];
        Co_Exchange.find({}).fetch().forEach(function (obj) {
            list.push({
                label: moment(obj.exDate).format("DD/MM/YYYY") + " | " + JSON.stringify(obj.rates),
                value: obj._id
            });
        })
        return list;
    }
})
