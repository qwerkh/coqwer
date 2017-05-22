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
        defaultValue: moment().toDate()
    },
    voucherId: {
        type: String,
        label: "Voucher"

    },
    currencyId: {
        type: String,
        label: "Currency"

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
        optional: true
    },
    'transaction.$': {
        type: Object
    },
    'transaction.$.account': {
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

    ,

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
    fixAssetExpenseId: {
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
    transactionAsset: {
        type: [Object],
        optional: true
    },
    'transactionAsset.$': {
        type: Object
    },
    'transactionAsset.$.account': {
        type: String,
        max: 200,
        optional: true,
        label: "Chart Of Account"
    },
    'transactionAsset.$.value': {
        type: Number,
        decimal: true,
        label: "Value",
        optional: true,
        autoform: {
            type: 'inputmask',
            placeholder: "Value",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    },
    'transactionAsset.$.life': {
        type: Number,
        optional: true,
        label: "Life (Year)",
        autoform: {
            type: 'inputmask',
            placeholder: "Life(Year)",

            inputmaskOptions: function () {
                return inputmaskOptions.integer();
            }
        }
    },
    'transactionAsset.$.estSalvage': {
        type: Number,
        optional: true,
        label: "Estimate Salvage",

        autoform: {
            type: 'inputmask',
            placeholder: "Estimate Salvage",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    },
    'transactionAsset.$.code': {
        type: String,
        label: "Code",
        optional: true,
        autoform: {
            placeholder: "Code"
        }
    },
    'transactionAsset.$.percent': {
        type: Number,
        label: "Percentage",
        decimal: true,
        optional: true,
        autoform: {
            type: 'inputmask',
            placeholder: "Percentage",
            inputmaskOptions: function () {
                return inputmaskOptions.percentage();
            }
        }
    },
    'transactionAsset.$.description': {
        label: "Description",
        type: String,
        optional: true,
        autoform: {
            placeholder: "Description",
        }
    },
    refId: {
        type: String,
        optional: true
    },
    refFrom: {
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
        decimal: true,
        label: "Amount",
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
        label: "Payment/Receive Method",
        autoform: {
            type: "select-radio-inline",
            options: function () {
                // return SelectOpts.paymentReceiveMethod();
            }
        }
    }
});

//Sub
Co_Journal.fixAssetSchema = new SimpleSchema({
    account: {
        type: String,
        max: 200,
        optional: true,
        label: "Chart Of Account"
    },
    value: {
        type: Number,
        decimal: true,
        label: "Value",
        optional: true,
        autoform: {
            type: 'inputmask',
            placeholder: "Value",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    }, life: {
        type: Number,
        optional: true,
        label: "Life (Year)",
        autoform: {
            type: 'inputmask',
            placeholder: "Life(Year)",

            inputmaskOptions: function () {
                return inputmaskOptions.integer();
            }
        }
    },
    estSalvage: {
        type: Number,
        optional: true,
        label: "Estimate Salvage",

        autoform: {
            type: 'inputmask',
            placeholder: "Estimate Salvage",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    },
    code: {
        type: String,
        label: "Code",
        optional: true,
        autoform: {
            placeholder: "Code"
        }
    },
    percent: {
        type: Number,
        label: "Percentage",
        decimal: true,
        optional: true,
        autoform: {
            type: 'inputmask',
            placeholder: "Percentage",
            inputmaskOptions: function () {
                return inputmaskOptions.percentage();
            }
        }
    },
    description: {
        label: "Description",
        type: String,
        optional: true,
        autoform: {
            placeholder: "Description",
        }
    }
});

Meteor.startup(function () {
    Co_Journal.attachSchema(Co_Journal.schema);
});

