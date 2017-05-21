import './image';
export const Co_Machin = new Meteor.Collection("co_machin");
export const VW_Machin=new Meteor.Collection("vw_machin");

Co_Machin.schema = new SimpleSchema({
    name: {
        type: String
    },
    model: {
        type: String,
        optional: true
    },
    machinTypeId: {
        type: String,
        autoform: {
            type: "select"
        }
    },
    buyDate: {
        type: Date,
        label: "Buy Date",
        autoform: {
            type: "pickadate",
            pickadateOptions: {
                // selectMonths: true, // Creates a dropdown to control month
                selectYears: 170 // Creates a dropdown of 15 years to control year
            }
        }
    },
    description: {
        type: String,
        optional: true
    },
    status: {
        type: Boolean,
        defaultValue: true
    },
    rolesArea: {
        type: String,
        optional: true
    }

})

Meteor.startup(function () {
    Co_Machin.attachSchema(Co_Machin.schema);
})
