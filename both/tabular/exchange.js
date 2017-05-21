import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {EJSON} from 'meteor/ejson';
Meteor.isClient && require('../../imports/ui/action/action');

import {Co_Exchange} from '../../imports/collection/exchange';

export const ExchangeTabular = new Tabular.Table({
    name: "co.exchange",
    collection: Co_Exchange,
    responsive: true,
    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {
            data: "exDate", title: 'Exchange Date',
            render: function (val, type, doc) {
                return moment(val).format("DD/MM/YYYY")
            }
        },
        {
            data: "rates",
            title: "Rates",
            render: function (val, type, doc) {
                return EJSON.stringify(val);
            }
        },
        {data: "status", title: 'Status'},
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ]

})