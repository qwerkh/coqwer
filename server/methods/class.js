import {VW_Register} from "../../imports/collection/register";

export default class ClassReport {
    static registerReport(param) {
        let parameter = {};

        if (param) {
            parameter = param;
        }
        let registerList = VW_Register.find(parameter).fetch().map(function (obj) {
            /*obj.total = numeral(obj.totalMedicine + obj.totalService).format("0,00.00");
             obj.discountServiceAmount = numeral(obj.totalService - obj.netTotalService).format("0,00.00");
             obj.discountMedicineAmount = numeral(obj.totalMedicine - obj.netTotalMedicine).format("0,00.00");
             obj.totalDiscount = numeral(obj.totalMedicine + obj.totalService - obj.netTotal).format("0,00.00");
             */

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
};

