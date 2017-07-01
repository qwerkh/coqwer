import './journal.html';
import './journalDetail';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Journal} from '../../collection/journal';
import {JournalTabular} from '../../../both/tabular/journal';
import {Images} from '../../collection/image'


let indexTmpl = Template.co_journal,
    addTmpl = Template.co_journalAdd,
    editTmpl = Template.co_journalEdit;

var accountTypeOpt = new ReactiveVar([]);
var parentOpt = new ReactiveVar([]);


indexTmpl.helpers({
    dataTable () {
        return JournalTabular;
    },
    selector(){
        return {};
    }

})

addTmpl.helpers({
    collection(){
        return Co_Journal;
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
        let id = FlowRouter.getParam('journalId');
        return Co_Journal.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection(){
        return Co_Journal;
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
        FlowRouter.go('/co-data/journal/add');
    },

    'click .remove'(e){
        var self = this;
        alertify.confirm(
            'Journal',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_Journal.remove(self._id, (error) => {
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
        journalDetailTem.remove({});
        FlowRouter.go(`/co-data/journal/${self._id}/edit`);
    },
    'click .show'(event, instance){
        let self = this;
        FlowRouter.go(`/co-data/journal/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-data/journal`);
    },
    'keypress [name="voucherId"]': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }
})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-data/journal`);
    },
    'keypress [name="voucherId"]': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
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
        let id = FlowRouter.getParam('journalId');
        if (id) {
            this.subscription = Meteor.subscribe('co_journalById', {_id: id});
        }
    })
})

addTmpl.onCreated(function () {

})


AutoForm.hooks({
    co_journalAdd: {
        before: {
            insert: function (doc) {
                debugger;

                //doc.parentName = $("[name='parentId']").parents('.selection.dropdown').dropdown('get text') == "Select One" ? "" : $("[name='parentId']").parents('.selection.dropdown').dropdown('get text');
                //doc.accountTypeName = $("[name='accountTypeId']").parents('.selection.dropdown').dropdown('get text');

                doc.type = "Payment";
                let transaction = [];
                journalDetailTem.find({}).fetch().forEach(function (obj) {
                    if (obj) {
                        obj.account = obj.chartAccountId;
                        obj.drcr = obj.amount;
                        transaction.push(obj);
                    }
                });
                doc.transaction = transaction;

                doc.rolesArea = Session.get('area');
                // doc.$unset = {};
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-data/journal`);
            journalDetailTem.remove({});
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
    co_journalEdit: {
        before: {
            update: function (doc) {
                doc.$set.rolesArea = Session.get('area');
                //doc.$set.parentName = $("[name='parentId']").parents('.selection.dropdown').dropdown('get text') == "Select One" ? "" : $("[name='parentId']").parents('.selection.dropdown').dropdown('get text');
                //doc.$set.accountTypeName = $("[name='accountTypeId']").parents('.selection.dropdown').dropdown('get text')

                doc.$set.type = "Payment";
                let transaction = [];
                journalDetailTem.find({}).fetch().forEach(function (obj) {
                    if (obj) {
                        obj.account = obj.chartAccountId;
                        obj.drcr = obj.amount;
                        transaction.push(obj);
                    }
                });
                doc.$set.transaction = transaction;

                doc.$unset = {};
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Updated Successfully');
            FlowRouter.go(`/co-data/journal`);
            journalDetailTem.remove({});
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

