/**
 * Created by snr on 5/14/17.
 */

import {Co_Register} from '../../imports/collection/register'

Meteor.methods({
    getRegisterByPatient(patientId, registerId) {
        let selector = {};
        if (patientId) {
            selector.patientId = patientId;
        }

        if (registerId) {
            selector._id = registerId;
        }
        selector.status = {$in: ["Active", "Partial"]};
        return Co_Register.findOne(selector);
    },
    getUnpaidByPatient(patientId) {
        let selector = {};
        if (patientId) {
            selector.patientId = patientId;
        }

        selector.status = {$in: ["Active", "Partial"]};
        let unpaid = 0;
        Co_Register.find(selector).fetch().map((obj) => {
            unpaid += obj.balance;
        });

        return unpaid;
    },
    getAllRegisterBypatient(parientId) {
        return Co_Register.find({parientId: parientId});
    }
})