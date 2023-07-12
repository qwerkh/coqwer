import './nurseRegisters.html';
import '../register/register';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_NurseRegister} from '../../collection/nurseRegister';
import {Images} from '../../collection/image'
import "../ImportFile/importFile"

let addTmpl = Template.co_nurseRegister;

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


//event

addTmpl.events({
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-data/nurseRegister`);
    }
});



addTmpl.onRendered(function () {
})


addTmpl.onCreated(function () {

});




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
});
