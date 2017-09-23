import './registerDetail.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Register} from '../../collection/register';


let registerServiceTmpl = Template.co_registerService,
    registerMedicineTmpl = Template.co_registerMedicine;


serviceTem = new Meteor.Collection(null);
medicineTem = new Meteor.Collection(null);

let serviceOption = new ReactiveVar([]);
let totalService = new ReactiveVar(0);

let medicineOption = new ReactiveVar([]);
let totalMedicine = new ReactiveVar(0);

registerServiceTmpl.onCreated(function () {

    Meteor.call('co_serviceOption', Session.get("area"), function (err, result) {
        if (result) {
            serviceOption.set(result);
        }

    })
})
registerServiceTmpl.helpers({
    schemaService(){
        return Co_Register.serviceForm;
    },
    serviceOption(){
        reactTotalService();
        return serviceOption.get();
    },
    serviceList(){
        return serviceTem.find().fetch();
    },
    totalService(){
        return totalService.get();
    },
    netTotalService(){
        return netTotalService.get();
    },
    discountServiceType(){
        return discountTypeService.get();
    },
    discountService(){
        return discountService.get();
    }
})

registerServiceTmpl.onRendered(function () {
    $("[name='discountType']").val("Amount").trigger("change");
    $('.ui.checkbox')
        .checkbox()
    ;
})


registerServiceTmpl.events({
    'change [name="serviceId"]'(e, t){
        let serviceId = e.currentTarget.value;
        if (serviceId != "") {
            Meteor.call("co_serviceById", serviceId, Session.get("area"), function (err, result) {
                if (result) {
                    let service = serviceTem.find({_id: serviceId}).fetch();
                    if (service.length == 0 && serviceId != "") {
                        serviceTem.insert({
                            _id: result._id,
                            name: result.name,
                            isRetailPrice: false,
                            price: result.price,
                            qty: 1,
                            machinId: result.machinId,
                            amount: result.price
                        })
                    }
                    serviceId = "";
                    $("[name='serviceId']").parents('.selection.dropdown').dropdown('clear');

                }
            })
        }
    },
    'keyup [name="price"]'(e, t){
        let serviceId = $(e.currentTarget).attr("data_id");
        let serviceDoc = serviceTem.findOne({_id: serviceId});
        if (serviceDoc) {
            let amount = e.currentTarget.value * serviceDoc.qty;
            serviceTem.update(
                serviceDoc._id,
                {
                    $set: {price: e.currentTarget.value, amount: amount}
                }
            );
        }

    },
    'keyup [name="qty"]'(e, t){
        let serviceId = $(e.currentTarget).attr("data_id");
        let serviceDoc = serviceTem.findOne({_id: serviceId});
        if (serviceDoc) {
            let amount = e.currentTarget.value * serviceDoc.price;
            serviceTem.update(
                serviceDoc._id,
                {
                    $set: {qty: e.currentTarget.value, amount: amount}
                }
            );
        }

    },
    'click .delete-service'(e, t){
        alertify.confirm("Service", "Are You Sure?", () => {
            serviceTem.remove(this._id, (err, result) => {
                reactTotalService();
                if (err) {
                    alertify.error(err.message);
                } else {
                    alertify.success('Deleted Successfully');

                }
            });
        }, null);

    },
    'change [name="discountServiceType"]'(e, t){
        discountTypeService.set(e.currentTarget.value);
        reactTotalService();
    },
    'keyup [name="discountService"]'(e, t){
        discountService.set(e.currentTarget.value);
        reactTotalService();
    },

    'change [name="isRetailPrice"]'(e, t){
        let isRetail = $(e.currentTarget).prop("checked");
        let serviceId = $(e.currentTarget).attr("data_id");
        Meteor.call("co_serviceById", serviceId, Session.get("area"), function (err, result) {
            if (result) {
                let serviceDoc = serviceTem.findOne({_id: serviceId});
                if (serviceDoc) {
                    if (isRetail == false) {
                        let amount = serviceDoc.qty * result.price;
                        serviceTem.update(
                            serviceDoc._id,
                            {
                                $set: {amount: amount, isRetailPrice: isRetail, price: result.price}
                            }
                        );
                    } else {
                        let amount = serviceDoc.qty * result.retailPrice;
                        serviceTem.update(
                            serviceDoc._id,
                            {
                                $set: {
                                    amount: amount, isRetailPrice: isRetail, price: result.retailPrice
                                }
                            });
                    }
                }
            }
        })
    }
})


registerMedicineTmpl.helpers({
    medicineOption(){
        reactTotalMedicine();
        return medicineOption.get();
    },
    medicineList(){
        return medicineTem.find().fetch();
    },
    totalMedicine(){
        return totalMedicine.get();
    },
    netTotalMedicine(){
        return netTotalMedicine.get();
    },
    schemaMedicine(){
        return Co_Register.medicineForm;
    },
    discountMedicineType(){
        return discountTypeMedicine.get();
    },
    discountMedicine(){
        return discountMedicine.get();
    }
})

registerMedicineTmpl.onRendered(function () {
    $("[name='discountType']").val("Amount").trigger("change");
    $('.ui.checkbox')
        .checkbox()
    ;
})

registerMedicineTmpl.onCreated(function () {
    Meteor.call('co_medicineOption', function (err, result) {
        if (result) {
            medicineOption.set(result);
        }

    })


})

registerMedicineTmpl.events({
    'change [name="medicineId"]'(e, t){
        let medicineId = e.currentTarget.value;
        if (medicineId != "") {
            Meteor.call("co_medicineById", medicineId, function (err, result) {
                if (result) {
                    let medicine = medicineTem.find({_id: medicineId}).fetch();
                    if (medicine.length == 0 && medicineId != "") {
                        medicineTem.insert({
                            _id: result._id,
                            name: result.name,
                            isRetailPrice: false,
                            price: result.price,
                            qty: 1,
                            amount: result.price
                        })
                    }
                    medicineId = "";
                    $("[name='medicineId']").parents('.selection.dropdown').dropdown('clear');
                }

            })
        }


    },
    'keyup [name="price"]'(e, t){
        let medicineId = $(e.currentTarget).attr("data_id");
        let medicineDoc = medicineTem.findOne({_id: medicineId});
        if (medicineDoc) {
            Meteor.setTimeout(function () {
                let amount = e.currentTarget.value * medicineDoc.qty;
                medicineTem.update(
                    medicineDoc._id,
                    {
                        $set: {price: e.currentTarget.value, amount: amount}
                    }
                );
            }, 500)
        }

    },
    'keyup [name="qty"]'(e, t){
        let medicineId = $(e.currentTarget).attr("data_id");
        let medicineDoc = medicineTem.findOne({_id: medicineId});
        if (medicineDoc) {
            Meteor.setTimeout(function () {
                let amount = e.currentTarget.value * medicineDoc.price;
                medicineTem.update(
                    medicineDoc._id,
                    {
                        $set: {qty: e.currentTarget.value, amount: amount}
                    }
                );
            }, 500)
        }
    },
    'click .delete-medicine'(e, t){

        alertify.confirm("Medicine", "Are You Sure?", () => {
            medicineTem.remove(this._id, (err) => {
                reactTotalMedicine();
                if (err) {
                    alertify.error(err.message);
                } else {
                    alertify.success('Deleted Successfully');
                }
            });
        }, null);
    },
    'change [name="discountMedicineType"]'(e, t){
        discountTypeMedicine.set(e.currentTarget.value);
        reactTotalMedicine();
    },
    'keyup [name="discountMedicine"]'(e, t){
        discountMedicine.set(e.currentTarget.value);
        reactTotalMedicine();
    },

    'change [name="isRetailPrice"]'(e, t){
        let isRetail = $(e.currentTarget).prop("checked");
        let medicineId = $(e.currentTarget).attr("data_id");
        Meteor.call("co_medicineById", medicineId, Session.get("area"), function (err, result) {
            if (result) {
                let medicineDoc = medicineTem.findOne({_id: medicineId});
                if (medicineDoc) {
                    if (isRetail == false) {
                        let amount = medicineDoc.qty * result.price;
                        medicineTem.update(
                            medicineDoc._id,
                            {
                                $set: {amount: amount, isRetailPrice: isRetail, price: result.price}
                            }
                        );
                    } else {
                        let amount = medicineDoc.qty * result.retailPrice;
                        medicineTem.update(
                            medicineDoc._id,
                            {
                                $set: {
                                    amount: amount, isRetailPrice: isRetail, price: result.retailPrice
                                }
                            });
                    }
                }
            }
        })
    }

})


registerMedicineTmpl.onDestroyed(function () {
    totalMedicine.set(0);
})

registerServiceTmpl.onDestroyed(function () {
    totalService.set(0);
})

let reactTotalService = function () {
    let serviceList = serviceTem.find().fetch();
    let total = 0;
    let netTotal = 0;

    totalService.set(0);
    amountDiscountService.set(0);
    netTotalService.set(0);

    if (serviceList.length > 0) {
        serviceList.forEach(function (obj) {
            total += obj.amount;
        })

        totalService.set(total);

        if (discountTypeService.get() == "Amount") {
            netTotal = total - discountService.get();
            amountDiscountService.set(discountService.get());
        } else if (discountTypeService.get() == "Percent") {
            netTotal = total - (total * discountService.get() / 100);
            amountDiscountService.set(total * discountService.get() / 100);
        }
        netTotalService.set(math.round(netTotal, 3));
    }
}


let reactTotalMedicine = function () {
    let medicineList = medicineTem.find().fetch();
    let total = 0;
    let netTotal = 0;

    totalMedicine.set(0);
    amountDiscountMedicine.set(0);
    netTotalMedicine.set(0);

    if (medicineList.length > 0) {
        medicineList.forEach(function (obj) {
            total += obj.amount;
        })

        totalMedicine.set(total);

        if (discountTypeMedicine.get() == "Amount") {
            netTotal = total - discountMedicine.get();
            amountDiscountMedicine.set(discountMedicine.get());
        } else if (discountTypeMedicine.get() == "Percent") {
            netTotal = total - (total * discountMedicine.get() / 100);
            amountDiscountMedicine.set(total * discountMedicine.get() / 100);
        }
        netTotalMedicine.set(math.round(netTotal,3));
    }
}