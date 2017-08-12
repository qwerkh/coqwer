import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const Co_EndOfProcess = new Mongo.Collection("co_endOfProcess");
/**
 * Schema
 *
 * @type {AccSchema}
 */
Co_EndOfProcess.schema = new SimpleSchema({
    endDate: {
        type: Date,
        label: 'End Date',
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
    rolesArea: {
        type: String,
        label: "Branch"
    },
    month: {
        type: String,
        optional: true
    },
    year: {
        type: String,
        optional: true
    },
    transactionExpense: {
        type: [Object],
        minCount: 1,
        optional: true
    },
    'transactionExpense.$': {
        type: Object
    },
    'transactionExpense.$.depExpListId': {
        type: String,
        label: "DepExpListId"
    },
    'transactionExpense.$.account': {
        type: String,
        max: 200,
        label: "Account"
    },
    'transactionExpense.$.buyDate': {
        type: Date,
        label: "Buy Date"
    },
    'transactionExpense.$.value': {
        type: Number,
        decimal: true,
        blackbox: true
    },
    'transactionExpense.$.currencyId': {
        type: String,
        label: "Currency"
    },
    'transactionExpense.$.journalId': {
        type: String,
        optional: true
    }

});

/**
 * Attach schema
 */

Meteor.startup(function () {
    Co_EndOfProcess.attachSchema(Co_EndOfProcess.schema);
});