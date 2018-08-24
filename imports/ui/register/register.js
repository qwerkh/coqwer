import './register.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Register} from '../../collection/register';
import {GeneralFunction} from '../../api/methods/generalFunction';
import {RegisterTabular} from '../../../both/tabular/register';

import './registerDetail';
import './../../lib/select2Filter'


let indexTmpl = Template.co_register,
    addTmpl = Template.co_registerAdd,
    editTmpl = Template.co_registerEdit;


patientOption = new ReactiveVar([]);
machinOption = new ReactiveVar([]);
serviceOption = new ReactiveVar([]);

registerDoc = new ReactiveObj({reDoc: {}});

discountTypeService = new ReactiveVar("");
discountService = new ReactiveVar(0);
amountDiscountService = new ReactiveVar(0);
netTotalService = new ReactiveVar(0);


discountTypeMedicine = new ReactiveVar("");
discountMedicine = new ReactiveVar(0);
amountDiscountMedicine = new ReactiveVar(0);
netTotalMedicine = new ReactiveVar(0);

remainAmount = new ReactiveVar(0);
returnAmount = new ReactiveVar(0);
voucherId = new ReactiveVar("");

paidAmount = new ReactiveObj({
    paidAmountDollar: 0,
    paidAmountRiel: 0,
    paidAmountBaht: 0
});
patientName = new ReactiveVar();
patientId = new ReactiveVar();

indexTmpl.helpers({
    dataTable() {
        return RegisterTabular;
    },
    selector() {
        if (FlowRouter.getParam('patientId')) {
            return {rolesArea: Session.get("area"), patientId: FlowRouter.getParam('patientId')};
        }
        return {rolesArea: Session.get("area")};
    }
});

addTmpl.helpers({
    collection() {
        return Co_Register;
    },
    patientOption() {
        return patientOption.get();
    },
    machinOption() {

        return machinOption.get();
    },
    serviceOption() {
        return serviceOption.get();
    },
    patientId() {
        return patientId.get();
    },
    patientName() {
        return patientName.get();
    },
    netTotal() {
        return netTotalService.get() + netTotalMedicine.get();
    },
    result() {
        let result = {};
        result.netAmount = numeral(netTotalService.get() + netTotalMedicine.get()).format("0,00.000");
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

        remainAmount.set(math.round(netTotalService.get() + netTotalMedicine.get(), 2) - GeneralFunction.exchange("THB", Session.get("baseCurrency"), paidAmount.get("paidAmountBaht")) - GeneralFunction.exchange("USD", Session.get("baseCurrency"), paidAmount.get("paidAmountDollar")) - GeneralFunction.exchange("KHR", Session.get("baseCurrency"), paidAmount.get("paidAmountRiel")));

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
        return remainAmount.get();
    },
    voucherId() {
        return voucherId.get();
    }
});

addTmpl.onCreated(function () {


    Meteor.call('co_serviceOption', function (err, result) {
        if (result) {
            serviceOption.set(result);
        }

    })
});

editTmpl.helpers({
    data() {
        /*let id = FlowRouter.getParam('registerId');

        let data = Co_Register.findOne({_id: id});
        return data;*/
        return registerDoc.get("reDoc");

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection() {
        return Co_Register;
    },
    patientOption() {
        return patientOption.get();
    },
    machinOption() {
        return machinOption.get();
    },
    serviceOption() {
        return serviceOption.get();
    },
    netTotal() {
        return netTotalService.get() + netTotalMedicine.get();
    },
    result() {
        let result = {};
        result.netAmount = numeral(netTotalService.get() + netTotalMedicine.get()).format("0,00.000");
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
        remainAmount.set(math.round(netTotalService.get() + netTotalMedicine.get(), 3) - GeneralFunction.exchange("THB", Session.get("baseCurrency"), paidAmount.get("paidAmountBaht")) - GeneralFunction.exchange("USD", Session.get("baseCurrency"), paidAmount.get("paidAmountDollar")) - GeneralFunction.exchange("KHR", Session.get("baseCurrency"), paidAmount.get("paidAmountRiel")));

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
        return remainAmount.get();
    }
})


//event

indexTmpl.events({
    'click .add'() {
    },

    'click .remove'(e) {
        let self = this;
        if (self.paymentNumber <= 1) {
            alertify.confirm(
                'Register',
                'Are you sure to delete [' + self._id + ']?',
                () => {
                    Co_Register.remove(self._id, (error) => {
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
            alertify.error("Can't Remove");
        }
    },
    'click button.edit'(event, instance) {
        event.preventDefault();
        let self = this;
        registerDoc.set("reDoc", {});
        if (self.paymentNumber <= 1) {
            serviceTem.remove({});
            medicineTem.remove({});


            discountTypeService.set(self.discountServiceType);
            discountService.set(self.discountService);

            discountTypeMedicine.set(self.discountMedicineType);
            discountMedicine.set(self.discountMedicine);


            netTotalService.set(self.netTotalService);
            netTotalMedicine.set(self.netTotalMedicine);


            /*    remainAmount.set(0);
             returnAmount.set(0);
             */
            paidAmount.set("paidAmountDollar", self.paidAmountUSD);
            paidAmount.set("paidAmountRiel", self.paidAmountKHR);
            paidAmount.set("paidAmountBaht", self.paidAmountTHB);

            self.medicines.forEach(function (obj) {
                if (obj) {
                    obj._id = obj.medicineId;
                    obj.name = obj.medicineName;
                    medicineTem.insert(obj);
                }
            });
            self.services.forEach(function (obj) {
                if (obj) {
                    obj._id = obj.serviceId;
                    obj.name = obj.serviceName;
                    serviceTem.insert(obj);
                }
            });
            /*Meteor.call('co_patientOption', Session.get("area"), self.patientDoc._id, function (err, result) {
                if (result) {

                    patientOption.set(result);
                }
            });*/

            Meteor.call("co_registerById", self._id, (err, result) => {
                if (result) {
                    result.patientDoc = self.patientDoc;
                    registerDoc.set("reDoc", result);
                }
            });

            FlowRouter.go(`/co-data/register/${self._id}/edit`);

        } else {
            alertify.error("Can't Update");
        }
    },
    'click .show'(event, instance) {
        let self = this;
        FlowRouter.go(`/co-data/register/${self._id}/show`);
    }

})


addTmpl.events({
    'click #save-print'(e, t) {
        FlowRouter.query.set({p: 'true'});
    },
    'click #save-print-summary'(e, t) {
        FlowRouter.query.set({p: 'summary'});
    },
    'click #save-print-sum'(e, t) {
        FlowRouter.query.set({p: 'sum'});
    },
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-data/register`);
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
    'change [name="registerDate"]'(e, t) {
        Session.set("registerDate", e.currentTarget.value);
    }
});

editTmpl.events({
    'click #save-print'(e, t) {
        FlowRouter.query.set({p: 'true'});
    },
    'click #save-print-summary'(e, t) {
        FlowRouter.query.set({p: 'summary'});
    },
    'click #save-print-sum'(e, t) {
        FlowRouter.query.set({p: 'sum'});
    },
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-data/register`);
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
    }
});


addTmpl.onRendered(function () {
    $('.tabular.menu .item').tab();
    // select2Filter($("[name='patientId']"));
    this.autorun(() => {
        if (Session.get("registerDate")) {
            Meteor.call('getLastVoucherRegisterId', Session.get("area"), Session.get("registerDate"), function (err, result) {
                if (result) {
                    voucherId.set((parseInt(result.voucherId) + 1).toString());
                } else {
                    voucherId.set("1");
                }
            });
        }
    })

});


editTmpl.onRendered(function () {

    $('.tabular.menu .item').tab();
    /*this.autorun(() => {
        if (this.subscription.ready()) {
            this.subUserReady.set(true);
        }
    });*/


})

editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);

    Meteor.call('co_serviceOption', function (err, result) {
        if (result) {
            serviceOption.set(result);
        }

    })
    /*this.autorun(() => {
        let id = FlowRouter.getParam('registerId');
        if (id) {
            this.subscription = Meteor.subscribe('co_registerById', {_id: id});
        }
    })*/


})

addTmpl.onCreated(function () {

})


addTmpl.onDestroyed(function () {
    serviceTem.remove({});
    medicineTem.remove({});

    discountTypeService.set("Amount");
    discountService.set(0);

    discountTypeMedicine.set("Amount");
    discountMedicine.set(0);


    netTotalService.set(0);
    netTotalMedicine.set(0);


    remainAmount.set(0);
    returnAmount.set(0);

    amountDiscountService.set(0);
    amountDiscountMedicine.set(0);

    paidAmount.set("paidAmountDollar", 0);
    paidAmount.set("paidAmountRiel", 0);
    paidAmount.set("paidAmountBaht", 0);

    Session.set("registerDate", "");

})

editTmpl.onDestroyed(function () {
    serviceTem.remove({});
    medicineTem.remove({});


    discountTypeService.set("Amount");
    discountService.set(0);

    discountTypeMedicine.set("Amount");
    discountMedicine.set(0);

    netTotalService.set(0);
    netTotalMedicine.set(0);

    remainAmount.set(0);
    returnAmount.set(0);

    amountDiscountService.set(0);
    amountDiscountMedicine.set(0);

    paidAmount.set("paidAmountDollar", 0);
    paidAmount.set("paidAmountRiel", 0);
    paidAmount.set("paidAmountBaht", 0);
})

AutoForm.hooks({
    co_registerAdd: {
        before: {
            insert: function (doc) {
                doc.rolesArea = Session.get('area');

                if (doc.voucherId != "" || doc.voucherId != "0") {
                    doc.voucherId = doc.voucherId.padStart(6, "0");
                }
                doc.registerDate = moment(doc.registerDate).startOf("day").add(12, "hour").toDate();
                let services = [];
                let medicines = [];
                serviceTem.find().fetch().forEach(function (obj) {
                    services.push({
                        serviceId: obj._id,
                        serviceName: obj.name,
                        isRetailPrice: obj.isRetailPrice,
                        machinId: obj.machinId,
                        qty: obj.qty,
                        price: obj.price,
                        amount: obj.amount
                    })
                });
                medicineTem.find().fetch().forEach(function (obj) {
                    medicines.push({
                        medicineId: obj._id,
                        medicineName: obj.name,
                        isRetailPrice: obj.isRetailPrice,
                        qty: obj.qty,
                        price: obj.price,
                        amount: obj.amount
                    })
                });

                doc.services = services;
                doc.medicines = medicines;

                if (doc.balance <= 0) {
                    doc.status = "Complete";
                    doc.balance = 0;
                } else if (doc.balance == doc.netTotal) {
                    doc.status = "Active";
                } else {
                    doc.status = "Partial";
                }

                return doc;
            }
        },
        onSuccess: function (formType, id) {
            let print = FlowRouter.query.get('p');
            let qp = FlowRouter.query.get('qp'); //trigger quick payment
            if (print == 'true') {
                FlowRouter.go('/co-data/register/print?inv=' + id);

            } else if (print == "summary") {
                FlowRouter.go('/co-data/register/printSummary?inv=' + id);


            }
            else if (print == "sum") {
                FlowRouter.go('/co-data/register/printSum?inv=' + id);


            }
            else {
                alertify.success('Successfully');
                FlowRouter.go(`/co-data/patient`);
                FlowRouter.query.unset();
            }
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
    co_registerEdit: {
        before: {
            update: function (doc) {
                let services = [];
                let medicines = [];
                if (doc.$set.voucherId != "" || doc.$set.voucherId != "0") {
                    doc.$set.voucherId = doc.$set.voucherId.padStart(6, "0");
                }
                serviceTem.find().fetch().forEach(function (obj) {
                    services.push({
                        serviceId: obj._id,
                        serviceName: obj.name,
                        isRetailPrice: obj.isRetailPrice,
                        machinId: obj.machinId,
                        qty: obj.qty,
                        price: obj.price,
                        amount: obj.amount
                    })
                });
                medicineTem.find().fetch().forEach(function (obj) {
                    medicines.push({
                        medicineId: obj._id,
                        medicineName: obj.name,
                        isRetailPrice: obj.isRetailPrice,
                        qty: obj.qty,
                        price: obj.price,
                        amount: obj.amount
                    })
                });

                doc.$set.services = services;
                doc.$set.medicines = medicines;
                doc.$set.registerDate = moment(doc.$set.registerDate).startOf("day").add(12, "hour").toDate();

                if (doc.$set.balance <= 0) {
                    doc.$set.status = "Complete";
                    doc.$set.balance = 0;
                } else if (doc.$set.balance == doc.$set.netTotal) {
                    doc.$set.status = "Active";
                } else {
                    doc.$set.status = "Partial";
                }

                doc.$unset = {};
                return doc;
            }
        },
        onSuccess: function (formType, result) {

            let id = this.currentDoc._id;
            let print = FlowRouter.query.get('p');
            // let qp = FlowRouter.query.get('qp'); //trigger quick payment
            if (print == 'true') {
                FlowRouter.go('/co-data/register/print?inv=' + id);
            } else if (print == "summary") {
                FlowRouter.go('/co-data/register/printSummary?inv=' + id);

            }
            else if (print == "sum") {
                FlowRouter.go('/co-data/register/printSum?inv=' + id);

            } else {
                alertify.success('Updated Successfully');
                FlowRouter.go(`/co-data/register`);
                FlowRouter.query.unset();
            }
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
});



