import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

Meteor.isClient && require('../../imports/ui/action/action');

import {Co_Register} from '../../imports/collection/register';
import {VW_Register} from '../../imports/collection/register';


export const RegisterTabular = new Tabular.Table({
    name: "co.register",
    collection: Co_Register,
    order: ['0', 'desc'],

    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    searching: false,
    /*skipCount: true,
    pagingType: 'simple',
    infoCallback: (settings, start, end) => `Showing ${start} to ${end}`,*/
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
            data: "code", title: "Code"
        }, {
            data: "patientName", title: "Name"
        }, {
            data: "voucherId", title: "Voucher"
        },
       /* {
            data: "netTotal", title: "Total",
            render: function (val, type, doc) {
                return numeral(val).format("0,00.000");
            }
        },
        {
            data: "balance", title: "Unpaid",
            render: function (val, type, doc) {
                return numeral(val).format("0,00.000");
            }
        },*/
        {
            data: "status", title: "Status",
            render: function (val, type, doc) {
                if (val == "Complete") {
                    return `<i class="star icon blue"> </i>` + val;
                } else if (val == "Partial") {
                    return `<i class="star half outline icon green"> </i>` + val;
                } else {
                    return `<i class="star outline icon"> </i>` + val;
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
        "patientId",
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
        "paidAmountTHB",
        "voucherId",
        "netTotal",
        "balance"
    ]
})