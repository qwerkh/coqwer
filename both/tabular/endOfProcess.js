import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
Meteor.isClient && require('../../imports/ui/action/action');

import {Co_EndOfProcess} from '../../imports/collection/endOfProcess';


export const EndOfProcessTabular = new Tabular.Table({
    name: "co.endOfProcess",
    collection: Co_EndOfProcess,
    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {
            data: "endDate", title: 'Date',
            render: function (val, type, doc) {
                if (val) {
                    return moment(val).format("DD/MM/YYYY");
                }
            }
        },
        {
            data: "month", title: "Month"
        },
        {
            data: "year", title: "Year"
        }
        ,
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ]
})