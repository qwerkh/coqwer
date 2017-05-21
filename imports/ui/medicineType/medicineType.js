import './medicineType.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_MedicineType} from '../../collection/medicineType';
import {MedicineTypeTabular} from '../../../both/tabular/medicineType';


let indexTmpl = Template.co_medicineType,
    addTmpl = Template.co_medicineTypeAdd,
    editTmpl = Template.co_medicineTypeEdit;


indexTmpl.helpers({
    dataTable () {
        return MedicineTypeTabular;
    },
    selector(){
        return {};
    }
})

addTmpl.helpers({
    collection(){
        return Co_MedicineType;
    }
})

editTmpl.helpers({
    data() {
            let id = FlowRouter.getParam('medicineTypeId');
            return Co_MedicineType.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection(){
        return Co_MedicineType;
    }
})


//event

indexTmpl.events({
    'click .add'(){
        FlowRouter.go('/co-setting/medicineType/add');
    },

    'click .remove'(e){
        var self = this;
        alertify.confirm(
            'MedicineType',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_MedicineType.remove(self._id, (error) => {
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
        FlowRouter.go(`/co-setting/medicineType/${self._id}/edit`);
    },
    'click .show'(event, instance){
        let self = this;
        FlowRouter.go(`/co-setting/medicineType/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/medicineType`);
    }
})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/medicineType`);
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
        let id = FlowRouter.getParam('medicineTypeId');
        if (id) {
            this.subscription = Meteor.subscribe('co_medicineTypeById', {_id: id});
        }
    })
})

addTmpl.onCreated(function () {

})


AutoForm.hooks({
    co_medicineTypeAdd: {
        before: {
            insert: function (doc) {

                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-setting/medicineType`);
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
    co_medicineTypeEdit: {
        onSuccess: function (formType, result) {
            alertify.success('Updated successfully');
            FlowRouter.go(`/co-setting/medicineType`);
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

