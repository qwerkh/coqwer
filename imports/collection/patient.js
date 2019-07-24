import './image';

export const Co_Patient = new Meteor.Collection("co_patient");
export const VW_Patient = new Meteor.Collection("vw_patient");

Co_Patient.schema = new SimpleSchema({
    enName: {
        type: String,
        optional: true
    },
    khName: {
        type: String
    },

    nickName: {
        type: String,
        optional: true
    },
    order: {
        type: String,
        optional: true
    },
    gender: {
        type: String,
        // optional: true,
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: "Male", value: "Male"},
                    {label: "Female", value: "Female"}
                ];
            }
        }

    },
    dob: {
        type: Date,
        label: 'Date of birth',
        optional: true,
        autoform: {
            type: 'pickadate',
            pickadateOptions: {
                // selectMonths: true, // Creates a dropdown to control month
                selectYears: 170 // Creates a dropdown of 15 years to control year
            }
        }
    },
    age: {
        type: Number,
        label: "Age"
    },
    month: {
        type: Number,
        label: "Month",
        optional: true,
        defaultValue: 0
    },
    dobString: {
        type: String,
        label: "Dob String",
        optional: true
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String,
        optional: true
    },
    occupation: {
        type: String,
        optional: true
    },
    picture: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                label: false
            }
        }
    },
    rolesArea: {
        type: String,
        optional: true
    }

})

Meteor.startup(function () {
    Co_Patient.attachSchema(Co_Patient.schema);
})
