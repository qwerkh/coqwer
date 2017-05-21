import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
Meteor.isClient && require('../../imports/ui/action/action');

import {Co_MachinType} from '../../imports/collection/machinType';

export const MachinTypeTabular = new Tabular.Table({
    name: "co.machinType",
    collection: Co_MachinType,
    responsive: true,
    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {data: "name", title: 'Name'},
        {data: "description", title: 'Description'},
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ]

})