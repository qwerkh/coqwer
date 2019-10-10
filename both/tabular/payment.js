import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

Meteor.isClient && require('../../imports/ui/action/action');

import {Co_Payment} from '../../imports/collection/payment';

export const PaymentTabular = new Tabular.Table({
    name: "co.payment",
    collection: Co_Payment,
    responsive: true,
    order: ['0', 'desc'],
    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {data: "registerId", title: 'Register Id'},
        {data: "voucherId", title: 'Voucher'},
        {data: "paymentDateString", title: 'Pay Date'},
        /*{
            data: "paidAmountUSD", title: 'Paid Dollar',
            render: function (val, type, doc) {
                return numeral(val).format("0,00.000");
            }

        },
        {
            data: "paidAmountKHR", title: 'Paid Riel',
            render: function (val, type, doc) {
                return numeral(val).format("0,000");
            }
        },
        {
            data: "paidAmountTHB", title: 'Paid Baht',
            render: function (val, type, doc) {
                return numeral(val).format("0,00");
            }
        },*/
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ],
    extraFields: ["fromRegister", "canRemove", "paidAmountUSD", "paidAmountKHR", "paidAmountTHB"]

})