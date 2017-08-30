import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
Meteor.isClient && require('../../imports/ui/action/action');

import {Co_Register} from '../../imports/collection/register';
import {VW_Register} from '../../imports/collection/register';


export const RegisterTabular = new Tabular.Table({
    name: "co.register",
    collection: VW_Register,
    order: ['0', 'desc'],

    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {
            data: "registerDate", title: 'Date',
            render: function (val, type, doc) {
                if (val) {
                    return moment(val).format("DD/MM/YYYY");
                }
            }
        },
        {
            data: "patientDoc.khName", title: "Name"
        },
        {
            data: "netTotal", title: "Total",
            render: function (val, type, doc) {
                return numeral(val).format("0,00.00");
            }
        },
        {
            data: "balance", title: "Unpaid",
            render: function (val, type, doc) {
                return numeral(val).format("0,00.00");
            }
        },
        {
            data: "status", title: "Status",
            render: function (val, type, doc) {
                if (val == "Complete") {
                    return `<i class="star icon blue"> </i>` + val;
                } else if (val == "Partial") {
                    return `<i class="star half empty icon green"> </i>` + val;
                } else {
                    return `<i class="empty star icon blue"> </i>` + val;
                }
            }
        },
        {
            data: "paymentNumber", title: "Payment Number"
        }
        ,
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ],
    extraFields: [
        "services",
        "medicines",
        "discountService",
        "discountMedicine",
        "discountMedicineType",
        "discountServiceType",
        "netTotalService",
        "netTotalMedicine",
        "paidAmountUSD",
        "paidAmountKHR",
        "paidAmountTHB"
    ]
})