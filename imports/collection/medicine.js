export const Co_Medicine = new Meteor.Collection("co_medicine");
export const VW_Medicine = new Meteor.Collection("vw_medicine");

Co_Medicine.schema = new SimpleSchema({
    name: {
        type: String
    },
    medicineTypeId: {
        type: String,
        label: "Medicine Type",
        autoform: {
            type: "select"
        }
    },
    description: {
        type: String,
        optional: true
    },
    price: {
        type: Number,
        decimal: true,
        optional: true,
        autoform: {
            type: 'inputmask',
            afFieldInput: {
                inputmaskOptions: inputmaskOptions.decimal()
            }
        }
    },
    retailPrice: {
        type: Number,
        decimal: true,
        optional: true,
        label: "Retail Price",
        autoform: {
            type: 'inputmask',
            afFieldInput: {
                inputmaskOptions: inputmaskOptions.decimal()
            }
        }
    },
    rolesArea: {
        type: String,
        optional: true
    }

})

Meteor.startup(function () {
    Co_Medicine.attachSchema(Co_Medicine.schema);
})
