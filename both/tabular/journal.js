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
        {data: "code", title: 'Code'},
        {data: "name", title: 'Name'},
        {data: "parentName", title: 'Parent'},
        {data: "accountTypeName", title: 'Account Type'},
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ],
    extraFields: ["parentId", "accountTypeId"]

})