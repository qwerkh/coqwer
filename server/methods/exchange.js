import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Co_Exchange} from '../../imports/collection/exchange';

Meteor.methods({
    exchange: function (curFrom, curTo, amount, id) {
        var ex = Co_Exchange.findOne({
            base: curTo,
            _id: id
        }, {
            sort: {
                _id: -1
            }
        });
        if (curFrom != curTo) {

            if (curTo == "KHR") {
                if (curFrom == "USD") {
                    return amount * ex.rates[curFrom];
                } else if (curFrom == "THB") {
                    return amount * ex.rates[curFrom];
                }
            } else if (curTo == "USD") {
                if (curFrom == "KHR") {
                    return amount / ex.rates[curFrom];
                } else if (curFrom == "THB") {
                    return amount / ex.rates[curFrom];
                }
            } else if (curTo == "THB") {
                if (curFrom == "KHR") {
                    return amount / ex.rates[curFrom];
                } else if (curFrom == "USD") {
                    return amount * ex.rates[curFrom];
                }
            }
        } else {
            return amount;
        }
    }
})
