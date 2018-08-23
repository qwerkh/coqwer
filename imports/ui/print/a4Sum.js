import './a4Sum.html';
import {Co_Company} from "../../collection/company";

let indexTmpl = Template.co_printA4Sum;

indexTmpl.onCreated(function () {
    this.printData = new ReactiveVar({});
    // this.autorun(() => {
    let inv = FlowRouter.query.get('inv');
    if (inv) {
        Meteor.call('printA4', {invoiceId: inv, summary: true}, (err, result) => {
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

    noMedicine(index, len) {
        console.log(len);
        return index + 1 + (len || 0);
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

        return discountType == "Percent" ? "%" : currencySymbol;
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
    }

});
indexTmpl.events({
    'click .printInvoice'(event, instance) {
        window.print();
    }
});