/**
 * Created by snr on 5/14/17.
 */

import {Co_Payment} from '../../imports/collection/payment'
import moment from "moment";
import {Co_Register} from "../../imports/collection/register";

Meteor.methods({
    getLastVoucherId(rolesArea, date) {
        let selector = {};

        if (rolesArea) {
            selector.rolesArea = rolesArea;
        }
        selector.paymentDate = {$gte: moment(date, "DD MMM,YYYY").startOf("year",).toDate()};

        let data = Co_Payment.findOne(selector, {
            sort: {
                paymentDate: -1,
                voucherId: -1
            }
        });
        return data;
    },
    getLastVoucherRegisterId(rolesArea, date) {
        let selector = {};

        if (rolesArea) {
            selector.rolesArea = rolesArea;
        }
        selector.registerDate = {$gte: moment(date, "DD MMM,YYYY").startOf("year",).toDate()};

        let data = Co_Register.findOne(selector, {
            sort: {
                registerDate: -1,
                voucherId: -1
            }
        });
        return data;
    }
})