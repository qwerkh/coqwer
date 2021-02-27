import './a4Summary.html';
import {Co_Company} from "../../collection/company";
import JsBarcode from "jsbarcode";

let indexTmpl = Template.co_printA4Summary;

indexTmpl.onCreated(function () {
    this.printData = new ReactiveVar({});
    // this.autorun(() => {
    let inv = FlowRouter.query.get('inv');
    if (inv) {
        Meteor.call('printA4', {invoiceId: inv}, (err, result) => {
            if (result) {
                this.printData.set(result);
            }
        });
    }
    // });
});

indexTmpl.onRendered(function () {
    Meteor.setTimeout(function () {
        window.print();
        FlowRouter.go('/co-data/register')
    }, 2000)
});

indexTmpl.helpers({
    formatDate(value, formatString) {
        return moment(value).format(formatString);
    },
    data() {
        let instance = Template.instance();
        return instance.printData.get();
    },
    no(index) {
        return index + 1;
    },
    getDiscountType(discountType) {
        let companyDoc = Co_Company.findOne({});
        let currencySymbol = "";
        switch (companyDoc.baseCurrency) {
            case "KHR":
                currencySymbol = "៛";
                break;
            case "USD":
                currencySymbol = "$";
                break;
            case "THB":
                currencySymbol = "B";
                break;
        }
        return (discountType === "Percent" || discountType==="P") ? "%" : currencySymbol;
    },
    getSymbolBaseCurrency() {
        let companyDoc = Co_Company.findOne({});
        let currencySymbol = "";
        switch (companyDoc.baseCurrency) {
            case "KHR":
                currencySymbol = "៛";
                break;
            case "USD":
                currencySymbol = "$";
                break;
            case "THB":
                currencySymbol = "B";
                break;
        }
        return currencySymbol;
    },
    checkBaseCurrency() {
        let companyDoc = Co_Company.findOne({});
        if (companyDoc.baseCurrency == "KHR") {
            return false;
        }
        return true;
    },
    isCutHeader() {
        let companyDoc = Co_Company.findOne({});
        return companyDoc.isCutHeader || false;
    },
    isMini() {
        let companyDoc = Co_Company.findOne({});
        return companyDoc.isMiniInvoice || false;
    }

});
indexTmpl.events({
    'click .printInvoice'(event, instance) {
        window.print();
    }
});