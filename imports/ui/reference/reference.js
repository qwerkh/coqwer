import './reference.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Reference} from '../../collection/reference';
import {ReferenceTabular} from '../../../both/tabular/reference';


let indexTmpl = Template.co_reference,
    editTmpl = Template.co_referenceEdit;


indexTmpl.helpers({
    dataTable () {
        return ReferenceTabular;
    },
    selector(){
        return {};
    }
})


editTmpl.helpers({
    data() {
            let id = FlowRouter.getParam('referenceId');
            return Co_Reference.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection(){
        return Co_Reference;
    }
})


//event

indexTmpl.events({

    'click .remove'(e){
        var self = this;
        alertify.confirm(
            'Reference',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_Reference.remove(self._id, (error) => {
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
        FlowRouter.go(`/co-setting/reference/${self._id}/edit`);
    },
    'click .show'(event, instance){
        let self = this;
        FlowRouter.go(`/co-setting/reference/${self._id}/show`);
    }

})




editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/reference`);
    }
});


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
        let id = FlowRouter.getParam('referenceId');
        if (id) {
            this.subscription = Meteor.subscribe('co_referenceById', {_id: id});
        }
    })
})



AutoForm.hooks({
    co_referenceEdit: {
        onSuccess: function (formType, result) {
            alertify.success('Updated successfully');
            FlowRouter.go(`/co-setting/reference`);
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

