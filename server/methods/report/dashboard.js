import {Meteor} from 'meteor/meteor';


import numeral from 'numeral';
import {Co_Company} from "../../../imports/collection/company";
import {Co_Register} from "../../../imports/collection/register";


Meteor.methods({
    dashboardReport(params) {
        let invoiceParameter = {};
        let receivePaymentParameter = {};
        let debtParameter = {};
        let data = {};

        if (params.area != "") {
            invoiceParameter.rolesArea = params.area;
            receivePaymentParameter.rolesArea = params.area;
            debtParameter.rolesArea = params.area;
        }
        if (params.locationId != "") {
            invoiceParameter.locationId = params.locationId;
            receivePaymentParameter.locationId = params.locationId;
            debtParameter.locationId = params.locationId;
        }

        let companyDoc = Co_Company.findOne({});


        if (params.minusDay < 7) {
            let dayAdd = -params.minusDay;

            invoiceParameter.invoiceDate = {
                $lte: moment(params.today).add(dayAdd, "days").endOf("days").toDate(),
                $gte: moment(params.today).add(dayAdd, "days").startOf("days").toDate()
            };
            receivePaymentParameter.receivePaymentDate = {
                $lte: moment(params.today).add(dayAdd, "days").endOf("days").toDate(),
                $gte: moment(params.today).add(dayAdd, "days").startOf("days").toDate()
            };

            data.today = moment(params.today).add(dayAdd, "days").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).add(dayAdd, "days").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 7) {
            invoiceParameter.invoiceDate = {
                $lte: moment(params.today).endOf("week").toDate(),
                $gte: moment(params.today).startOf("week").toDate()
            };
            receivePaymentParameter.receivePaymentDate = {
                $lte: moment(params.today).endOf("week").toDate(),
                $gte: moment(params.today).startOf("week").toDate()
            };
            data.today = moment(params.today).startOf("week").format("ddd DD/MM/YYYY") + "-" + moment(params.today).endOf("week").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).startOf("week").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).endOf("week").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 14) {
            invoiceParameter.invoiceDate = {
                $lte: moment(params.today).add(-7, "days").endOf("week").toDate(),
                $gte: moment(params.today).add(-7, "days").startOf("week").toDate()
            };
            receivePaymentParameter.receivePaymentDate = {
                $lte: moment(params.today).add(-7, "days").endOf("week").toDate(),
                $gte: moment(params.today).add(-7, "days").startOf("week").toDate()
            };

            data.today = moment(params.today).add(-7, "days").startOf("week").format("ddd DD/MM/YYYY") + "-" + moment(params.today).add(-7, "days").endOf("week").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).add(-7, "days").startOf("week").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).add(-7, "days").endOf("week").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 30) {
            invoiceParameter.invoiceDate = {
                $lte: moment(params.today).endOf("month").toDate(),
                $gte: moment(params.today).startOf("month").toDate()
            };
            receivePaymentParameter.receivePaymentDate = {
                $lte: moment(params.today).endOf("month").toDate(),
                $gte: moment(params.today).startOf("month").toDate()
            };
            data.today = moment(params.today).startOf("month").format("ddd DD/MM/YYYY") + "-" + moment(params.today).endOf("month").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).startOf("month").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).endOf("month").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 60) {
            invoiceParameter.invoiceDate = {
                $lte: moment(params.today).add(-1, "month").endOf("month").toDate(),
                $gte: moment(params.today).add(-1, "month").startOf("month").toDate()
            };
            receivePaymentParameter.receivePaymentDate = {
                $lte: moment(params.today).add(-1, "month").endOf("month").toDate(),
                $gte: moment(params.today).add(-1, "month").startOf("month").toDate()
            };
            data.today = moment(params.today).add(-1, "month").startOf("month").format("ddd DD/MM/YYYY") + "-" + moment(params.today).add(-1, "month").endOf("month").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).add(-1, "month").startOf("month").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).add(-1, "month").endOf("month").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 365) {
            invoiceParameter.invoiceDate = {
                $lte: moment(params.today).endOf("year").toDate(),
                $gte: moment(params.today).startOf("year").toDate()
            };
            receivePaymentParameter.receivePaymentDate = {
                $lte: moment(params.today).endOf("year").toDate(),
                $gte: moment(params.today).startOf("year").toDate()
            };
            data.today = moment(params.today).startOf("year").format("ddd DD/MM/YYYY") + "-" + moment(params.today).endOf("year").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).startOf("year").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).endOf("year").format("ddd DD/MM/YYYY hh:mm");

        } else if (params.minusDay === 730) {
            invoiceParameter.invoiceDate = {
                $lte: moment(params.today).add(-1, "year").endOf("year").toDate(),
                $gte: moment(params.today).add(-1, "year").startOf("year").toDate()
            };
            receivePaymentParameter.receivePaymentDate = {
                $lte: moment(params.today).add(-1, "year").endOf("year").toDate(),
                $gte: moment(params.today).add(-1, "year").startOf("year").toDate()
            };
            data.today = moment(params.today).add(-1, "year").startOf("year").format("ddd DD/MM/YYYY") + "-" + moment(params.today).add(-1, "year").endOf("year").format("ddd DD/MM/YYYY");
            data.todayAndTime = moment(params.today).add(-1, "year").startOf("year").format("ddd DD/MM/YYYY hh:mm") + "-" + moment(params.today).add(-1, "year").endOf("year").format("ddd DD/MM/YYYY hh:mm");

        }


        debtParameter.invoiceDate = {
            $lte: moment(params.date).endOf("day").toDate(),
        };

        debtParameter.$or = [
            {
                closeDate: {
                    $exists: false
                }
            },
            {
                status: {$ne: "Complete"}
            },
            {
                closeDate: {
                    $gt: moment().endOf("day").toDate()
                }
            }
        ];

        let invoiceList = Co_Register.aggregate([
            {$match: invoiceParameter},
            {
                $group: {
                    _id: null,
                    totalNumberInvoice: {$sum: {$cond: [{$ne: ["$transactionType", "Invoice Sale Order"]}, 1, 0]}},
                    totalNumberInvoiceReceiveItem: {$sum: {$cond: [{$eq: ["$transactionType", "Invoice Sale Order"]}, 1, 0]}},

                    totalInvoice: {$sum: {$cond: [{$ne: ["$transactionType", "Invoice Sale Order"]}, "$netTotal", 0]}},
                    totalReceiveItem: {$sum: {$cond: [{$eq: ["$transactionType", "Invoice Sale Order"]}, "$netTotal", 0]}},

                }
            }
        ])

        let receivePaymentList = Pos_ReceivePayment.aggregate([
            {$match: receivePaymentParameter},
            {
                $group: {
                    _id: null,
                    totalPaid: {$sum: "$totalPaid"}
                }
            }
        ])


        let debtList = Co_Register.aggregate([
            {$match: debtParameter},
            {
                $group: {
                    _id: null,
                    totalNetAmount: {$sum: "$netTotal"},
                    totalPaid: {$sum: "$paid"},
                }
            }
        ]);


        let invoiceDetail = Co_Register.aggregate([
            {$match: invoiceParameter},
            {
                $unwind: {
                    path: "$item",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        itemName: "$item.itemName"
                    },
                    totalQty: {$sum: {$cond: [{$ne: ["$transactionType", "Invoice Sale Order"]}, "$item.qty", 0]}},
                    totalQtyReceiveItem: {$sum: {$cond: [{$ne: ["$transactionType", "Invoice Sale Order"]}, 0, "$item.qty"]}},

                }
            }
        ])
        if (invoiceList.length > 0) {
            data.totalNumberInvoice = invoiceList[0].totalNumberInvoice;
            data.totalNumberInvoiceReceiveItem = invoiceList[0].totalNumberInvoiceReceiveItem;
            data.totalInvoice = formatCurrency(invoiceList[0].totalInvoice, companyDoc.baseCurrency);
            data.totalReceiveItem = formatCurrency(invoiceList[0].totalReceiveItem, companyDoc.baseCurrency);
        } else {
            data.totalNumberInvoice = 0;
            data.totalNumberInvoiceReceiveItem = 0;
            data.totalInvoice = 0;
            data.totalReceiveItem = 0;
        }

        if (receivePaymentList.length > 0) {
            data.totalReceivePayment = formatCurrency(receivePaymentList[0].totalPaid, companyDoc.baseCurrency);
        } else {
            data.totalReceivePayment = 0;

        }
        if (debtList.length > 0) {
            data.debtTotal = formatCurrency(debtList[0].totalNetAmount - debtList[0].totalPaid, companyDoc.baseCurrency);
        }


        data.todayAs = moment().format("ddd DD/MM/YYYY");
        data.currency = getCurrencySymbolById(companyDoc.baseCurrency);


        let htmlInvoice = "";
        if (invoiceDetail.length > 0) {
            let inc = 1;
            invoiceDetail.forEach((obj) => {
                htmlInvoice += `
                    <tr>
                        <td style="text-align: center !important;">${inc}</td>
                        <td style="text-align: left!important;">${obj._id.itemName.split(":")[1]}</td>
                        <td>${numeral(obj.totalQty).format("0,00")}</td>
                        <td>${numeral(obj.totalQtyReceiveItem).format("0,00")}</td>
                        <td>${numeral(obj.totalQty + obj.totalQtyReceiveItem).format("0,00")}</td>
                    </tr>
                   
                `;
                inc++;
            })
        }

        data.htmlInvoice = htmlInvoice;


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
