import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


export const Co_Journal = new Mongo.Collection('co_journal');
/*
 Schema
 */
Co_Journal.schema = new SimpleSchema({
    journalDate: {
        type: Date,
        label: "Journal Date",
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
    voucherId: {
        type: String,
        label: "Voucher"

    },
    currencyId: {
        type: String,
        label: "Currency",
        autoform: {
            type: "select",
            defaultValue: "USD",
            options: function () {
                let list = [];
                list.push({label: "USD", value: "USD"});
                list.push({label: "KHR", value: "KHR"});
                list.push({label: "THB", value: "THB"});

                return list;

            }
        }

    },
    memo: {
        type: String,
        label: "Description",
        autoform: {
            type: "textarea"
        }
    },
    splitAccount: {
        type: String,
        label: "splitAccount",
        optional: true
    },
    transaction: {
        type: [Object],
        minCount: 1,
        optional: true,
        blackbox: true
    },
    'transaction.$': {
        type: Object
    },
    /*'transaction.$.account': {
     type: String,
     max: 200,
     optional: true,
     label: "Chart Of Account"
     }
     ,
     'transaction.$.dr': {
     type: Number,
     decimal: true,
     optional: true,
     label: "Debit",
     autoform: {
     type: 'inputmask',
     placeholder: "Debit",
     inputmaskOptions: function () {
     return inputmaskOptions.decimal();
     }
     }
     }
     ,
     'transaction.$.cr': {
     type: Number,
     decimal: true,
     optional: true,
     label: "Credit",
     autoform: {
     type: 'inputmask',
     placeholder: "Credit",
     inputmaskOptions: function () {
     return inputmaskOptions.decimal();
     }
     }
     }
     ,
     'transaction.$.drcr': {
     type: Number,
     decimal: true,
     optional: true,
     autoform: {
     type: 'inputmask',
     inputmaskOptions: function () {
     return inputmaskOptions.decimal();
     }
     }
     }

     ,*/

    total: {
        type: Number,
        decimal: true,
        label: "Total",
        optional: true,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    }
    ,
    endId: {
        type: String,
        optional: true,
        defaultValue: "0"
    }
    ,
    closingId: {
        type: String,
        optional: true,
        defaultValue: "0"
    },
    refId: {
        type: String,
        optional: true
    },
    refFrom: {
        type: String,
        optional: true
    },
    rolesArea: {
        type: String,
        optional: true
    },
    type: {
        type: String,
        optional: true
    },
    paymentReceiveMethod: {
        type: String,
        label: "Payment/Receive Method",
        autoform: {
            type: "select-radio-inline",
        }
    },
    createdAt: {
        type: Date,
        optional: true
    },
    createdBy: {
        type: String,
        optional: true
    }
});

//Sub Payment /Receive
Co_Journal.journalDetalPaymentReceive = new SimpleSchema({
    account: {
        type: String,
        max: 200,
        optional: true,
        label: "Chart Of Account"
    },
    amount: {
        type: Number,
        label: "Amount",
        optional: true,
        autoform: {
            type: 'inputmask',
            placeholder: "Debit",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    },
    paymentReceiveMethod: {
        type: String,
        optional: true,
        label: "Payment/Receive Method",
        autoform: {
            type: "select-radio-inline",
        }
    },
    total: {
        type: Number,
        decimal: true,
        optional: true,
        label: "Total",
        autoform: {
            type: 'inputmask',
            placeholder: "Total",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    }

});

Meteor.startup(function () {
    Co_Journal.attachSchema(Co_Journal.schema);
});

