import './exchange.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Exchange} from '../../collection/exchange';
import {ExchangeTabular} from '../../../both/tabular/exchange';


let indexTmpl = Template.co_exchange,
    addTmpl = Template.co_exchangeAdd,
    editTmpl = Template.co_exchangeEdit;


indexTmpl.helpers({
    dataTable () {
        return ExchangeTabular;
    },
    selector(){
        return {};
    }
})

addTmpl.helpers({
    collection(){
        return Co_Exchange;
    }
})

editTmpl.helpers({
    data() {
            let id = FlowRouter.getParam('exchangeId');
            return Co_Exchange.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection(){
        return Co_Exchange;
    }
})


//event

indexTmpl.events({
    'click .add'(){
        FlowRouter.go('/co-setting/exchange/add');
    },

    'click .remove'(e){
        var self = this;
        alertify.confirm(
            'Exchange',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_Exchange.remove(self._id, (error) => {
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
        FlowRouter.go(`/co-setting/exchange/${self._id}/edit`);
    },
    'click .show'(event, instance){
        let self = this;
        FlowRouter.go(`/co-setting/exchange/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/exchange`);
    }
})

editTmpl.events({
    'click .cancel'(e, t){
        FlowRouter.go(`/co-setting/exchange`);
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
        let id = FlowRouter.getParam('exchangeId');
        if (id) {
            this.subscription = Meteor.subscribe('co_exchangeById', {_id: id});
        }
    })
})

addTmpl.onCreated(function () {

})


AutoForm.hooks({
    co_exchangeAdd: {
        before: {
            insert: function (doc) {

                doc.rolesArea = Session.get('area');
                doc.exDate=moment(doc.exDate).startOf("day").add(12,"hour").toDate();
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-setting/exchange`);
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
    co_exchangeEdit: {
        before:{
            update: function (doc) {
                doc.$set.exDate=moment(doc.$set.exDate).startOf("day").add(12,"hour").toDate();
                return doc;
            }
        },

        onSuccess: function (formType, result) {
            alertify.success('Updated successfully');
            FlowRouter.go(`/co-setting/exchange`);
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

