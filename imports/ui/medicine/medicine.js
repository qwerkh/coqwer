import './medicine.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Medicine} from '../../collection/medicine';
import {MedicineTabular} from '../../../both/tabular/medicine';


let indexTmpl = Template.co_medicine,
    addTmpl = Template.co_medicineAdd,
    editTmpl = Template.co_medicineEdit;

let medicineTypeOption=new ReactiveVar([]);

indexTmpl.helpers({
    dataTable () {
        return MedicineTabular;
    },
    selector(){
        return {};
        // return {rolesArea: Session.get("area")};
    }
})

addTmpl.helpers({
    collection(){
        return Co_Medicine;
    },
    medicineTypeOption(){
        return medicineTypeOption.get();
    }
})
addTmpl.onCreated(function () {
    Meteor.call("co_medicineTypeOption",function (err,result) {
        if(result){
            medicineTypeOption.set(result);
        }
    })
})

editTmpl.helpers({
    data() {
            let id = FlowRouter.getParam('medicineId');
            return Co_Medicine.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection(){
        return Co_Medicine;
    },
    medicineTypeOption(){
        return medicineTypeOption.get();
    }
})

editTmpl.onCreated(function () {
    Meteor.call("co_medicineTypeOption",function (err,result) {
        if(result){
            medicineTypeOption.set(result);
        }
    })
})

//event

indexTmpl.events({
    'click .add'(){
        FlowRouter.go('/co-setting/medicine/add');
    },

    'click .remove'(e){
        var self = this;
        alertify.confirm(
            'Medicine',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_Medicine.remove(self._id, (error) => {
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
        FlowRouter.go(`/co-setting/medicine/${self._id}/edit`);
    },
    'click .show'(event, instance){
        let self = this;
        FlowRouter.go(`/co-setting/medicine/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/medicine`);
    }
})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/medicine`);
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
        let id = FlowRouter.getParam('medicineId');
        if (id) {
            this.subscription = Meteor.subscribe('co_medicineById', {_id: id});
        }
    })
})



AutoForm.hooks({
    co_medicineAdd: {
        before: {
            insert: function (doc) {

                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-setting/medicine`);
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
    co_medicineEdit: {
        onSuccess: function (formType, result) {
            alertify.success('Updated successfully');
            FlowRouter.go(`/co-setting/medicine`);
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

