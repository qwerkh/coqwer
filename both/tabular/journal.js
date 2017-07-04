Meteor.isClient && require('../../imports/ui/action/action');

import {Co_Journal} from '../../imports/collection/journal';

export const JournalTabular = new Tabular.Table({
    name: "co.journal",
    collection: Co_Journal,
    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {data: "journalDateName", title: 'Date'},
        {data: "voucherId", title: 'Voucher'},
        {data: "total", title: 'Amount'},
        {data: "memo", title: 'Description'},
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ],
    extraFields: ["paymentReceiveMethod", "transaction", "type"]

})