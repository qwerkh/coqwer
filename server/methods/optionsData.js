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
    co_medicineOptionForReport() {

        let list = [];
        let param = {};

        Co_Medicine.find({}).fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        })
        return list;
    },
    co_medicineOptionForReportByType(typeId) {

        let list = [];
        let param = {};
        if(typeId){
            param.medicineTypeId = typeId;
            Co_Medicine.find(param).fetch().forEach(function (obj) {
                list.push({label: obj.name, value: obj._id});
            })
            return list;
        }else {
            return list;
        }


    },
    co_medicineByTypeOption(medicineType) {

        let list = [];
        Co_Medicine.find({medicineTypeId: medicineType}).fetch().forEach(function (obj) {
            list.push({label: obj.name, value: obj._id});
        })
        return list;
    },
    co_serviceByTypeOption(serviceType) {

        let list = [];
        Co_Service.find({serviceTypeId: serviceType}).fetch().forEach(function (obj) {
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
    co_patientOption(rolesArea, id) {
        let selector = {};
        if (rolesArea) {
            selector.rolesArea = rolesArea;
        }
        if (id) {
            selector._id = id;
        }
        let list = [];
        list.push({label: "(Select Patient)", value: ""});

        Co_Patient.find(selector).fetch().forEach(function (obj) {
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

        if (option === true) {
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
