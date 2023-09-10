import './nurseRegisters.html';
import '../register/register';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_NurseRegister} from '../../collection/nurseRegister';
import {Images} from '../../collection/image'
import "../ImportFile/importFile"
import {Co_Patient} from "../../collection/patient";

let addTmpl = Template.co_nurseRegister,
    editTmpl = Template.co_nurseRegisterEdit;

addTmpl.helpers({
    collection() {
        return Co_NurseRegister;
    },
    patientId() {
        return patientId.get();
    },
    patientName() {
        return patientName.get();
    },
})

editTmpl.helpers({
    data() {
        let id = FlowRouter.getParam('nurseRegisterId');
        return Co_NurseRegister.findOne({_id: id});


    },
    collection() {
        return Co_NurseRegister;
    },
    patientId() {
        return patientId.get();
    },
    patientName() {
        return patientName.get();
    },
});


//event

addTmpl.events({
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-data/nurseRegister`);
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


addTmpl.onCreated(function () {

});


editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(() => {
        let id = FlowRouter.getParam('nurseRegisterId');
        if (id) {
            this.subscription = Meteor.subscribe('co_nurseRegisterById', {_id: id});
        }
    })
})


AutoForm.hooks({
    co_nurseRegister: {
        before: {
            insert: function (doc) {
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
    co_nurseRegisterEdit: {
        onSuccess: function (formType, result) {
            alertify.success('Updated successfully');
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
