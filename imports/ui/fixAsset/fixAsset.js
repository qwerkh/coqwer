import './fixAsset.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_FixAsset} from '../../collection/fixAsset';
import {FixAssetTabular} from '../../../both/tabular/fixAsset';


let indexTmpl = Template.co_fixAsset,
    addTmpl = Template.co_fixAssetAdd,
    editTmpl = Template.co_fixAssetEdit;

var chartAccountOpt = new ReactiveVar([]);

indexTmpl.helpers({
    dataTable () {
        return FixAssetTabular;
    },
    selector(){
        return {rolesArea: Session.get("area")};
    }

})

addTmpl.helpers({
    collection(){
        return Co_FixAsset;
    },
    chartAccountOption(){
        return chartAccountOpt.get();
    }
})

addTmpl.onCreated(function () {
    this.autorun(() => {
        Meteor.call("chartAccountOption", "20", function (err, result) {
            if (result) {
                chartAccountOpt.set(result);
            }
        })
    })
})

editTmpl.helpers({
    data() {

        let id = FlowRouter.getParam('fixAssetId');
        return Co_FixAsset.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection(){
        return Co_FixAsset;
    },
    chartAccountOption(){
        return chartAccountOpt.get();
    }
})

editTmpl.onCreated(function () {
    this.autorun(() => {
        Meteor.call("chartAccountOption", "20", function (err, result) {
            if (result) {
                chartAccountOpt.set(result);
            }
        })
    })
})
//event

indexTmpl.events({
    'click .add'(){
        FlowRouter.go('/co-data/fixAsset/add');
    },

    'click .remove'(e){
        var self = this;
        alertify.confirm(
            'FixAsset',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_FixAsset.remove(self._id, (error) => {
                    if (error) {

                        alertify.error(error.message);
                    } else {
                        alertify.success('Deleted successfully');
                        $(e.currentTarget).parents('tr').remove();
                    }
                })
            },
            null
        )

    },
    'click .edit' (event, instance) {
        let self = this;
        FlowRouter.go(`/co-data/fixAsset/${self._id}/edit`);
    },
    'click .show'(event, instance){
        let self = this;
        FlowRouter.go(`/co-data/fixAsset/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-data/fixAsset`);
    }
})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-data/fixAsset`);
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
        let id = FlowRouter.getParam('fixAssetId');
        if (id) {
            this.subscription = Meteor.subscribe('co_fixAssetById', {_id: id});
        }
    })
})

addTmpl.onCreated(function () {

})


AutoForm.hooks({
    co_fixAssetAdd: {
        before: {
            insert: function (doc) {

                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-data/fixAsset`);
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
    co_fixAssetEdit: {
        onSuccess: function (formType, result) {
            alertify.success('Updated successfully');
            FlowRouter.go(`/co-data/fixAsset`);
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

