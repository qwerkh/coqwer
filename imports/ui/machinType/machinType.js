import './machinType.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_MachinType} from '../../collection/machinType';
import {MachinTypeTabular} from '../../../both/tabular/machinType';


let indexTmpl = Template.co_machinType,
    addTmpl = Template.co_machinTypeAdd,
    editTmpl = Template.co_machinTypeEdit;


indexTmpl.helpers({
    dataTable () {
        return MachinTypeTabular;
    },
    selector(){
        return {};
    }
})

addTmpl.helpers({
    collection(){
        return Co_MachinType;
    }
})

editTmpl.helpers({
    data() {
            let id = FlowRouter.getParam('machinTypeId');
            return Co_MachinType.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection(){
        return Co_MachinType;
    }
})


//event

indexTmpl.events({
    'click .add'(){
        FlowRouter.go('/co-setting/machinType/add');
    },

    'click .remove'(e){
        var self = this;
        alertify.confirm(
            'MachinType',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_MachinType.remove(self._id, (error) => {
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
    'click .edit' (event, instance) {
        let self = this;
        FlowRouter.go(`/co-setting/machinType/${self._id}/edit`);
    },
    'click .show'(event, instance){
        let self = this;
        FlowRouter.go(`/co-setting/machinType/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/machinType`);
    }
})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/machinType`);
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
        let id = FlowRouter.getParam('machinTypeId');
        if (id) {
            this.subscription = Meteor.subscribe('co_machinTypeById', {_id: id});
        }
    })
})

addTmpl.onCreated(function () {

})


AutoForm.hooks({
    co_machinTypeAdd: {
        before: {
            insert: function (doc) {

                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-setting/machinType`);
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
    co_machinTypeEdit: {
        onSuccess: function (formType, result) {
            alertify.success('Updated successfully');
            FlowRouter.go(`/co-setting/machinType`);
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

