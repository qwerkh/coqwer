import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
Meteor.isClient && require('../../imports/ui/action/action');

import {Co_Reference} from '../../imports/collection/reference';

export const ReferenceTabular = new Tabular.Table({
    name: "co.reference",
    collection: Co_Reference,
    responsive: true,
    order: ['0', 'desc'],

    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {data: "name", title: 'Name'},
        {data: "type", title: 'Type'},
        {data: "order", title: 'Order'},
        {data: "description", title: 'Description'},
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ]

})