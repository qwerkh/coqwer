import './patient.html';
import '../register/register';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Patient} from '../../collection/patient';
import {Co_Register} from '../../collection/register';
import {PatientTabular} from '../../../both/tabular/patient';
import {Images} from '../../collection/image'


let indexTmpl = Template.co_patient,
    addTmpl = Template.co_patientAdd,
    editTmpl = Template.co_patientEdit,
    showPatientDetail = Template.co_patientDetail;


let patientDoc = new ReactiveObj();
let registerDoc = new ReactiveVar([]);
indexTmpl.helpers({
    dataTable() {
        return PatientTabular;
    },
    selector() {
        return {rolesArea: Session.get("area")};
    }

})

addTmpl.helpers({
    collection() {
        return Co_Patient;
    }
})

editTmpl.helpers({
    data() {

        let id = FlowRouter.getParam('patientId');
        return Co_Patient.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection() {
        return Co_Patient;
    }
});


//event

indexTmpl.events({
    'click button.add'() {
        FlowRouter.go('/co-data/patient/add');
    },

    'click button.remove'(e) {
        var self = this;
        alertify.confirm(
            'Patient',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_Patient.remove(self._id, (error) => {
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

    },
    'click button.edit'(event, instance) {
        let self = this;
        FlowRouter.go(`/co-data/patient/${self._id}/edit`);
    },
    'click button.show'(event, instance) {
        let self = this;
        FlowRouter.go(`/co-data/patient/${self._id}/show`);
    },
    'dblclick tbody > tr': function (event) {

        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        Meteor.call("co_registerByPatientId", rowData._id, (err, result) => {
            registerDoc.set(result);
        });
        Meteor.call("co_patientById", rowData._id, (err, result) => {
            patientDoc.set("patient", result);
        });

        FlowRouter.go(`/co-data/patient/${rowData._id}/showDetail`);
        // FlowRouter.go(`/co-data/register/${rowData._id}/byPatient`);
    },
    'click button.register'() {
        serviceTem.remove({});
        medicineTem.remove({});

        discountTypeService.set("Amount");
        discountService.set(0);

        discountTypeMedicine.set("Amount");
        discountMedicine.set(0);


        amountDiscountService.set(0);
        netTotalService.set(0);


        amountDiscountMedicine.set(0);
        netTotalMedicine.set(0);


        remainAmount.set(0);
        returnAmount.set(0);

        paidAmount.set("paidAmountDollar", 0);
        paidAmount.set("paidAmountRiel", 0);
        paidAmount.set("paidAmountBaht", 0);
        let self = this;
        patientName.set(self.khName);
        patientId.set(self._id);
        FlowRouter.go('/co-data/register/add');

    },
    "click button.receivePayment"() {
        balanceUnpaid.set(0);
        Session.set("paymentDate", moment().toDate());
        let self = this;
        patientDoc.set(self);
        patientId.set(self._id);
        Meteor.call('co_registerOption', self._id, true, Session.get("area"), function (err, result) {
                if (result) {
                    registerPaymentOption.set(result);
                }
            }
        );

        FlowRouter.go('/co-data/payment/add');

    }

});


addTmpl.events({
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-data/patient`);
    }
});

editTmpl.events({
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-data/patient`);
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
});

editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(() => {
        let id = FlowRouter.getParam('patientId');
        if (id) {
            this.subscription = Meteor.subscribe('co_patientById', {_id: id});
        }
    })
});

addTmpl.onCreated(function () {

});


showPatientDetail.onRendered(function () {
    $('.top.menu .item').tab();

});


showPatientDetail.helpers({
    patientDoc() {
        //let id = FlowRouter.getParam('patientId');
        let data = patientDoc.get("patient");
        data.age = moment().diff(moment(data.dob).startOf("day").toDate(), 'years');
        return data;
    },
    registerList() {
        //let id = FlowRouter.getParam('patientId');
        //let data = Co_Register.find({patientId: id}, {sort: {registerDate: -1}}).fetch();
        let data = registerDoc.get();
        data.forEach(function (obj) {
            obj.serviceDiscount = obj.totalService - obj.netTotalService;
            obj.medicineDiscount = obj.totalMedicine - obj.netTotalMedicine;
            obj.total = obj.totalMedicine + obj.totalService;
            obj.discount = obj.serviceDiscount + obj.medicineDiscount;
        });
        return data;
    }
})


showPatientDetail.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(() => {
        let id = FlowRouter.getParam('patientId');
        if (id) {
            this.subscription = Meteor.subscribe('co_patientById', {_id: id});
            this.subscription = Meteor.subscribe('co_registerByPatientId', {patientId: id});
        }
    })
})


AutoForm.hooks({
    co_patientAdd: {
        before: {
            insert: function (doc) {
                if (doc.dob) {
                    doc.dob = moment(doc.dob).startOf("day").add(12, "hour").toDate();
                } else {
                    doc.dob = moment().startOf("day").add(12, "hour").add(-doc.age, "year").toDate();
                }
                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-data/patient`);
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
    co_patientEdit: {
        before: {
            update: function (doc) {
                if (doc.$set.dob) {
                    doc.$set.dob = moment(doc.$set.dob).startOf("day").add(12, "hour").toDate();
                } else {
                    doc.$set.dob = moment(doc.$set.dob).startOf("day").add(12, "hour").add(-doc.$set.age, "year").toDate();
                }
                delete doc.$unset.dob;
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Updated Successfully');
            FlowRouter.go(`/co-data/patient`);
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
});

