Meteor.isClient && require('../../imports/ui/action/action');

import {Co_MedicineType} from '../../imports/collection/medicineType';

export const MedicineTypeTabular = new Tabular.Table({
    name: "co.medicineType",
    collection: Co_MedicineType,
    order: ['0', 'desc'],

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