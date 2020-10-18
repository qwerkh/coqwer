import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
Meteor.isClient && require('../../imports/ui/action/action');

import {Co_Service} from '../../imports/collection/service';
import {VW_Service} from '../../imports/collection/service';

export const ServiceTabular = new Tabular.Table({
    name: "co.service",
    collection: VW_Service,
    order: ['0', 'desc'],

    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {data: "code", title: 'Code'},
        {data: "name", title: 'Name'},
        {data: "serviceTypeDoc.name", title: 'Service Type'},
        {data: "price", title: 'Price'},
        {data: "retailPrice", title: 'Retail Price'},
        {data: "description", title: 'Description'},
        {data: "machinTypeList", title: 'Machin Type'},
        {data: "status", title: 'Status'},
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ]

})