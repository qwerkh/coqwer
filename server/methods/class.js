import {VW_Register} from "../../imports/collection/register";
import {Co_Register} from "../../imports/collection/register";
import {Co_Journal} from "../../imports/collection/journal";

export default class ClassReport {
    static registerReport(param) {
        let parameter = {};
        let data={};
        let total=0;
        let totalNetTotal=0;
        let totalBalance=0;

        if (param) {
            parameter = param;
        }
        let registerList = VW_Register.find(parameter).fetch().map(function (obj) {

            total+= obj.netTotal-obj.balance;
            totalNetTotal+=obj.netTotal;
            totalBalance+=obj.balance;

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

            obj.totalPaid = numeral(obj.netTotal - obj.balance).format("0,00.00");
            obj.netTotal = numeral(obj.netTotal).format("0,00.00");
            obj.balance = numeral(obj.balance).format("0,00.00");

            /*obj.totalMedicine = numeral(obj.totalMedicine).format("0,00.00");
             obj.totalService = numeral(obj.totalService).format("0,00.00");
             obj.netTotalMedicine = numeral(obj.netTotalMedicine).format("0,00.00");
             obj.netTotalService = numeral(obj.netTotalService).format("0,00.00");*/

            return obj;
        });
        data.data=registerList;
        data.total=numeral(total).format("0,00.00");
        data.totalNetTotal=numeral(totalNetTotal).format("0,00.00");
        data.totalBalance=numeral(totalBalance).format("0,00.00");

        return data;
    }

    static registerByDateReport(param) {
        let parameter = {};
        let data={};
        let total=0;
        let totalNetTotal=0;
        let totalBalance=0;

        if (param) {
            parameter = param;
        }
        let registerList = Co_Register.aggregate([
                {$match: parameter},
                { $project: { registerDate: 1, netTotal: 1, balance: 1, month: { $month: "$registerDate" }, day: { $dayOfMonth: "$registerDate" }, year: { $year: "$registerDate" } } },

                { $group: { _id: { day: "$day", month: "$month", year: "$year"},registerDate: {$last: "$registerDate"},netTotal:{$sum: "$netTotal"},balance:{$sum: "$balance"} }},
                {$sort:{registerDate:1}}
                ]).map(function (obj) {
                obj.registerDate=moment(obj.registerDate).format("DD/MM/YYYY");
                totalNetTotal+=obj.netTotal;
                totalBalance+=obj.balance;
                total+=obj.netTotal+obj.balance;

            obj.totalPaid = numeral(obj.netTotal - obj.balance).format("0,00.00");
            obj.netTotal = numeral(obj.netTotal).format("0,00.00");
            obj.balance = numeral(obj.balance).format("0,00.00");
                return obj;

        });

        data.data=registerList;
        data.total=numeral(total).format("0,00.00");
        data.totalNetTotal=numeral(totalNetTotal).format("0,00.00");
        data.totalBalance=numeral(totalBalance).format("0,00.00");

        return data;
    }


    static profitLostReport(param) {
        let parameter = {};

        if (param) {
            parameter = param;
        }
        let registerList = VW_Register.find(parameter).fetch().map(function (obj) {
            obj.totalPaid = numeral(obj.netTotal - obj.balance).format("0,00.00");

            obj.netTotal = numeral(obj.netTotal).format("0,00.00");
            obj.balance = numeral(obj.balance).format("0,00.00");


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

            /*obj.totalMedicine = numeral(obj.totalMedicine).format("0,00.00");
             obj.totalService = numeral(obj.totalService).format("0,00.00");
             obj.netTotalMedicine = numeral(obj.netTotalMedicine).format("0,00.00");
             obj.netTotalService = numeral(obj.netTotalService).format("0,00.00");*/

            return obj;
        });
        return registerList;
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
                dr += numeral(ob.dr).format("0,00.00") + `<br>`;
                cr += numeral(ob.cr).format("0,00.00") + `<br>`;

            })
            accountName += `<span style="border-top: 1px solid ">Total:</span>`;
            dr += `<span style="border-top: 1px solid ">${numeral(obj.total).format("0,00.00") + getCurrencySymbolById(obj.currencyId)}</span>`;
            cr += `<span style="border-top: 1px solid ">${numeral(obj.total).format("0,00.00") + getCurrencySymbolById(obj.currencyId)}</span>`;
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

