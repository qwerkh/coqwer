import './payment.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Payment} from '../../collection/payment';
import {PaymentTabular} from '../../../both/tabular/payment';
import {GeneralFunction} from '../../api/methods/generalFunction'
import {Co_Company} from "../../collection/company";


let indexTmpl = Template.co_payment,
    addTmpl = Template.co_paymentAdd,
    editTmpl = Template.co_paymentEdit;

patientPaymentOption = new ReactiveVar([]);
registerPaymentOption = new ReactiveVar([]);

patientId = new ReactiveVar();
registerId = new ReactiveVar();

registerTem = new Meteor.Collection(null);
balanceUnpaid = new ReactiveVar(0);

oldStatus = new ReactiveVar("");
oldBalance = new ReactiveVar("");

patientDocPayment = new ReactiveVar();
voucherId = new ReactiveVar("");

indexTmpl.helpers({
    dataTable() {
        return PaymentTabular;
    },
    selector() {
        let userId = Meteor.userId();
        let companyDoc = Co_Company.findOne({});
        if (companyDoc.asigneUser.indexOf(userId) > -1) {
        } else {
            let hideDollar = companyDoc.hideIfGreater;
            let hideRiel = 0;
            let hideBaht = 0;
            if (companyDoc.baseCurrency === "USD") {
                hideDollar = companyDoc.hideIfGreater;
                hideRiel = companyDoc.hideIfGreater * 4000;
                hideBaht = companyDoc.hideIfGreater * 33;
            } else if (companyDoc.baseCurrency === "KHR") {
                hideDollar = companyDoc.hideIfGreater / 4000;
                hideRiel = companyDoc.hideIfGreater;
                hideBaht = companyDoc.hideIfGreater / 120;
            } else {
                hideDollar = companyDoc.hideIfGreater / 33;
                hideRiel = companyDoc.hideIfGreater * 120;
                hideBaht = companyDoc.hideIfGreater;
            }
            return {rolesArea: Session.get("area"), paidAmountUSD: {$lt: hideDollar}, paidAmountKHR: {$lt: hideRiel}, paidAmountTHB: {$lt: hideBaht}};
        }
        return {rolesArea: Session.get("area")};
    }

});


addTmpl.onRendered(function () {

    this.autorun(function () {
        if (patientId.get()) {
            if (registerId.get()) {
                Meteor.call('getRegisterByPatient', patientId.get(), registerId.get(), function (err, result) {

                    registerTem.remove({});
                    balanceUnpaid.set(0);

                    if (result) {
                        registerTem.insert(result);

                        oldStatus.set(result.status);
                        oldBalance.set(result.balance);


                        balanceUnpaid.set(result.balance);
                    }
                })
            }
        }

        if (Session.get("paymentDate")) {
            Meteor.call('getLastVoucherId', Session.get("area"), Session.get("paymentDate"), function (err, result) {
                if (result) {
                    voucherId.set((parseInt(result.voucherId) + 1).toString());
                } else {
                    voucherId.set("1");
                }
            });
        }
    })
})

addTmpl.events({
    'change [name="patientId"]'(e, t) {
        patientId.set(e.currentTarget.value);
        registerId.set(undefined);
        $("[name='registerId']").parents('.selection.dropdown').dropdown('clear');
        balanceUnpaid.set(0);

        Meteor.call("co_patientById", e.currentTarget.value, function (err, result) {
            if (result) {
                patientDocPayment.set(result);
            }
        });

    },
    'change [name="registerId"]'(e, t) {
        registerId.set(e.currentTarget.value);
    },
    'keyup [name="paidAmountUSD"]'(e, t) {
        if (e.currentTarget.value == "") {
            paidAmount.set("paidAmountDollar", 0);
        } else {
            paidAmount.set("paidAmountDollar", parseFloat(e.currentTarget.value));
        }
    },
    'keyup [name="paidAmountKHR"]'(e, t) {
        if (e.currentTarget.value == "") {
            paidAmount.set("paidAmountRiel", 0);
        } else {
            paidAmount.set("paidAmountRiel", parseFloat(e.currentTarget.value));
        }
    },
    'keyup [name="paidAmountTHB"]'(e, t) {
        if (e.currentTarget.value == "") {
            paidAmount.set("paidAmountBaht", 0);
        } else {
            paidAmount.set("paidAmountBaht", parseFloat(e.currentTarget.value));
        }
    },
    'click .quickCashOne'(e, t) {
        let val = numeral(e.currentTarget.text).value();
        if (Session.get("baseCurrency") == "USD") {
            paidAmount.set("paidAmountDollar", val);
        } else if (Session.get("baseCurrency") == "KHR") {
            paidAmount.set("paidAmountRiel", val);
        } else {
            paidAmount.set("paidAmountBaht", val);
        }
    },
    'click .quickCashTwo'(e, t) {

        let val = numeral(e.currentTarget.text).value();
        if (Session.get("baseCurrency") == "USD") {
            paidAmount.set("paidAmountDollar", val);
        } else if (Session.get("baseCurrency") == "KHR") {
            paidAmount.set("paidAmountRiel", val);
        } else {
            paidAmount.set("paidAmountBaht", val);
        }
    },
    'click .quickCashThree'(e, t) {

        let val = numeral(e.currentTarget.text).value();
        if (Session.get("baseCurrency") == "USD") {
            paidAmount.set("paidAmountDollar", val);
        } else if (Session.get("baseCurrency") == "KHR") {
            paidAmount.set("paidAmountRiel", val);
        } else {
            paidAmount.set("paidAmountBaht", val);
        }
    },
    'click .quickCashFour'(e, t) {

        let val = numeral(e.currentTarget.text).value();
        if (Session.get("baseCurrency") == "USD") {
            paidAmount.set("paidAmountDollar", val);
        } else if (Session.get("baseCurrency") == "KHR") {
            paidAmount.set("paidAmountRiel", val);
        } else {
            paidAmount.set("paidAmountBaht", val);
        }
    },
    'change [name="paymentDate"]'(e, t) {
        Session.set("paymentDate", e.currentTarget.value);
    }
})

addTmpl.helpers({
    collection() {
        return Co_Payment;
    },

    patientDoc() {
        return patientDocPayment.get();
    },
    netTotal() {
        return balanceUnpaid.get();
    },
    result() {
        let result = {};
        result.netAmount = numeral(balanceUnpaid.get()).format("0,00.000");
        result.netDiscount = isNaN(parseFloat(amountDiscountService.get()) + parseFloat(amountDiscountMedicine.get())) ? 0 : parseFloat(amountDiscountService.get()) + parseFloat(amountDiscountMedicine.get());
        return result;
    },
    returnAmount() {
        let returns = {};
        returns.returnAmountDollar = GeneralFunction.exchange(Session.get("baseCurrency"), "USD", returnAmount.get());
        returns.returnAmountRiel = GeneralFunction.exchange(Session.get("baseCurrency"), "KHR", returnAmount.get());
        returns.returnAmountBaht = GeneralFunction.exchange(Session.get("baseCurrency"), "THB", returnAmount.get());

        return returns;
    },
    remainAmount() {
        let remain = {};

        remainAmount.set(balanceUnpaid.get() - GeneralFunction.exchange("THB", Session.get("baseCurrency"), paidAmount.get("paidAmountBaht")) - GeneralFunction.exchange("USD", Session.get("baseCurrency"), paidAmount.get("paidAmountDollar")) - GeneralFunction.exchange("KHR", Session.get("baseCurrency"), paidAmount.get("paidAmountRiel")));

        if (remainAmount.get() < 0) {
            returnAmount.set(remainAmount.get() * (-1));

            remain.remainAmountKHR = numeral(0).format("0,00");
            remain.remainAmountUSD = numeral(0).format("0,00.000");
            remain.remainAmountTHB = numeral(0).format("0,00");

        } else {
            returnAmount.set(0);

            remain.remainAmountKHR = numeral(GeneralFunction.exchange(Session.get("baseCurrency"), "KHR", remainAmount.get())).format("0,00");
            remain.remainAmountUSD = numeral(GeneralFunction.exchange(Session.get("baseCurrency"), "USD", remainAmount.get())).format("0,00.000");
            remain.remainAmountTHB = numeral(GeneralFunction.exchange(Session.get("baseCurrency"), "THB", remainAmount.get())).format("0,00");
        }

        return remain;
    },
    balance() {
        return remainAmount.get() > 0 ? remainAmount.get() : 0;
    },
    patientOption() {
        return patientPaymentOption.get();
    },
    registerOption() {
        return registerPaymentOption.get();
    },
    registerList() {
        return registerTem.find();
    },
    paid() {
        return numeral(GeneralFunction.exchange("USD", Session.get("baseCurrency"), paidAmount.get("paidAmountDollar")) + GeneralFunction.exchange("KHR", Session.get("baseCurrency"), paidAmount.get("paidAmountRiel")) + GeneralFunction.exchange("THB", Session.get("baseCurrency"), paidAmount.get("paidAmountBaht"))).format("0,00.000");
    },
    quickCashOne() {
        return numeral(balanceUnpaid.get()).format("0,00.000");
    },
    quickCashTwo() {
        return cashTwo(balanceUnpaid.get());
    },
    quickCashThree() {
        return cashThree(balanceUnpaid.get());
    },
    quickCashFour() {
        return cashFour(balanceUnpaid.get());
    },
    paidAmountUSD() {
        return paidAmount.get("paidAmountDollar");
    },
    paidAmountKHR() {
        return paidAmount.get("paidAmountRiel");
    },
    paidAmountTHB() {
        return paidAmount.get("paidAmountBaht");
    },
    voucherId() {
        return voucherId.get();
    }
})

editTmpl.helpers({
    data() {

        let id = FlowRouter.getParam('paymentId');
        return Co_Payment.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection() {
        return Co_Payment;
    }
})


//event

indexTmpl.events({
    'click .add'() {

    },

    'click .remove'(e) {
        var self = this;
        if (self.fromRegister == false) {
            if (self.canRemove == true) {
                alertify.confirm(
                    'Payment',
                    'Are you sure to delete [' + self._id + ']?',
                    () => {
                        Co_Payment.remove(self._id, (error) => {
                            if (error) {
                                alertify.error(error.message);
                            } else {
                                alertify.success('Deleted Successfully');
                                $(e.currentTarget).parents('tr').remove();
                            }
                        })
                    },
                    null
                )
            } else {
                alertify.error("Can't remove ! Not Last Payment");
            }
        } else {
            alertify.error("Can't Remove! It's Auto Generate From Register!!");
        }

    },
    'click button.edit'(event, instance) {
        let self = this;
        alertify.error("Can't Edit");
        return false;
        FlowRouter.go(`/co-data/payment/${self._id}/edit`);
    },
    'click .show'(event, instance) {
        let self = this;
        FlowRouter.go(`/co-data/payment/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-data/payment`);
    }
})

editTmpl.events({
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-data/payment`);
    }
});


addTmpl.onRendered(function () {
})
editTmpl.onRendered(function () {
    this.autorun(() => {
        if (this.subscription.ready()) {
            this.subUserReady.set(true);
        }
    });
})

editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(() => {
        let id = FlowRouter.getParam('paymentId');
        if (id) {
            this.subscription = Meteor.subscribe('co_paymentById', {_id: id});
        }
    })
})

addTmpl.onDestroyed(function () {
    patientId.set(undefined);
    registerId.set(undefined);
    balanceUnpaid.set(0);

    registerTem.remove({});


    netTotalService.set(0);
    netTotalMedicine.set(0);


    remainAmount.set(0);
    returnAmount.set(0);


    paidAmount.set("paidAmountDollar", 0);
    paidAmount.set("paidAmountRiel", 0);
    paidAmount.set("paidAmountBaht", 0);

    Session.set("paymentDate", "");
})


AutoForm.hooks({
    co_paymentAdd: {
        before: {
            insert: function (doc) {

                doc.oldStatus = oldStatus.get();
                doc.oldBalance = oldBalance.get();

                doc.voucherId = doc.voucherId.padStart(6, "0");

                doc.paymentDate = moment(doc.paymentDate).startOf("day").add(12, "hour").toDate();
                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-data/payment`);
            FlowRouter.query.unset();
        },
        onError: function (formType, error) {
            alertify.error(error.message);
            FlowRouter.query.unset();
        },
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            this.done();
        }
    },
    co_paymentEdit: {
        before: {
            update: function (doc) {
                doc.$set.paymentDate = moment(doc.paymentDate).startOf("day").add(12, "hour").toDate();
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Updated Successfully');
            FlowRouter.go(`/co-data/payment`);
            FlowRouter.query.unset();
        },
        onError: function (formType, error) {
            alertify.error(error.message);
            FlowRouter.query.unset();
        },
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            this.done();
        }
    }
})


function cashTwo(val) {
    if (Session.get("baseCurrency") == "USD") {
        return numeral(math.round(val) + 1).format("0,00.000");
    } else if (Session.get("baseCurrency") == "KHR") {
        let numberOfMoney = numeral((val + 1) / 5000).format("0,00");
        return numeral((numeral(numberOfMoney).value() + 1) * 5000).format("0,00");
    } else {
        let numberOfMoney = numeral((val + 1) / 20).format("0,00");
        return numeral((numeral(numberOfMoney).value() + 1) * 20).format("0,00");
    }
}

function cashThree(val) {
    if (Session.get("baseCurrency") == "USD") {
        let numberOfMoney = numeral((val + 1) / 10).format("0,00.000");
        return numeral((numeral(numberOfMoney).value() + 1) * 10).format("0,00.000");
    } else if (Session.get("baseCurrency") == "KHR") {
        let numberOfMoney = numeral((val + 1) / 5000).format("0,00");
        return numeral((numeral(numberOfMoney).value() + 2) * 5000).format("0,00");
    } else {
        let numberOfMoney = numeral((val + 1) / 20).format("0,00");
        return numeral((numeral(numberOfMoney).value() + 2) * 20).format("0,00");
    }
}

function cashFour(val) {
    if (Session.get("baseCurrency") == "USD") {
        let numberOfMoney = numeral((val + 1) / 10).format("0,00.000");
        return numeral((numeral(numberOfMoney).value() + 2) * 10).format("0,00.000");
    } else if (Session.get("baseCurrency") == "KHR") {
        let numberOfMoney = numeral((val + 1) / 5000).format("0,00");
        return numeral((numeral(numberOfMoney).value() + 3) * 5000).format("0,00");
    } else {
        let numberOfMoney = numeral((val + 1) / 20).format("0,00");
        return numeral((numeral(numberOfMoney).value() + 3) * 20).format("0,00");
    }
}

