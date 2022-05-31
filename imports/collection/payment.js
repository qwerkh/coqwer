import {Mongo} from "meteor/mongo";

export const Co_Payment = new Meteor.Collection("co_payment");

Co_Payment.schema = new SimpleSchema({
    patientId: {
        type: String,
        /* autoform: {
             type: 'select'
         }*/
    },
    registerId: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    voucherId: {
        type: String,
        optional: true
    },
    paymentDate: {
        type: Date,
        label: 'Payment Date',
        autoform: {
            type: 'pickadate',
            defaultValue: moment().toDate(),
            pickadateOptions: {
                // selectMonths: true, // Creates a dropdown to control month
                selectYears: 170, // Creates a dropdown of 15 years to control year
                formatSubmit: "DD/MM/YYYY"
            }
        }
    },
    paymentDateString: {
        type: String,
        optional: true
    },
    paidAmountUSD: {
        type: Number,
        label: "Paid USD",
        decimal: true,
        optional: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    paidAmountKHR: {
        type: Number,
        label: "Paid Riel",
        decimal: true,
        optional: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    paidAmountTHB: {
        type: Number,
        label: "Paid Baht",
        decimal: true,
        optional: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    returnAmountUSD: {
        type: Number,
        label: "Return Dollar",
        decimal: true,
        optional: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    returnAmountKHR: {
        type: Number,
        label: "Return Riel",
        decimal: true,
        optional: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(0);
            }
        }
    },
    returnAmountTHB: {
        type: Number,
        label: "Return Baht",
        decimal: true,
        optional: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(0);
            }
        }
    },
    balance: {
        type: Number,
        label: "Balance",
        decimal: true
    },
    oldBalance: {
        type: Number,
        label: "Old Balance",
        optional: true,
        decimal: true
    },
    oldStatus: {
        type: String,
        optional: true
    },

    rolesArea: {
        type: String,
        optional: true
    },
    fromRegister: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    canRemove: {
        type: Boolean,
        defaultValue: true,
        optional: true
    }

})

export const Co_PaymentAudit = new Mongo.Collection('co_paymentAudit');
Co_PaymentAudit.schema = new SimpleSchema({
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
    },
    type: {
        type: String,
        optional: true,
    },
    data: {
        type: Object,
        optional: true,
        blackbox: true
    }
});
Meteor.startup(function () {
    Co_Payment.attachSchema(Co_Payment.schema);
    Co_PaymentAudit.attachSchema(Co_PaymentAudit.schema);
});
