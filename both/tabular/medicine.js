Meteor.isClient && require('../../imports/ui/action/action');

import {Co_Medicine} from '../../imports/collection/medicine';
import {VW_Medicine} from '../../imports/collection/medicine';

export const MedicineTabular = new Tabular.Table({
    name: "co.medicine",
    collection: VW_Medicine,
    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    columns: [
        {data: "_id", title: 'Id'},
        {data: "name", title: 'Name'},
        {data: "medicineTypeDoc.name", title: 'Medicine Type'},
        {data: "price", title: 'Price'},
        {data: "retailPrice", title: 'Retail Price'},
        {data: "description", title: 'Description'},
        {
            tmpl: Meteor.isClient && Template.co_action
        }
    ]

})