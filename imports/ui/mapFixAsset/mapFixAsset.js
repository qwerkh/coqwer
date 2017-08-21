import './mapFixAsset.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_MapFixAsset} from '../../collection/mapFixAsset';
import {MapFixAssetTabular} from '../../../both/tabular/mapFixAsset';


let indexTmpl = Template.co_mapFixAsset,
    addTmpl = Template.co_mapFixAssetAdd,
    editTmpl = Template.co_mapFixAssetEdit;

let assetOption = new ReactiveVar([]);
let assetAccumulatedOption = new ReactiveVar([]);
let assetExpenseOption = new ReactiveVar([]);

indexTmpl.helpers({
    dataTable () {
        return MapFixAssetTabular;
    },
    selector(){
        // return {rolesArea: Session.get("area")};
    }

})

addTmpl.helpers({
    collection(){
        return Co_MapFixAsset;
    },
    assetOption(){
        return assetOption.get();
    },
    assetAccumulatedOption(){
        return assetAccumulatedOption.get();
    },
    assetExpenseOption(){
        return assetExpenseOption.get();
    }
})

addTmpl.onCreated(function () {
    Meteor.call("assetOption", function (err, result) {
        if (result) {
            assetOption.set(result);
        }
    })
    Meteor.call("assetAccumulatedOption", function (err, result) {
        if (result) {
            assetAccumulatedOption.set(result);
        }
    })
    Meteor.call("assetExpenseOption", function (err, result) {
        if (result) {
            assetExpenseOption.set(result);
        }
    })
})

editTmpl.helpers({
    data() {

        let id = FlowRouter.getParam('mapFixAssetId');
        return Co_MapFixAsset.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection(){
        return Co_MapFixAsset;
    },
    assetOption(){
        return assetOption.get();
    },
    assetAccumulatedOption(){
        return assetAccumulatedOption.get();
    },
    assetExpenseOption(){
        return assetExpenseOption.get();
    }
})

editTmpl.onCreated(function () {
    Meteor.call("assetOption", function (err, result) {
        if (result) {
            assetOption.set(result);
        }
    })
    Meteor.call("assetAccumulatedOption", function (err, result) {
        if (result) {
            assetAccumulatedOption.set(result);
        }
    })
    Meteor.call("assetExpenseOption", function (err, result) {
        if (result) {
            assetExpenseOption.set(result);
        }
    })
})
//event

indexTmpl.events({
    'click .add'(){
        FlowRouter.go('/co-setting/mapFixAsset/add');
    },

    'click .remove'(e){
        var self = this;
        alertify.confirm(
            'MapFixAsset',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_MapFixAsset.remove(self._id, (error) => {
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
        FlowRouter.go(`/co-setting/mapFixAsset/${self._id}/edit`);
    },
    'click .show'(event, instance){
        let self = this;
        FlowRouter.go(`/co-setting/mapFixAsset/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/mapFixAsset`);
    }
})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/mapFixAsset`);
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
        let id = FlowRouter.getParam('mapFixAssetId');
        if (id) {
            this.subscription = Meteor.subscribe('co_mapFixAssetById', {_id: id});
        }
    })
})

addTmpl.onCreated(function () {

})


AutoForm.hooks({
    co_mapFixAssetAdd: {
        before: {
            insert: function (doc) {

                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-setting/mapFixAsset`);
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
    co_mapFixAssetEdit: {
        onSuccess: function (formType, result) {
            alertify.success('Updated successfully');
            FlowRouter.go(`/co-setting/mapFixAsset`);
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

