import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


export const Co_FixAsset = new Mongo.Collection('co_fixAsset');
/*
 Schema
 */
Co_FixAsset.schema = new SimpleSchema({
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
    },
    life: {
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
    description: {
        type: String,
        label: "Description",
        optional: true,
        autoform: {
            placeholder: "Description",
        }
    },
    buyDate: {
        type: Date,
        label: "Buy Date",
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
    rolesArea: {
        type: String,
        optional: true
    }
    ,


    transaction: {
        type: [Object],
        blackbox: true,
        optional: true
    },
    'transaction.$': {
        type: Object,
        blackbox: true,
        optional: true
    },
    'transaction.$.year': {
        type: Number,
        blackbox: true
    },
    'transaction.$.perMonth': {
        type: Number,
        decimal: true,
        blackbox: true
    }, 'transaction.$.perYear': {
        type: Number,
        decimal: true,
        blackbox: true
    }, 'transaction.$.month': {
        type: Number,
        blackbox: true
    }, 'transaction.$.maxMonth': {
        type: Number,
        optional: true
    },
    'transaction.$.status': {
        type: Boolean,
        defaultValue: false
    },
    isDep: {
        type: Boolean,
        defaultValue: false
    },
    increment: {
        type: Number,
        defaultValue: 0
    }
});

Meteor.startup(function () {
    Co_FixAsset.attachSchema(Co_FixAsset.schema);
});

