import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

export const PaymentSchema = new SimpleSchema({
    date: {
        type: Date,
        label: "Date As",
        defaultValue: moment().toDate(),
        autoform: {
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
        }
    },
    branchId: {
        type: String,
        label: "Branch",
        max: 100,
        defaultValue: "All",
        autoform: {
            type: "select2",
            options: function () {
                //return SelectOptsReport.branch();
            }
        }
    },
    currencyId: {
        type: String,
        label: "Currency",
        autoform: {
            type: "select2",
            defaultValue: "All",
            options: function () {
                //return SelectOpts.currency();
            }
        }
    },
    exchangeDate: {
        type: String,
        label: "Exchange Date",
        autoform: {
            type: "select2",
            options: function () {
                //return SelectOptsReport.exchange();
            }
        }

    }
});
