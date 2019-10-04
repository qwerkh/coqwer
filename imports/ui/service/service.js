import './service.html';

import {Co_Service} from '../../collection/service';
import {Co_Company} from '../../collection/company';
import {ServiceTabular} from '../../../both/tabular/service';


let indexTmpl = Template.co_service,
    addTmpl = Template.co_serviceAdd,
    editTmpl = Template.co_serviceEdit;


let serviceTypeOption = new ReactiveVar([]);
let machinTypeOption = new ReactiveVar([]);
indexTmpl.helpers({
    dataTable() {
        return ServiceTabular;
    },
    selector() {
        let userId = Meteor.userId();
        let companyDoc = Co_Company.findOne({});
        if (companyDoc.asigneUser.indexOf(userId) > -1) {
            return {};

        }
        return {retailPrice: {$lt: companyDoc.hideIfGreater}};
        // return {rolesArea: Session.get("area")};
    }

})

addTmpl.onCreated(function () {
    this.autorun(() => {
        Meteor.call('co_serviceTypeOption', true, function (err, result) {
            if (result) {
                serviceTypeOption.set(result);
            }
        })
    })

    this.autorun(() => {
        Meteor.call('co_machinTypeOption', function (err, result) {
            if (result) {
                machinTypeOption.set(result);
            }

        })
    })


})

addTmpl.helpers({
    collection() {
        return Co_Service;
    },
    serviceTypeOption() {
        return serviceTypeOption.get();
    },
    machinTypeOption() {
        return machinTypeOption.get();
    }

})

editTmpl.onCreated(function () {
    this.autorun(() => {
        Meteor.call('co_serviceTypeOption', true, function (err, result) {
            if (result) {
                serviceTypeOption.set(result);
            }
        })
    })

    this.autorun(() => {
        Meteor.call('co_machinTypeOption', function (err, result) {
            if (result) {
                machinTypeOption.set(result);
            }

        })
    })


})

editTmpl.helpers({
    data() {

        let id = FlowRouter.getParam('serviceId');
        return Co_Service.findOne({_id: id});

    },
    subscriptionsReady() {
        let instance = Template.instance();
        return instance.subUserReady.get()
    },
    collection() {
        return Co_Service;
    },
    serviceTypeOption() {
        return serviceTypeOption.get();
    },
    machinTypeOption() {
        return machinTypeOption.get();
    }
})


//event

indexTmpl.events({
    'click .add'() {
        FlowRouter.go('/co-setting/service/add');
    },

    'click .remove'(e) {
        var self = this;
        alertify.confirm(
            'Service',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Co_Service.remove(self._id, (error) => {
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
    'click button.edit'(event, instance) {
        let self = this;
        FlowRouter.go(`/co-setting/service/${self._id}/edit`);
    },
    'click .show'(event, instance) {
        let self = this;
        FlowRouter.go(`/co-setting/service/${self._id}/show`);
    }

})


addTmpl.events({
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-setting/service`);
    }
})

editTmpl.events({
    'click .cancel'(e, t) {
        FlowRouter.go(`/co-setting/service`);
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
        let id = FlowRouter.getParam('serviceId');
        if (id) {
            this.subscription = Meteor.subscribe('co_serviceById', {_id: id});
        }
    })
})

addTmpl.onCreated(function () {

})


AutoForm.hooks({
    co_serviceAdd: {
        before: {
            insert: function (doc) {

                doc.rolesArea = Session.get('area');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            FlowRouter.go(`/co-setting/service`);
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
    co_serviceEdit: {
        onSuccess: function (formType, result) {
            alertify.success('Updated Successfully');
            FlowRouter.go(`/co-setting/service`);
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

