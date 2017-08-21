import './endOfProcess.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Co_EndOfProcess} from '../../collection/endOfProcess';
import {EndOfProcessTabular} from '../../../both/tabular/endOfProcess';
import {createNewAlertify} from "../../../client/lib/create-alertify";
import {renderTemplate} from "../../../client/lib/render-template";


let indexTmpl = Template.co_endOfProcess,
    addTmpl = Template.co_endOfProcessAdd;


indexTmpl.onCreated(function () {
    createNewAlertify("endOfProcess");
})

indexTmpl.helpers({
    dataTable () {
        return EndOfProcessTabular;
    },
    selector(){
        return {};
    }
})

addTmpl.helpers({
    collection(){
        return Co_EndOfProcess;
    }
})

//event
indexTmpl.events({
    'click .add'(){
        alertify.endOfProcess(`<i class="fa fa-plus"></i> End Of Process`, renderTemplate(addTmpl));
    },

    'click .remove'(e){
        var self = this;
        alertify.confirm(
            'EndOfProcess',
            'Are you sure to delete [' + self._id + ']?',
            () => {
                Meteor.call("removeEndOfProcess", self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success('Deleted Successfully');
                        $(e.currentTarget).parents('tr').remove();

                    }
                });

            },
            null
        )

    }

})


addTmpl.onRendered(function () {


})


AutoForm.hooks({
    co_endOfProcessAdd: {
        before: {
            insert: function (doc) {

                doc.rolesArea = Session.get('area');
                doc.month = moment(doc.endDate).format("MM");
                doc.year = moment(doc.endDate).format("YYYY");
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Successfully');
            alertify.endOfProcess().close();
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        },
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            this.done();
        }
    }
})

