/**
 * Created by snr on 3/15/17.
 */

import {Co_Medicine} from '../../imports/collection/medicine'
import {Co_Machin} from '../../imports/collection/machin'
import {Co_Service} from '../../imports/collection/service'
import {Co_Patient} from '../../imports/collection/patient'
import {Co_MachinType} from '../../imports/collection/machinType'
import {Co_MedicineType} from '../../imports/collection/medicineType'
import {Co_ServiceType} from '../../imports/collection/serviceType'
import {Co_Register} from '../../imports/collection/register'
import {Co_ChartAccount} from '../../imports/collection/chartAccount'
import {Co_AccountType} from '../../imports/collection/accountType'
import {Co_Exchange} from '../../imports/collection/exchange'
import {Co_Company} from '../../imports/collection/company'

import {SpaceChar} from "../../both/config/space"

Meteor.methods({
    co_serviceOption(rolesArea) {
        let list = [];
        list.push({label: "(Select Service)", value: ""});
        let selector = {};

        if (rolesArea) {
            selector.rolesArea = rolesArea;
        }

        Co_Service.find(selector).fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        });
        return list;
    },
    co_medicineOption() {

        let list = [];
        list.push({label: "(Select Medicine)", value: ""});
        Co_Medicine.find({}).fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        })
        return list;
    },
    co_machinOption(rolesArea) {
        let selector = {};
        list.push({label: "(Select One)", value: ""});
        if (rolesArea) {
            selector.rolesArea = rolesArea;
        }
        let list = [];
        Co_Machin.find(selector).fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        });
        return list;
    },
    co_patientOption(rolesArea, param) {
        let selector = {};
        if (rolesArea) {
            selector.rolesArea = rolesArea;
        }
        if (param) {
        }
        let list = [];
        list.push({label: "(Select Patient)", value: ""});

        Co_Patient.find(selector, {limit: 10}).fetch().forEach(function (obj) {
            list.push({label: obj.khName, value: obj._id});
        });
        return list;
    },
    co_machinTypeOption(isMulti) {
        let list = [];
        Co_MachinType.find().fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        })
        return list;
    },
    co_medicineTypeOption() {
        let list = [];
        Co_MedicineType.find().fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        })
        return list;
    },
    co_serviceTypeOption() {
        let list = [];
        Co_ServiceType.find().fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        })
        return list;
    },
    co_registerOption(patientId, option, rolesArea) {
        let list = [];
        let selector = {};
        if (patientId) {
            selector.patientId = patientId;
        }

        if (option == true) {
            selector.status = {$ne: "Complete"};
        }

        if (rolesArea) {
            selector.rolesArea = rolesArea;
        }
        Co_Register.find(selector).fetch().forEach(function (obj) {
            list.push({label: obj._id + " : " + moment(obj.registerDate).format("DD/MM/YYYY"), value: obj._id});
        });

        return list;
    },
    chartAccountOption(accountType) {
        let arr = [];
        arr.push({label: "(Select ChartAccount)", value: ""});

        let selector = {};
        if (accountType) {
            selector.accountTypeId = accountType;
        }


        Co_ChartAccount.find(selector, {sort: {code: 1}}).fetch().forEach(function (obj) {
            let subAccountOfDoc = Co_ChartAccount.findOne({parentId: obj._id});
            if (subAccountOfDoc) {
                arr.push({
                    label: SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name,
                    value: obj._id,
                    class: "item disabled"
                })
            } else {
                arr.push({
                    label: SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name,
                    value: obj._id
                })

            }

        })
        return arr;
    },
    accountTypeOption(selector) {
        var selector = _.isUndefined(selector) ? {} : selector;
        var list = [];
        Co_AccountType.find(selector)
            .forEach(function (obj) {
                list.push({label: obj._id + " | " + obj.name, value: obj._id})
            });
        return list;
    },
    parentOption: function (selector) {
        var selector = _.isUndefined(selector) ? {} : selector;
        var list = [];
        list.push({label: "(Select Parent)", value: ""});

        Co_ChartAccount.find(selector, {sort: {code: 1}})
            .forEach(function (obj) {
                list.push({
                    label: SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name,
                    value: obj._id
                })
            });

        return list;
    },
    paymentReceiveMethodOpt: function () {
        let list = [];
        Co_ChartAccount.find({paymentReceiveType: "Payment/Receive"}, {sort: {code: 1}}).forEach(function (obj) {
            list.push({
                label: obj.paymentReceiveName,
                value: obj._id
            })

        });
        return list;
    },
    assetOption: function () {
        let list = [];
        Co_ChartAccount.find({accountTypeId: "20"}, {sort: {code: 1}}).forEach(function (obj) {
            list.push({
                label: obj.code + " | " + obj.name,
                value: obj._id
            })
        });
        return list;
    },
    assetAccumulatedOption: function () {
        let list = [];
        Co_ChartAccount.find({accountTypeId: "21"}, {sort: {code: 1}}).forEach(function (obj) {
            list.push({
                label: obj.code + " | " + obj.name,
                value: obj._id
            })
        });
        return list;
    },
    assetExpenseOption: function () {
        let list = [];
        Co_ChartAccount.find({accountTypeId: "61"}, {sort: {code: 1}}).forEach(function (obj) {
            list.push({
                label: obj.code + " | " + obj.name,
                value: obj._id
            })
        });
        return list;
    },
    exchangeOption: function () {
        let list = [];
        let com = Co_Company.findOne({});
        Co_Exchange.find({base: com.baseCurrency}, {sort: {exDate: -1}}).forEach(function (obj) {
            list.push({
                label: moment(obj.exDate).format("DD/MM/YYYY") + ' | ' + JSON.stringify(obj.rates),
                value: obj._id
            })
        });
        return list;
    },
    userOption: function () {
        let list = [];
        let userList = Meteor.users.find({username: {$ne: "super"}}).fetch();
        console.log(userList);
        userList.forEach(function (obj) {
            list.push({
                label: obj.username,
                value: obj._id
            })
        })
        return list;
    },

    co_machinOptionByIdList(rolesArea, machinList) {
        let selector = {};
        if (rolesArea) {
            selector.rolesArea = rolesArea;
        }
        selector._id = {$in: machinList};
        let list = [];
        Co_Machin.find(selector).fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        })
        return list;
    },

});


let modelMatcher = function (params, data) {
    data.parentText = data.parentText || "";

    // Always return the object if there is nothing to compare
    if ($.trim(params.term) === '') {
        return data;
    }

    // Do a recursive check for options with children
    if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, {}, data);

        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) {
            var child = data.children[c];
            child.parentText += data.parentText + " " + data.text;

            var matches = modelMatcher(params, child);

            // If there wasn't a match, remove the object in the array
            if (matches == null) {
                match.children.splice(c, 1);
            }
        }

        // If any children matched, return the new object
        if (match.children.length > 0) {
            return match;
        }

        // If there were no matching children, check just the plain object
        return modelMatcher(params, match);
    }

    // If the typed-in term matches the text of this term, or the text from any
    // parent term, then it's a match.
    // var original = (data.parentText + ' ' + data.text).toUpperCase();
    var original = (data.text).toUpperCase();
    var term = params.term.toUpperCase();

    let originalSplit = original.split(" | ");

    /*// Check if the text contains the term
     if (original.indexOf(term) > -1) {
     return data;
     }*/

    let codeEmptySpace = originalSplit[0].replace(/\s+/g, '');
    let regTerm = new RegExp("^" + term);

    // Check if the text contains the term

    if (originalSplit[1] && (originalSplit[1].indexOf(term) > -1 || codeEmptySpace.match(regTerm) !== null)) {
        return data;
    }

    // If it doesn't contain the term, don't return anything
    return null;
};
select2chartAccount = function (jQueryName) {
    jQueryName.select2({
        matcher: modelMatcher
    });
};
