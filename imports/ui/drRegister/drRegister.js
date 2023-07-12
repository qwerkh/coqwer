import './drRegisters.html';
import '../register/register';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_DrRegister} from '../../collection/drRegister';
import {Images} from '../../collection/image'
import "../ImportFile/importFile"

let addTmpl = Template.co_drRegister;

addTmpl.helpers({
    collection() {
        return Co_DrRegister;
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
        FlowRouter.go(`/co-data/drRegister`);
    }
});



addTmpl.onRendered(function () {
})


addTmpl.onCreated(function () {

});




AutoForm.hooks({
    co_drRegister: {
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
