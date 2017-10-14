import './company.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Company} from '../../collection/company';

let indexTmpl = Template.co_company,
    editTmpl = Template.co_companyEdit;


let userOpt = new ReactiveVar([]);
indexTmpl.helpers({
    selector(){
        return {};
    },
    data(){
        return Co_Company.findOne();
    }
})

indexTmpl.onCreated(function () {
    this.subscription = Meteor.subscribe('co_company');

})

editTmpl.helpers({
    data() {
        let id = FlowRouter.getParam('companyId');
        return Co_Company.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection(){
        return Co_Company;
    },
    userOption(){
        return userOpt.get();
    }
})


//event

indexTmpl.events({
    'click .edit' (event, instance) {
        let doc = Co_Company.findOne();
        FlowRouter.go(`/co-setting/company/${doc._id}/edit`);
    }

})


editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/company`);
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
        this.subscription = Meteor.subscribe('co_company');

        Meteor.call("userOption", function (err, result) {
            if (result) {
                userOpt.set(result);
            }
        })
    })
})


AutoForm.hooks({
    co_companyEdit: {
        onSuccess: function (formType, result) {
            alertify.success('Updated successfully');
            FlowRouter.go(`/co-setting/company`);
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

