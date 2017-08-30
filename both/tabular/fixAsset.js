import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
Meteor.isClient && require('../../imports/ui/action/action');

import {Co_FixAsset} from '../../imports/collection/fixAsset';


export const FixAssetTabular = new Tabular.Table({
    name: "co.fixAsset",
    collection: Co_FixAsset,
    responsive: true,
    order: ['0', 'desc'],
    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {
            data: "_id", title: 'Id',
            render: function (val, type, doc) {
                return `<u style="color: blue" depList=${val} class="depList">${val}</u>`
            }
        },
        {data: "description", title: 'Description'},
        {data: "code", title: 'Code'},
        {
            data: "buyDate", title: 'Buy Date',
            render: function (val, type, doc) {
                return moment(val).format("DD/MM/YYYY")
            }
        },
        {data: "account", title: 'Account'},
        {data: "value", title: 'Value'},
        {data: "life", title: 'Life'},
        {data: "estSalvage", title: 'Est.. Salvage'},
        {data: "voucherId", title: 'Voucher'},
        {data: "currencyId", title: 'Currency'},
        {
            data: "isDep", title: 'Status',
            render: function (val, type, doc) {
                if (val == true) {
                    return `<i style="color: red" class="empty star icon"></i>`;
                } else if (val == false) {
                    return `<i style="color: blue" class="star icon"></i>`
                }
            }
        },
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ],
    extraFields: ["_id", "numberOfExpense"]

})