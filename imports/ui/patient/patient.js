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
})


//event

indexTmpl.events({
    'click .add'() {
        FlowRouter.go('/co-data/patient/add');
    },

    'click .remove'(e) {
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
    'click .edit'(event, instance) {
        let self = this;
        FlowRouter.go(`/co-data/patient/${self._id}/edit`);
    },
    'click .show'(event, instance) {
        let self = this;
        FlowRouter.go(`/co-data/patient/${self._id}/show`);
    },
    'dblclick tbody > tr': function (event) {

        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        FlowRouter.go(`/co-data/patient/${rowData._id}/showDetail`);
        // FlowRouter.go(`/co-data/register/${rowData._id}/byPatient`);
    }

})


addTmpl.events({
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-data/patient`);
    }
})

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
})

editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(() => {
        let id = FlowRouter.getParam('patientId');
        if (id) {
            this.subscription = Meteor.subscribe('co_patientById', {_id: id});
        }
    })
})

addTmpl.onCreated(function () {

})


showPatientDetail.onRendered(function () {
    $('.top.menu .item').tab();

});


showPatientDetail.helpers({
    patientDoc() {
        let id = FlowRouter.getParam('patientId');
        let paymentDoc = Co_Patient.findOne({_id: id});
        paymentDoc.age = moment().diff(moment(paymentDoc.dob).startOf("day").toDate(), 'years');
        return paymentDoc;
    },
    registerList() {
        let id = FlowRouter.getParam('patientId');
        let data = Co_Register.find({patientId: id}, {sort: {registerDate: -1}}).fetch();
        data.forEach(function (obj) {
            obj.serviceDiscount = obj.totalService - obj.netTotalService;
            obj.medicineDiscount = obj.totalMedicine - obj.netTotalMedicine;
            obj.total = obj.totalMedicine + obj.totalService;
            obj.discount = obj.serviceDiscount + obj.medicineDiscount;
        })
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
                debugger;
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
                debugger;
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

