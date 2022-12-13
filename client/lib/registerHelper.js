import {GeneralFunction} from "../../imports/api/methods/generalFunction";

Template.registerHelper('formatDate', (date) => {

    if (date) {
        return moment(date).format("DD/MMMM/YYYY");
    }
});

Template.registerHelper('formatNumber', (dataNumber) => {
    if (dataNumber) {
        return numeral(dataNumber).format("0,00.000");
    }
    return 0;
});
Template.registerHelper('exchangeFn', (amount, curTo) => {
    let val = 0;
    if (curTo === "USD") {
        val = GeneralFunction.exchange(Session.get("baseCurrency"), curTo, amount);

    } else if (curTo === "KHR") {
        val = GeneralFunction.exchange(Session.get("baseCurrency"), curTo, amount);

    } else if (curTo === "THB") {
        val = GeneralFunction.exchange(Session.get("baseCurrency"), curTo, amount);
    } else {
        val = GeneralFunction.exchange(Session.get("baseCurrency"), curTo, amount);
    }
    val = math.round(val * 100) / 100;
    val = numeral(val).value() + "";
    let newVal = val.split(".");
    return newVal[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (!!newVal[1] ? "." + newVal[1] : "");
});

Template.registerHelper('seperateNumber', (val) => {
    if (val !== "" && val !== undefined && val !== 0 && val !== '0' && val !== null) {
        val = math.round(val * 100) / 100;
        val = numeral(val).value() + "";
        let newVal = val.split(".");
        return newVal[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (!!newVal[1] ? "." + newVal[1] : "");
    }
    return 0;
});
