import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
Meteor.isClient && require('../../imports/ui/action/action');

import {Co_Machin} from '../../imports/collection/machin';
import {VW_Machin} from '../../imports/collection/machin';


export const MachinTabular = new Tabular.Table({
    name: "co.machin",
    collection: VW_Machin,
    responsive: true,
    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {data: "name", title: 'Name'},
        {data: "machinTypeDoc.name", title: 'Machin Type'},
        {data: "model", title: 'Model'},
        {
            data: "buyDate", title: 'Buy Date',
            render: function (val, type, doc) {
                return moment(val).format("DD/MM/YYYY")
            }
        },
        {data: "description", title: 'Description'},
        {data: "status", title: 'Status'},
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ]

})