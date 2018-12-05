import './machin.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_Machin} from '../../collection/machin';
import {MachinTabular} from '../../../both/tabular/machin';


let indexTmpl = Template.co_machin,
    addTmpl = Template.co_machinAdd,
    editTmpl = Template.co_machinEdit;

let machinTypeOption = new ReactiveVar([]);

indexTmpl.helpers({
    dataTable() {
        return MachinTabular;
    },
    selector() {
        return {rolesArea: Session.get("area")};
    }

})

addTmpl.helpers({
    collection() {
        return Co_Machin;
    },
    machinTypeOption() {
        return machinTypeOption.get();
    }
})

addTmpl.onCreated(function () {
    Meteor.call("co_machinTypeOption", function (err, result) {
        if (result) {
            machinTypeOption.set(result);
        }

    })
})

editTmpl.helpers({
    data() {

        let id = FlowRouter.getParam('machinId');
        return Co_Machin.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection() {
        return Co_Machin;
    },
    machinTypeOption() {
        return machinTypeOption.get();
    }
})

editTmpl.onCreated(function () {
    Meteor.call("co_machinTypeOption", function (err, result) {
        if (result) {
            machinTypeOption.set(result);
        }

    })
})
//event

indexTmpl.events({
    'click .add'() {
        FlowRouter.go('/co-setting/machin/add');
    },

    'click .remove'(e) {
        var self = this;
        alertify.confirm(
            'Machin',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_Machin.remove(self._id, (error) => {
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
    'click button.edit'(event, instance) {
        let self = this;
        FlowRouter.go(`/co-setting/machin/${self._id}/edit`);
    },
    'click .show'(event, instance) {
        let self = this;
        FlowRouter.go(`/co-setting/machin/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-setting/machin`);
    }
})

editTmpl.events({
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-setting/machin`);
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
        let id = FlowRouter.getParam('machinId');
        if (id) {
            this.subscription = Meteor.subscribe('co_machinById', {_id: id});
        }
    })
})

addTmpl.onCreated(function () {

})


AutoForm.hooks({
    co_machinAdd: {
        before: {
            insert: function (doc) {

                doc.buyDate = moment(doc.buyDate).startOf("day").add(12, "hour").toDate();
                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-setting/machin`);
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
    co_machinEdit: {
        before: {
            update: function (doc) {
                doc.$set.buyDate = moment(doc.$set.buyDate).startOf("day").add(12, "hour").toDate();
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Updated successfully');
            FlowRouter.go(`/co-setting/machin`);
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

