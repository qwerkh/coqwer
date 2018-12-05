import './serviceType.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_ServiceType} from '../../collection/serviceType';
import {ServiceTypeTabular} from '../../../both/tabular/serviceType';


let indexTmpl = Template.co_serviceType,
    addTmpl = Template.co_serviceTypeAdd,
    editTmpl = Template.co_serviceTypeEdit;



indexTmpl.helpers({
    dataTable () {
        return ServiceTypeTabular;
    },
    selector(){
        return {};
    }
})

addTmpl.helpers({
    collection(){
        return Co_ServiceType;
    }
})

editTmpl.helpers({
    data() {
            let id = FlowRouter.getParam('serviceTypeId');
            return Co_ServiceType.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection(){
        return Co_ServiceType;
    }
})


//event

indexTmpl.events({
    'click .add'(){
        FlowRouter.go('/co-setting/serviceType/add');
    },

    'click .remove'(e){
        var self = this;
        alertify.confirm(
            'ServiceType',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_ServiceType.remove(self._id, (error) => {
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
    'click button.edit' (event, instance) {
        let self = this;
        FlowRouter.go(`/co-setting/serviceType/${self._id}/edit`);
    },
    'click .show'(event, instance){
        let self = this;
        FlowRouter.go(`/co-setting/serviceType/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/serviceType`);
    }
})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/serviceType`);
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
        let id = FlowRouter.getParam('serviceTypeId');
        if (id) {
            this.subscription = Meteor.subscribe('co_serviceTypeById', {_id: id});
        }
    })
})

addTmpl.onCreated(function () {

})


AutoForm.hooks({
    co_serviceTypeAdd: {
        before: {
            insert: function (doc) {

                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-setting/serviceType`);
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
    co_serviceTypeEdit: {
        onSuccess: function (formType, result) {
            alertify.success('Updated successfully');
            FlowRouter.go(`/co-setting/serviceType`);
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

