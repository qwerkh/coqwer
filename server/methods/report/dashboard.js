import {Meteor} from 'meteor/meteor';
import numeral from 'numeral';
import {Co_Company} from "../../../imports/collection/company";
import {Co_Register} from "../../../imports/collection/register";
import math from "mathjs";

Meteor.methods({
    dashboardReport(params) {
        let registerParameter = {};
        let data = {};

        if (params.area != "") {
            registerParameter.rolesArea = params.area;
        }


        let companyDoc = Co_Company.findOne({});


        if (params.minusDay < 7) {
            let dayAdd = -params.minusDay;

            registerParameter.registerDate = {
                $lte: moment(params.today).add(dayAdd, "days").endOf("days").toDate(),
                $gte: moment(params.today).add(dayAdd, "days").startOf("days").toDate()
            };


            data.today = moment(params.today).add(dayAdd, "days").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).add(dayAdd, "days").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 7) {
            registerParameter.registerDate = {
                $lte: moment(params.today).endOf("week").toDate(),
                $gte: moment(params.today).startOf("week").toDate()
            };

            data.today = moment(params.today).startOf("week").format("ddd DD/MM/YYYY") + "-" + moment(params.today).endOf("week").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).startOf("week").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).endOf("week").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 14) {
            registerParameter.registerDate = {
                $lte: moment(params.today).add(-7, "days").endOf("week").toDate(),
                $gte: moment(params.today).add(-7, "days").startOf("week").toDate()
            };


            data.today = moment(params.today).add(-7, "days").startOf("week").format("ddd DD/MM/YYYY") + "-" + moment(params.today).add(-7, "days").endOf("week").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).add(-7, "days").startOf("week").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).add(-7, "days").endOf("week").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 30) {
            registerParameter.registerDate = {
                $lte: moment(params.today).endOf("month").toDate(),
                $gte: moment(params.today).startOf("month").toDate()
            };

            data.today = moment(params.today).startOf("month").format("ddd DD/MM/YYYY") + "-" + moment(params.today).endOf("month").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).startOf("month").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).endOf("month").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 60) {
            registerParameter.registerDate = {
                $lte: moment(params.today).add(-1, "month").endOf("month").toDate(),
                $gte: moment(params.today).add(-1, "month").startOf("month").toDate()
            };

            data.today = moment(params.today).add(-1, "month").startOf("month").format("ddd DD/MM/YYYY") + "-" + moment(params.today).add(-1, "month").endOf("month").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).add(-1, "month").startOf("month").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).add(-1, "month").endOf("month").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 365) {
            registerParameter.registerDate = {
                $lte: moment(params.today).endOf("year").toDate(),
                $gte: moment(params.today).startOf("year").toDate()
            };

            data.today = moment(params.today).startOf("year").format("ddd DD/MM/YYYY") + "-" + moment(params.today).endOf("year").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).startOf("year").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).endOf("year").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 730) {
            registerParameter.registerDate = {
                $lte: moment(params.today).add(-1, "year").endOf("year").toDate(),
                $gte: moment(params.today).add(-1, "year").startOf("year").toDate()
            };

            data.today = moment(params.today).add(-1, "year").startOf("year").format("ddd DD/MM/YYYY") + "-" + moment(params.today).add(-1, "year").endOf("year").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).add(-1, "year").startOf("year").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).add(-1, "year").endOf("year").format("ddd DD/MM/YYYY hh:mm");

        }


        let registerList = Co_Register.aggregate([
            {$match: registerParameter},
            {
                $group: {
                    _id: null,
                    totalNumberInvoice: {$sum: 1},
                    total: {$sum: "$netTotal"},
                    totalService: {$sum: "$netTotalService"},
                    totalMedicine: {$sum: "$netTotalMedicine"},
                }
            }

        ])


        let registerServiceDetail = Co_Register.aggregate([
            {$match: registerParameter},
            {
                $unwind: {
                    path: "$services",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        itemName: "$services.serviceName"
                    },
                    totalQty: {$sum: "$services.qty"}
                }
            }
        ])

        let registerMedicineDetail = Co_Register.aggregate([
            {$match: registerParameter},
            {
                $unwind: {
                    path: "$medicines",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        itemName: "$medicines.medicineName"
                    },
                    totalQty: {$sum: "$medicines.qty"}
                }
            }
        ])
        if (registerList.length > 0) {
            data.totalNumberInvoice = registerList[0].totalNumberInvoice;
            data.total = formatCurrency(registerList[0].total, companyDoc.baseCurrency);
            data.totalService = formatCurrency(registerList[0].totalService, companyDoc.baseCurrency);
            data.totalMedicine = formatCurrency(registerList[0].totalMedicine, companyDoc.baseCurrency);
        } else {
            data.totalNumberInvoice = 0;
            data.total = 0;
            data.totalService = 0;
            data.totalMedicine = 0;
        }


        data.todayAs = moment().format("ddd DD/MM/YYYY");
        data.currency = getCurrencySymbolById(companyDoc.baseCurrency);


        let htmlInvoiceService = "";
        if (registerServiceDetail.length > 0) {
            let inc = 1;
            registerServiceDetail.forEach((obj) => {
                htmlInvoiceService += `
                    <tr>
                        <td style="text-align: left !important;">${inc}</td>
                        <td style="text-align: left!important;">${obj._id.itemName || ""}</td>
                        <td>${numeral(obj.totalQty).format("0,00")}</td>
                     
                    </tr>
                   
                `;
                inc++;
            })
        }

        data.htmlInvoiceService = htmlInvoiceService;

        let htmlInvoiceMedicine = "";
        if (registerMedicineDetail.length > 0) {
            let inc = 1;
            registerMedicineDetail.forEach((obj) => {
                htmlInvoiceMedicine += `
                    <tr>
                        <td style="text-align: left !important;">${inc}</td>
                        <td style="text-align: left!important;">${obj._id.itemName || ""}</td>
                        <td>${numeral(obj.totalQty).format("0,00")}</td>
                     
                    </tr>
                   
                `;
                inc++;
            })
        }

        data.htmlInvoiceMedicine = htmlInvoiceMedicine;
        return data;
    }
})
;


function pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }

    return str;

}

let getCurrencySymbolById = function (id) {
    if (id == "USD") {
        return "$";
    } else if (id == "KHR") {
        return "៛";
    } else {
        return "B";
    }
}


let formatCurrency = (amount, currencyId) => {
    let settingDoc = Co_Company.findOne();
    if (currencyId === undefined) {
        currencyId = settingDoc.baseCurrency;
    }
    let newAmount = math.round(numeral(amount).value(), 5);
    let newForm = "";
    switch (currencyId) {
        case "USD":
            newForm = newFormFormat(3);
            break;
        case "KHR":
            newForm = newFormFormat(-2);
            break;
        case "THB":
            newForm = newFormFormat(0);
            break;
    }
    return numeral(newAmount).format(newForm);

};

let newFormFormat = (digit) => {
    let form = "(0,00";
    let k = 0;
    for (let i = 1; i <= digit; i++) {
        if (k === 0) {
            form += ".0";
        } else {
            form += "0";
        }
        k++;
    }
    form += ")";
    return form;
};


