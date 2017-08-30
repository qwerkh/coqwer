Meteor.isClient && require('../../imports/ui/action/action');

import {Co_Journal} from '../../imports/collection/journal';

export const JournalTabular = new Tabular.Table({
    name: "co.journal",
    collection: Co_Journal,
    order: ['0', 'desc'],

    columnDefs: [
        {"width": "10px", "targets": 0},
        {"width": "50px", "targets": 5}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {data: "journalDateName", title: 'Date'},
        {data: "voucherId", title: 'Voucher'},
        {data: "total", title: 'Amount'},
        {data: "memo", title: 'Description'}
        ,
        {
            data: "endId", title: "Status",
            render: function (val, type, doc) {
                if (doc.endId != "0") {
                    return "<p class='ui pink label'>EOP</p>";
                } else if (doc.refFrom != undefined) {
                    return "<p class='ui teal label'>" + doc.refFrom + "</p>";
                } else {
                    return "<p class='ui label'>Normal</p>";
                }
            }
        }
        ,
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ],
    extraFields: ["paymentReceiveMethod", "transaction", "type","refFrom"]

})