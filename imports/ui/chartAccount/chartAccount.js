import './chartAccount.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_ChartAccount} from '../../collection/chartAccount';
import {ChartAccountTabular} from '../../../both/tabular/chartAccount';
import {Images} from '../../collection/image'


let indexTmpl = Template.co_chartAccount,
    addTmpl = Template.co_chartAccountAdd,
    editTmpl = Template.co_chartAccountEdit;

var accountTypeOpt = new ReactiveVar([]);
var parentOpt = new ReactiveVar([]);


indexTmpl.helpers({
    dataTable () {
        return ChartAccountTabular;
    },
    selector(){
        return {};
    }

})

addTmpl.helpers({
    collection(){
        return Co_ChartAccount;
    },
    parentOption(){
        return parentOpt.get();
    },
    accountTypeOption(){
        return accountTypeOpt.get();
    }
})

editTmpl.helpers({
    data() {
        let id = FlowRouter.getParam('chartAccountId');
        return Co_ChartAccount.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection(){
        return Co_ChartAccount;
    },
    parentOption(){
        return parentOpt.get();
    },
    accountTypeOption(){
        return accountTypeOpt.get();
    }
})


//event

indexTmpl.events({
    'click .add'(){
        FlowRouter.go('/co-data/chartAccount/add');
    },

    'click .remove'(e){
        var self = this;
        alertify.confirm(
            'ChartAccount',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_ChartAccount.remove(self._id, (error) => {
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
        FlowRouter.go(`/co-setting/chartAccount/${self._id}/edit`);
    },
    'click .show'(event, instance){
        let self = this;
        FlowRouter.go(`/co-setting/chartAccount/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/chartAccount`);
    }
})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/chartAccount`);
    }
});


addTmpl.onRendered(function () {

    this.autorun(() => {
        Meteor.call("accountTypeOption", function (err, result) {
            if (result) {
                accountTypeOpt.set(result);
            }
        })

        Meteor.call("parentOption", function (err, result) {
            if (result) {
                parentOpt.set(result);
            }
        })
    })
})
editTmpl.onRendered(function () {
    this.autorun(() => {
        if (this.subscription.ready()) {
            this.subUserReady.set(true);
        }


        Meteor.call("accountTypeOption", function (err, result) {
            if (result) {
                accountTypeOpt.set(result);
            }
        })

        Meteor.call("parentOption", function (err, result) {
            if (result) {
                parentOpt.set(result);
            }
        })
    });
})

editTmpl.onCreated(function () {
    this.subUserReady = new ReactiveVar(false);
    this.autorun(() => {
        let id = FlowRouter.getParam('chartAccountId');
        if (id) {
            this.subscription = Meteor.subscribe('co_chartAccountById', {_id: id});
        }
    })
})

addTmpl.onCreated(function () {

})


AutoForm.hooks({
    co_chartAccountAdd: {
        before: {
            insert: function (doc) {

                doc.parentName = $("[name='parentId']").parents('.selection.dropdown').dropdown('get text') == "Select One" ? "" : $("[name='parentId']").parents('.selection.dropdown').dropdown('get text');
                doc.accountTypeName = $("[name='accountTypeId']").parents('.selection.dropdown').dropdown('get text')

                if (doc.parentName == "(Select Parent)") {
                    doc.parentName = "";
                }

                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-setting/chartAccount`);
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
    co_chartAccountEdit: {
        before: {
            update: function (doc) {
                doc.$set.parentName = $("[name='parentId']").parents('.selection.dropdown').dropdown('get text') == "Select One" ? "" : $("[name='parentId']").parents('.selection.dropdown').dropdown('get text');
                doc.$set.accountTypeName = $("[name='accountTypeId']").parents('.selection.dropdown').dropdown('get text')

                if (doc.$set.parentName == "(Select Parent)") {
                    doc.$set.parentName = "";
                }

                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Updated Successfully');
            FlowRouter.go(`/co-setting/chartAccount`);
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

