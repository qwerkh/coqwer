import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const Co_MapFixAsset = new Mongo.Collection("co_mapFixAsset");
export const VW_MapFixAsset = new Meteor.Collection("vw_mapFixAsset");
/**
 * Schema
 *
 * @type {AccSchema}
 */
Co_MapFixAsset.schema = new SimpleSchema({
    fixAsset: {
        type: String,
        label: "Chart Account Asset",
        autoform: {
            type: 'select'
        }
    },
    accuFixAsset: {
        type: String,
        label: "Accumulated",
        autoform: {
            type: 'select'
        }


    },
    fixAssetExpense: {
        type: String,
        label: "Asset Expense",
        autoform: {
            type: 'select'
        }
    },
});
/**
 * Attach schema
 */
Meteor.startup(function () {
    Co_MapFixAsset.attachSchema(Co_MapFixAsset.schema);
});

