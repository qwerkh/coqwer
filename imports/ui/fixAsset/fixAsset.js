import './fixAsset.html';
import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_FixAsset} from '../../collection/fixAsset';
import {ExchangeForFixAsset} from '../../collection/fixAsset';
import {FixAssetTabular} from '../../../both/tabular/fixAsset';
import {createNewAlertify} from '../../../client/lib/create-alertify';
import {renderTemplate} from '../../../client/lib/render-template';

let indexTmpl = Template.co_fixAsset,
    addTmpl = Template.co_fixAssetAdd,
    editTmpl = Template.co_fixAssetEdit,
    depListTmpl = Template.co_fixAssetDepList,
    depListSummaryTmpl = Template.co_fixAssetDepSummaryList,
    exchangeTmpl = Template.co_exchangeForFixAsset;

var chartAccountOpt = new ReactiveVar([]);
var exchangeOpt = new ReactiveVar([]);

indexTmpl.helpers({
    dataTable () {
        return FixAssetTabular;
    },
    selector(){
        return {rolesArea: Session.get("area")};
    }

})

indexTmpl.onRendered(function () {
    createNewAlertify("fixAssetDep");
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
        console.log(self);
        if (self.numberOfExpense <= 0) {
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
        } else {
            alertify.warning("Can't Update!!!");
        }

    },
    'click .edit' (event, instance) {
        let self = this;
        if (self.numberOfExpense <= 0) {
            FlowRouter.go(`/co-data/fixAsset/${self._id}/edit`);
        } else {
            alertify.warning("Can't Update!!!");
        }
    },
    'click .show'(event, instance){
        let self = this;
        FlowRouter.go(`/co-data/fixAsset/${self._id}/show`);
    },
    'click .depList': function (e, t) {
        debugger;
        let params = {};
        let queryParams = {};

        let rowId = $(e.currentTarget).attr("depList")
        queryParams.rolesArea = Session.get("area");
        queryParams._id = rowId;

        let path = FlowRouter.path("co.fixAssetDepListReport", params, queryParams);
        window.open(path, "_blank");

    },
    'click .fixedAssetSummaryDepreciation': function (e, t) {
        alertify.fixAssetDep("Exchange", renderTemplate(exchangeTmpl));
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


depListTmpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        let q = FlowRouter.current().queryParams
        Fetcher.setDefault('data', false);
        Fetcher.retrieve('data', 'co_fixAssetDepList', q);
        return Fetcher.get('data');
    }
})

depListSummaryTmpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        Fetcher.setDefault('data', false);
        Fetcher.retrieve('data', 'co_fixAssetDepSummaryList', q);

        return Fetcher.get('data');
    }
})


//Pop up Exchange Date
exchangeTmpl.events({
    'click .go': function (e, t) {
        let params = {};
        let queryParams = {};
        let exchangeId = $('[name="exchangeId"]').val();

        queryParams.rolesArea = Session.get("area");
        queryParams.exchangeId = exchangeId;

        let path = FlowRouter.path("co.fixAssetDepSummaryList", params, queryParams);

        window.open(path, "_blank");

        alertify.fixAssetDep().close();

    },
    'change [name="exchangeId"]'(e, t){
        Session.set('exId', $(e.currentTarget).val());
    }
})

exchangeTmpl.onCreated(function () {
    this.autorun(() => {
        Meteor.call("exchangeOption", function (err, result) {
            if (result) {
                exchangeOpt.set(result);
            }
        })
    })

})

exchangeTmpl.helpers({
    schema() {
        return ExchangeForFixAsset;
    },
    cssClassForSubmit(){
        if (Session.get('exId') == "" || Session.get('exId') == undefined) {
            return 'disabled';
        } else {
            return "";
        }
    },
    exchangeOption(){
        return exchangeOpt.get();
    }
})

exchangeTmpl.onDestroyed(function () {
    Session.set('exId', "");
})


