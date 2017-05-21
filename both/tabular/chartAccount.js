Meteor.isClient && require('../../imports/ui/action/action');

import {Co_ChartAccount} from '../../imports/collection/chartAccount';

export const ChartAccountTabular = new Tabular.Table({
    name: "co.chartAccount",
    collection: Co_ChartAccount,
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