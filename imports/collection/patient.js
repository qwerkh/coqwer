import './image';

export const Co_Patient = new Meteor.Collection("co_patient");
export const Co_PatientImage = new Meteor.Collection("co_patientImage");
export const VW_Patient = new Meteor.Collection("vw_patient");

Co_Patient.schema = new SimpleSchema({
    enName: {
        type: String,
        optional: true
    },
    khName: {
        type: String
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
    code: {
        type: String,
        optional: true
    },
    info: {
        type: String,
        optional: true
    },
    /*picture: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                label: false
            }
        }
    },*/
    urlList: {
        type: [String],
        optional: true,

    },
    rolesArea: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return moment().toDate();
            }
        }
    },
    createdUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    updatedUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    }

})
Co_PatientImage.schema = new SimpleSchema({
    patientId: {
        type: String,
        optional: true
    },
    url: {
        type: String
    },
    createdAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return moment().toDate();
            }
        }
    },
    createdUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    updatedUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    }

})

Meteor.startup(function () {
    Co_Patient.attachSchema(Co_Patient.schema);
    Co_PatientImage.attachSchema(Co_PatientImage.schema);
})
