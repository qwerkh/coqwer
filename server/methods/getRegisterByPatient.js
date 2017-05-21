/**
 * Created by snr on 5/14/17.
 */

import {Co_Register} from '../../imports/collection/register'

Meteor.methods({
    getRegisterByPatient(patientId, registerId){
        let selector = {};
        if (patientId) {
            selector.patientId = patientId;
        }

        if (registerId) {
            selector._id = registerId;
        }
        selector.status = {$in: ["Active", "Partial"]};
        return Co_Register.findOne(selector);
    }
})