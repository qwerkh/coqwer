Meteor.isClient && require('../../imports/ui/action/action');

import {Co_ChartAccount} from '../../imports/collection/chartAccount';

export const ChartAccountTabular = new Tabular.Table({
    name: "co.chartAccount",
    collection: Co_ChartAccount,
    order: ['0', 'desc'],
    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {data: "code", title: 'Code'},
        {data: "name", title: 'Name'},
        {data: "parentName", title: 'Sub Account Of'},
        {data: "accountTypeName", title: 'Account Type'},
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ],
    extraFields: ["parentId", "accountTypeId"]

})