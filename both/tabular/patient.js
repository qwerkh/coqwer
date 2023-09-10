Meteor.isClient && require('../../imports/ui/action/action');

import {Co_Patient} from '../../imports/collection/patient';
import {VW_Patient} from '../../imports/collection/patient';

export const PatientTabular = new Tabular.Table({
    name: "co.patient",
    collection: Co_Patient,
    order: ['0', 'desc'],

    columnDefs: [
        {"width": "10px", "targets": 0}
    ],
    searching: false,
    columns: [

        {data: "order", title: 'Order'},
        {
            data: "enName", title: 'En Name'

        },
        {data: "khName", title: 'Kh Name'},
        {data: "code", title: 'Code'},
        {
            data: "gender", title: 'Gender',
            render: function (val, type, doc) {
                if (val == "Male") {
                    return `<i style="color: blue" class="male icon"></i>`;
                } else if (val == "Female") {
                    return `<i style="color: red" class="female icon"></i>`
                }
            }
        },

        {
            data: "dobString", title: 'DOB'

        }, {
            data: "dob", title: 'Age', render: function (val, type, doc) {
                return moment().diff(moment(val).startOf("day").toDate(), 'years');
            }

        },
        {
            data: "dob", title: 'Month', render: function (val, type, doc) {
                return parseInt(moment().diff(moment(val).startOf("day").toDate(), 'months')) - parseInt(moment().diff(moment(val).startOf("day").toDate(), 'years')) * 12;
            }

        },
        /*{
         data: "dob", title: 'DOB',
         render: function (val, type, doc) {
         return moment(val).format("DD/MM/YYYY")
         }

         },*/
        {data: "info", title: "Information"},
        {data: "address", title: "Address"},
        {data: "occupation", title: "Occupation"},
        {data: "phoneNumber", title: "Phone Number"},

        {
            tmpl: Meteor.isClient && Template.co_actionPatient, title: "Action"
        },
        {
            data: "imageDoc", title: "Photo",
            render: function (val, type, doc) {
                if (val && val.path) {

                    return `<a href="${val._downloadRoute}/${val._collectionName}/${val._id}/original/${val._id}${val.extension}?download=true" download="${val.name}" data-lightbox="image1">
                        <img class='ui circular image ' style="width: 35px;height: 35px !important;" src="${val._downloadRoute}/${val._collectionName}/${val._id}/original/${val._id}${val.extension}?download=true" download="${val.name}" />
                        </a>`
                    // return lightbox(img.url(), doc._id, doc.name);
                    // return  `<img class='ui circular image' width="40px" height="40px" src="${val._downloadRoute}/${val._collectionName}/${val._id}/original/${val._id}${val.extension}?download=true" download="${val.name}"></img>`
                } else {
                    return "<img class='ui circular image' style='width: 35px !important;' src='/noimage.png'>";
                }

            }
        },
        {data: "_id", title: 'Id'},
    ],
    extraFields: ["dob"],


})