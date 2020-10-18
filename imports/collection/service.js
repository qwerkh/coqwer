export const Co_Service = new Meteor.Collection("co_service");
export const VW_Service = new Meteor.Collection("vw_service");

Co_Service.schema = new SimpleSchema({
    name: {
        type: String
    },
    description: {
        type: String,
        optional: true
    },
    code: {
        type: String,
        optional: true
    },
    price: {
        type: Number,
        decimal: true,
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
        label: "Retail Price",
        autoform: {
            type: 'inputmask',
            afFieldInput: {
                inputmaskOptions: inputmaskOptions.decimal()
            }
        }
    },
    serviceTypeId: {
        type: String,
        autoform: {
            type: "select"
        }
    },
    machinTypeId: {
        type: [String],
        optional: true,
        autoform: {
            type: "select",
            multiple: true
        }
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
    Co_Service.attachSchema(Co_Service.schema);
})
