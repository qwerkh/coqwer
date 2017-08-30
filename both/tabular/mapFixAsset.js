import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
Meteor.isClient && require('../../imports/ui/action/action');

import {Co_MapFixAsset} from '../../imports/collection/mapFixAsset';
import {VW_MapFixAsset} from '../../imports/collection/mapFixAsset';

export const MapFixAssetTabular = new Tabular.Table({
    name: "co.mapFixAsset",
    collection: VW_MapFixAsset,
    responsive: true,
    order: ['0', 'desc'],

    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {
            data: "fixAssetDoc", title: 'Asset',
            render: function (val, type, doc) {
                return val.code + " | " + val.name;
            }
        },
        {
            data: "accuDoc", title: 'Accumulated',
            render: function (val, type, doc) {
                return val.code + " | " + val.name;
            }
        },
        {
            data: "expenseDoc", title: 'Expense',
            render: function (val, type, doc) {
                return val.code + " | " + val.name;
            }
        },
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ]

})