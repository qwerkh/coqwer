import {VW_Register} from "../../imports/collection/register";
import {Co_Register} from "../../imports/collection/register";
import {Co_Journal} from "../../imports/collection/journal";
import {Co_Exchange} from "../../imports/collection/exchange";
import {Co_Company} from "../../imports/collection/company";
import {SpaceChar} from "../../both/config/space";
import {Meteor} from 'meteor/meteor';
import math from "mathjs";
import numeral from 'numeral';
import {Co_Medicine} from "../../imports/collection/medicine";
import {Co_Service} from "../../imports/collection/service";

export default class ClassReport {
    static registerReport(param, userId) {
        let parameter = {};
        let data = {};
        let total = 0;
        let totalNetTotal = 0;
        let totalBalance = 0;

        let CompanyDoc = Co_Company.findOne({});
        if (param) {
            parameter = param;
        }
        let reList = [];
        let registerList = Co_Register.aggregate(
            [
                {$match: parameter},
                {
                    $lookup: {
                        from: "co_patient",
                        localField: "patientId",
                        foreignField: "_id",
                        as: "patientDoc"
                    }
                },
                {$unwind: {path: "$patientDoc", preserveNullAndEmptyArrays: true}},

            ]).map(function (obj) {
            if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {
                total += obj.netTotal - obj.balance;
                totalNetTotal += obj.netTotal;
                totalBalance += obj.balance;

                obj.registerDate = moment(obj.registerDate).format("DD/MM/YYYY");
                obj.serviceDetail = "";
                obj.medicineDetail = "";
                obj.itemDetail = "";
                obj.services.forEach(function (o) {
                    obj.itemDetail += `<li>` + o.serviceName + `</li>`;
                })

                obj.medicines.forEach(function (o) {
                    obj.itemDetail += `<li>` + o.medicineName + `</li>`;
                })

                obj.totalPaid = numeral(obj.netTotal - obj.balance).format("0,00.000");
                obj.netTotal = numeral(obj.netTotal).format("0,00.000");
                obj.balance = numeral(obj.balance).format("0,00.000");
                reList.push(obj);
                return obj;
            } else {
                if (obj.netTotal < CompanyDoc.hideIfGreater || 0) {
                    total += (obj.netTotal - obj.balance) * checkProvision(CompanyDoc, obj.registerDate);
                    totalNetTotal += (obj.netTotal) * checkProvision(CompanyDoc, obj.registerDate);
                    totalBalance += (obj.balance) * checkProvision(CompanyDoc, obj.registerDate);

                    obj.registerDate = moment(obj.registerDate).format("DD/MM/YYYY");
                    obj.serviceDetail = "";
                    obj.medicineDetail = "";
                    obj.itemDetail = "";
                    obj.services.forEach(function (o) {
                        obj.itemDetail += `<li>` + o.serviceName + `</li>`;
                    })

                    obj.medicines.forEach(function (o) {
                        obj.itemDetail += `<li>` + o.medicineName + `</li>`;
                    })

                    obj.totalPaid = numeral((obj.netTotal - obj.balance) * checkProvision(CompanyDoc, obj.registerDate)).format("0,00.000");
                    obj.netTotal = numeral((obj.netTotal) * checkProvision(CompanyDoc, obj.registerDate)).format("0,00.000");
                    obj.balance = numeral((obj.balance) * checkProvision(CompanyDoc, obj.registerDate)).format("0,00.000");
                    reList.push(obj);
                    return obj;

                }
            }
            return {};

        });


        data.data = reList;
        data.total = numeral(total).format("0,00.000");
        data.totalNetTotal = numeral(totalNetTotal).format("0,00.000");
        data.totalBalance = numeral(totalBalance).format("0,00.000");

        return data;
    }

    static unpaidByCustomerReport(param, userId) {
        let parameter = {};
        let data = {};
        data.data = [];

        let CompanyDoc = Co_Company.findOne({});
        if (param) {
            parameter = param;
        }

        let paramBalance = {};
        if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {

            paramBalance.balance = {$gt: 0.01};

        } else {
            paramBalance.balance = {$gt: 0.01, $lt: CompanyDoc.hideIfGreater};
        }

        let unpaidByCustomerList = Co_Register.aggregate([
            {
                $match: parameter
            },
            {
                $lookup: {
                    from: "co_patient",
                    localField: "patientId",
                    foreignField: "_id",
                    as: "patientDoc"
                }
            },
            {$unwind: {path: "$patientDoc", preserveNullAndEmptyArrays: true}},
            {
                $group: {
                    _id: {
                        patientId: "$patientId",
                        khName: "$patientDoc.khName",

                    },
                    balance: {
                        $sum: "$balance"
                    },
                    registerDate: {
                        $last: "$registerDate"
                    }
                }
            },
            {
                $project: {
                    patientId: "$_id.patientId",
                    khName: "$_id.khName",
                    balance: "$balance",
                    registerDate: "$registerDate",
                    dayLate: {
                        "$divide": [
                            {$subtract: [moment().toDate(), "$registerDate"]},
                            1000 * 60 * 60 * 24
                        ]
                    }
                }

            },
            {
                $match: paramBalance
            },
            {
                $group: {
                    _id: null,
                    data: {$push: "$$ROOT"},
                    totalBalance: {
                        $sum: "$balance"
                    }

                }
            }
        ]);
        data.data = unpaidByCustomerList[0] && unpaidByCustomerList[0].data || [];
        data.totalBalanceUnPaid = unpaidByCustomerList[0] && unpaidByCustomerList[0].totalBalance || 0;

        return data;
    }

    static checkQualityMachinReport(param, userId, machinTypeIdList, machinIdList) {
        let parameter = {};

        let selectorMachin = {};
        if (machinIdList.length > 0) {
            selectorMachin["machinDoc._id"] = {$in: machinIdList};
        }

        if (machinTypeIdList.length > 0) {
            selectorMachin["machinDoc.machinTypeId"] = {$in: machinTypeIdList};
        }

        let data = {};
        data.data = [];

        let CompanyDoc = Co_Company.findOne({});
        if (param) {
            parameter = param;
        }


        let checkQualityMachinList = Co_Register.aggregate([

            {
                $match: parameter
            },
            {
                $unwind: {path: "$services", preserveNullAndEmptyArrays: true}
            },
            {
                $unwind: {path: "$services.machinId", preserveNullAndEmptyArrays: true}
            },
            {
                $match: {"services.machinId": {$exists: true}}
            },

            {
                $group: {
                    _id: {
                        patientId: "$patientId",
                        serviceId: "$services.serviceId",
                        machinId: "$services.machinId"
                    },
                    totalUse: {$sum: 1}
                }
            },
            {
                $lookup: {
                    from: "co_patient",
                    localField: "_id.patientId",
                    foreignField: "_id",
                    as: "patientDoc"
                }
            },
            {
                $unwind: {path: "$patientDoc", preserveNullAndEmptyArrays: true}
            },
            {
                $lookup: {
                    from: "co_service",
                    localField: "_id.serviceId",
                    foreignField: "_id",
                    as: "serviceDoc"
                }
            },
            {
                $unwind: {path: "$serviceDoc", preserveNullAndEmptyArrays: true}
            },
            {
                $lookup: {
                    from: "co_machin",
                    localField: "_id.machinId",
                    foreignField: "_id",
                    as: "machinDoc"
                }
            },
            {
                $unwind: {path: "$machinDoc", preserveNullAndEmptyArrays: true}
            },
            {
                $match: selectorMachin
            },
            {
                $group: {
                    _id: {
                        machinDoc: "$machinDoc"
                    },
                    totalUseMachin: {$sum: "$totalUse"},
                    numberPatientUse: {$sum: 1},
                    data: {$push: "$$ROOT"}
                }
            }
        ]);
        data.data = checkQualityMachinList;
        return data;
    }

    static registerByDateReport(param, userId) {
        let parameter = {};
        let data = {};
        let total = 0;
        let totalNetTotal = 0;
        let totalBalance = 0;

        if (param) {
            parameter = param;
        }
        let CompanyDoc = Co_Company.findOne({});
        if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {

        } else {
            parameter.netTotal = {$lt: CompanyDoc.hideIfGreater};
        }
        let registerList = Co_Register.aggregate([
            {$match: parameter},
            {
                $project: {
                    registerDate: 1,
                    netTotal: 1,
                    balance: 1,
                    month: {$month: "$registerDate"},
                    day: {$dayOfMonth: "$registerDate"},
                    year: {$year: "$registerDate"}
                }
            },

            {
                $group: {
                    _id: {day: "$day", month: "$month", year: "$year"},
                    registerDate: {$last: "$registerDate"},
                    netTotal: {$sum: "$netTotal"},
                    balance: {$sum: "$balance"}
                }
            },
            {$sort: {registerDate: 1}}
        ]).map(function (obj) {

            obj.registerDate = moment(obj.registerDate).format("DD/MM/YYYY");

            if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {
                totalNetTotal += obj.netTotal;
                totalBalance += obj.balance;
                total += obj.netTotal - obj.balance;

                obj.totalPaid = numeral(obj.netTotal - obj.balance).format("0,00.000");
                obj.netTotal = numeral(obj.netTotal).format("0,00.000");
                obj.balance = numeral(obj.balance).format("0,00.000");
            } else {
                totalNetTotal += (obj.netTotal) * checkProvision(CompanyDoc, obj.registerDate);
                totalBalance += (obj.balance) * checkProvision(CompanyDoc, obj.registerDate);
                total += (obj.netTotal - obj.balance) * checkProvision(CompanyDoc, obj.registerDate);

                obj.totalPaid = numeral((obj.netTotal - obj.balance) * checkProvision(CompanyDoc, obj.registerDate)).format("0,00.000");
                obj.netTotal = numeral((obj.netTotal) * checkProvision(CompanyDoc, obj.registerDate)).format("0,00.000");
                obj.balance = numeral((obj.balance) * checkProvision(CompanyDoc, obj.registerDate)).format("0,00.000");
            }
            return obj;

        });

        data.data = registerList;
        data.total = numeral(total).format("0,00.000");
        data.totalNetTotal = numeral(totalNetTotal).format("0,00.000");
        data.totalBalance = numeral(totalBalance).format("0,00.000");
        return data;
    }


    static profitLostReport(param, exchangeId, userId) {
        let parameter = {};

        if (param) {
            parameter = param;
        }

        let companyDoc = Co_Company.findOne({});

        let exchange = Co_Exchange.findOne({_id: exchangeId});
        let coefficientDrCr = exchangeCoefficient({
            exchange,
            fieldToCalculate: '$_id.transaction.drcr',
            baseCurrency: companyDoc.baseCurrency
        });
        let coefficientDr = exchangeCoefficient({
            exchange,
            fieldToCalculate: '$_id.transaction.dr',
            baseCurrency: companyDoc.baseCurrency
        });
        let coefficientCr = exchangeCoefficient({
            exchange,
            fieldToCalculate: '$_id.transaction.cr',
            baseCurrency: companyDoc.baseCurrency
        });

        let journalList = Co_Journal.aggregate([

            {
                $match: parameter
            },
            {
                $unwind: {
                    path: "$transaction",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $graphLookup: {
                    from: "co_chartAccount",
                    startWith: "$transaction.accountDoc.parentId",
                    connectFromField: "parentId",
                    connectToField: "_id",
                    maxDepth: 3,
                    depthField: "numConnections",
                    as: "parentDoc"
                }
            },
            {
                $group: {
                    _id: {
                        id: "$_id",
                        currencyId: "$currencyId",
                        journalDate: "$journalDate",
                        total: "$total",
                        voucherId: "$voucherId",
                        memo: "$memo",
                        transaction: "$transaction",
                        parentArr: "$parentDoc"
                    },
                    transactionArr: {$push: "$transaction.accountDoc"}
                }

            }, {
                $project: {
                    id: "$_id.id",
                    currencyId: "$_id.currencyId",
                    journalDate: "$_id.journalDate",
                    total: "$_id.total",
                    voucherId: "$_id.voucherId",
                    memo: "$_id.memo",
                    transaction: "$transaction",
                    dr: {
                        $cond: {
                            if: {$eq: ['$_id.currencyId', 'USD']},
                            then: coefficientDr.USD,
                            else: {$cond: [{$eq: ['$_id.currencyId', 'KHR']}, coefficientDr.KHR, coefficientDr.THB]}
                        }
                    },
                    cr: {
                        $cond: {
                            if: {$eq: ['$_id.currencyId', 'USD']},
                            then: coefficientCr.USD,
                            else: {$cond: [{$eq: ['$_id.currencyId', 'KHR']}, coefficientCr.KHR, coefficientCr.THB]}
                        }
                    },
                    drcr: {
                        $cond: {
                            if: {$eq: ['$_id.currencyId', 'USD']},
                            then: coefficientDrCr.USD,
                            else: {$cond: [{$eq: ['$_id.currencyId', 'KHR']}, coefficientDrCr.KHR, coefficientDrCr.THB]}
                        }
                    },
                    newTransaction: {
                        $concatArrays: ["$transactionArr", "$_id.parentArr"]
                    }
                }
            },
            {
                $unwind: {path: "$newTransaction", preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: {
                        accountType: "$newTransaction.accountTypeId",
                        code: "$newTransaction.code",
                        name: "$newTransaction.name",
                        level: "$newTransaction.level",

                    },
                    totalDr: {$sum: "$dr"},
                    totalCr: {$sum: "$cr"},
                    total: {$sum: {$cond: [{"$in": ["$newTransaction.accountTypeId", ["50", "51"]]}, {$multiply: ["$drcr", -1]}, "$drcr"]}}
                }
            },
            {$sort: {"_id.code": 1}},
            {
                $group: {
                    _id: {
                        accountType: "$_id.accountType"
                    },
                    data: {$push: "$$ROOT"},
                    totalRevenue: {$sum: {$cond: [{$and: [{"$in": ["$_id.accountType", ["50", "51"]]}, {"$eq": ["$_id.level", 0]}]}, "$total", 0]}},
                    totalExpense: {$sum: {$cond: [{$and: [{"$in": ["$_id.accountType", ["60", "61"]]}, {"$eq": ["$_id.level", 0]}]}, "$total", 0]}},
                    totalCOGS: {$sum: {$cond: [{$and: [{"$in": ["$_id.accountType", ["70"]]}, {"$eq": ["$_id.level", 0]}]}, "$total", 0]}}
                }
            }

        ])

        let data = {};
        data.dataIncome = [];
        data.dataExpense = [];
        data.cogs = [];

        data.totalRevenue = 0;
        data.totalExpense = 0;
        data.totalCOGS = 0;
        data.grossProfit = 0;
        data.netIncome = 0;

        journalList.forEach(function (obj) {

            if (obj._id.accountType == "50" || obj._id.accountType == "51") {
                data.dataIncome = obj.data;
                data.totalRevenue = obj.totalRevenue;
            } else if (obj._id.accountType == "60" || obj._id.accountType == "61") {
                data.dataExpense = obj.data;
                data.totalExpense = obj.totalExpense;

            } else if (obj._id.accountType == "70") {
                data.cogs = obj.data;
                data.totalCOGS = obj.totalCOGS;

            }
        })
        data.grossProfit = data.totalRevenue - data.totalCOGS;
        data.netIncome = data.grossProfit - data.totalExpense;

        return data;

    }

    static journalReport(param, userId) {
        let parameter = {};
        if (param) {
            parameter = param;
        }
        let CompanyDoc = Co_Company.findOne({});

        let journalList = Co_Journal.find(parameter).fetch().map(function (obj) {
            let accountName = "";
            let dr = "";
            let cr = "";
            obj.transaction.forEach(function (ob) {
                accountName += ob.accountDoc.code + " : " + ob.accountDoc.name + `<br>`;
                dr += numeral(ob.dr).format("0,00.000") + `<br>`;
                cr += numeral(ob.cr).format("0,00.000") + `<br>`;

            })
            accountName += `<span style="border-top: 1px solid ">Total:</span>`;
            dr += `<span style="border-top: 1px solid ">${numeral(obj.total).format("0,00.000") + getCurrencySymbolById(obj.currencyId)}</span>`;
            cr += `<span style="border-top: 1px solid ">${numeral(obj.total).format("0,00.000") + getCurrencySymbolById(obj.currencyId)}</span>`;
            obj.accountName = accountName;
            obj.dr = dr;
            obj.cr = cr;

            return obj;

        });

        return journalList;

    }


    static registerByItemReport(param, userId) {
        let parameter = {};
        let data = {};
        let grandTotal = 0;

        if (param) {
            parameter = param;
        }
        let CompanyDoc = Co_Company.findOne({});
        if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {

        } else {
            parameter.netTotal = {$lt: CompanyDoc.hideIfGreater};
        }
        let reList = [];
        Co_Register.aggregate([
            {$match: parameter},
            {$unwind: {path: "$services", preserveNullAndEmptyArrays: true}},
            {
                $group: {
                    _id: {id: "$services.serviceId", name: "$services.serviceName"},
                    total: {$sum: "$services.amount"},
                }
            }
        ]).map(function (obj) {
            if (obj.total > 0) {
                obj.registerDate = moment(obj.registerDate).format("DD/MM/YYYY");

                if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {
                    grandTotal += obj.total;
                    obj.total = numeral(obj.total).format("0,00.000");
                } else {
                    grandTotal += obj.total * checkProvision(CompanyDoc, obj.registerDate);
                    obj.total = numeral(obj.total * checkProvision(CompanyDoc, obj.registerDate)).format("0,00.000");
                }
                reList.push(obj);
            }
        });

        Co_Register.aggregate([
            {$match: parameter},
            {$unwind: {path: "$medicines", preserveNullAndEmptyArrays: true}},

            {
                $group: {
                    _id: {id: "$medicines.medicineId", name: "$medicines.medicineName"},
                    total: {$sum: "$medicines.amount"},
                }
            }
        ]).map(function (obj) {
            if (obj.total > 0) {
                obj.registerDate = moment(obj.registerDate).format("DD/MM/YYYY");

                if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {
                    grandTotal += obj.total;
                    obj.total = numeral(obj.total).format("0,00.000");
                } else {
                    grandTotal += obj.total * checkProvision(CompanyDoc, obj.registerDate);
                    obj.total = numeral(obj.total * checkProvision(CompanyDoc, obj.registerDate)).format("0,00.000");
                }
                reList.push(obj);
            }
        });

        let totalNetTotal = 0;
        Co_Register.aggregate([
            {$match: parameter},
        ]).map(function (obj) {
            if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {
                totalNetTotal += obj.netTotal;
            } else {
                if (obj.netTotal < CompanyDoc.hideIfGreater || 0) {
                    totalNetTotal += (obj.netTotal) * checkProvision(CompanyDoc, obj.registerDate);
                }
            }
        });

        data.data = reList;
        data.discount = numeral(grandTotal - totalNetTotal).format("0,00.000");
        data.netTotal = numeral(totalNetTotal).format("0,00.000");
        data.grandTotal = numeral(grandTotal).format("0,00.000");
        return data;
    }


    static registerServiceReport(param, serviceType, service, userId) {
        let parameter = {};
        let data = {};
        let grandTotal = 0;

        if (param) {
            parameter = param;
        }
        let CompanyDoc = Co_Company.findOne({});
        if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {

        } else {
            parameter.netTotal = {$lt: CompanyDoc.hideIfGreater};
        }

        let newParameter = {};
        if (serviceType !== "") {
            if (service.length > 0) {
                newParameter["services.serviceId"] = {$in: service};
            } else {
                let newService = Co_Service.find({serviceTypeId: serviceType}).map((obj) => obj._id);
                newParameter["services.serviceId"] = {$in: newService};
            }
        }


        let reList = [];
        Co_Register.aggregate([
            {$match: parameter},
            {$unwind: {path: "$services", preserveNullAndEmptyArrays: true}},
            {$match: newParameter},
            {
                $group: {
                    _id: {id: "$services.serviceId", name: "$services.serviceName"},
                    total: {$sum: "$services.amount"},
                }
            }
        ]).map(function (obj) {
            if (obj.total > 0) {
                obj.registerDate = moment(obj.registerDate).format("DD/MM/YYYY");

                if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {
                    grandTotal += obj.total;
                    obj.total = numeral(obj.total).format("0,00.000");
                } else {
                    grandTotal += obj.total * checkProvision(CompanyDoc, obj.registerDate);
                    obj.total = numeral(obj.total * checkProvision(CompanyDoc, obj.registerDate)).format("0,00.000");
                }
                reList.push(obj);
            }
        });


        data.data = reList;
        data.grandTotal = numeral(grandTotal).format("0,00.000");
        return data;
    }


    static registerMedicineReport(param, medicineType, medicine, userId) {
        let parameter = {};
        let data = {};
        let grandTotal = 0;

        if (param) {
            parameter = param;
        }
        let CompanyDoc = Co_Company.findOne({});
        if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {

        } else {
            parameter.netTotal = {$lt: CompanyDoc.hideIfGreater};
        }
        let reList = [];

        let newParameter = {};
        if (medicineType !== "") {
            if (medicine.length > 0) {
                newParameter["medicines.medicineId"] = {$in: medicine};
            } else {
                let newMedicine = Co_Medicine.find({medicineTypeId: medicineType}).map((obj) => obj._id);
                newParameter["medicines.medicineId"] = {$in: newMedicine};
            }
        }


        Co_Register.aggregate([
            {$match: parameter},
            {$unwind: {path: "$medicines", preserveNullAndEmptyArrays: true}},
            {$match: newParameter},
            {
                $group: {
                    _id: {id: "$medicines.medicineId", name: "$medicines.medicineName"},
                    total: {$sum: "$medicines.amount"},
                }
            }
        ]).map(function (obj) {
            if (obj.total > 0) {
                obj.registerDate = moment(obj.registerDate).format("DD/MM/YYYY");

                if (CompanyDoc.asigneUser && CompanyDoc.asigneUser.indexOf(userId) > -1) {
                    grandTotal += obj.total;
                    obj.total = numeral(obj.total).format("0,00.000");
                } else {
                    grandTotal += obj.total * checkProvision(CompanyDoc, obj.registerDate);
                    obj.total = numeral(obj.total * checkProvision(CompanyDoc, obj.registerDate)).format("0,00.000");
                }
                reList.push(obj);
            }
        });

        data.data = reList;
        data.grandTotal = numeral(grandTotal).format("0,00.000");
        return data;
    }

};


let getCurrencySymbolById = function (id) {
    if (id == "USD") {
        return "$";
    } else if (id == "KHR") {
        return "៛";
    } else {
        return "B";
    }
}


let exchangeCoefficient = function ({exchange, fieldToCalculate, baseCurrency}) {
    let coefficient = {
        KHR: {},
        THB: {},
        USD: {}
    };
    if (baseCurrency == 'USD') {
        coefficient.KHR.$divide = [fieldToCalculate, exchange.rates.KHR];
        coefficient.THB.$divide = [fieldToCalculate, exchange.rates.THB];
        coefficient.USD.$multiply = [fieldToCalculate, 1];
    } else if (baseCurrency == 'THB') {
        coefficient.KHR.$divide = [fieldToCalculate, exchange.rates.KHR];
        coefficient.USD.$divide = [fieldToCalculate, exchange.rates.USD];
        coefficient.THB.$multiply = [fieldToCalculate, 1];
    } else {
        coefficient.THB.$multiply = [fieldToCalculate, exchange.rates.THB];
        coefficient.USD.$multiply = [fieldToCalculate, exchange.rates.USD];
        coefficient.KHR.$multiply = [fieldToCalculate, 1];
    }
    return coefficient;
};

let checkProvision = function (companyDoc, date) {
    let percentage = 0;
    let month = moment(moment(date, "DD/MM/YYYY").toDate()).format("MM");
    switch (month) {
        case "01":
            percentage = companyDoc.jan;
            break;
        case "02":
            percentage = companyDoc.feb;
            break;
        case "03":
            percentage = companyDoc.mar;
            break;
        case "04":
            percentage = companyDoc.apr;
            break;
        case "05":
            percentage = companyDoc.may;
            break;
        case "06":
            percentage = companyDoc.jun;
            break;
        case "07":
            percentage = companyDoc.jul;
            break;
        case "08":
            percentage = companyDoc.aug;
            break;
        case "09":
            percentage = companyDoc.sep;
            break;
        case "10":
            percentage = companyDoc.oct;
            break;
        case "11":
            percentage = companyDoc.nov;
            break;
        case "12":
            percentage = companyDoc.dec;
            break;
    }
    return percentage / 100;


}




