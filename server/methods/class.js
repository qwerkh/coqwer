import {VW_Register} from "../../imports/collection/register";
import {Co_Register} from "../../imports/collection/register";
import {Co_Journal} from "../../imports/collection/journal";
import {Co_Exchange} from "../../imports/collection/exchange";
import {Co_Company} from "../../imports/collection/company";
import {SpaceChar} from "../../both/config/space";


export default class ClassReport {
    static registerReport(param) {
        let parameter = {};
        let data = {};
        let total = 0;
        let totalNetTotal = 0;
        let totalBalance = 0;

        if (param) {
            parameter = param;
        }
        let registerList = VW_Register.find(parameter).fetch().map(function (obj) {

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

            /*obj.totalMedicine = numeral(obj.totalMedicine).format("0,00.00");
             obj.totalService = numeral(obj.totalService).format("0,00.00");
             obj.netTotalMedicine = numeral(obj.netTotalMedicine).format("0,00.00");
             obj.netTotalService = numeral(obj.netTotalService).format("0,00.00");*/

            return obj;
        });
        data.data = registerList;
        data.total = numeral(total).format("0,00.000");
        data.totalNetTotal = numeral(totalNetTotal).format("0,00.000");
        data.totalBalance = numeral(totalBalance).format("0,00.000");

        return data;
    }

    static registerByDateReport(param) {
        let parameter = {};
        let data = {};
        let total = 0;
        let totalNetTotal = 0;
        let totalBalance = 0;

        if (param) {
            parameter = param;
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
            totalNetTotal += obj.netTotal;
            totalBalance += obj.balance;
            total += obj.netTotal + obj.balance;

            obj.totalPaid = numeral(obj.netTotal - obj.balance).format("0,00.000");
            obj.netTotal = numeral(obj.netTotal).format("0,00.000");
            obj.balance = numeral(obj.balance).format("0,00.000");
            return obj;

        });

        data.data = registerList;
        data.total = numeral(total).format("0,00.000");
        data.totalNetTotal = numeral(totalNetTotal).format("0,00.000");
        data.totalBalance = numeral(totalBalance).format("0,00.000");

        return data;
    }


    static profitLostReport(param, exchangeId) {
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

    static journalReport(param) {
        let parameter = {};
        if (param) {
            parameter = param;
        }
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


