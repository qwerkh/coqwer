import './layout.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import 'lodash';
// import 'meteor/tap:i18n-ui';
import '../imports/ui/area/area';
import '../imports/ui/preloader/preloader';
import '../imports/ui/action/action';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import moment from 'moment';

import {Co_Company} from '../imports/collection/company'

//Page
import './layout.html';

Template.navbar.onRendered(function () {

    Meteor.call('getCompany', function (err, company) {
        if (company) {
            Session.set('baseCurrency', company.baseCurrency);
        }
    })
    this.autorun(() => {
        if (Meteor.userId()) {
            // setTimeout(function () {
            $(".dropdown").dropdown();
            $('#settings-dropdown').dropdown();
            // }, 1500)

            $('.menu .browse').popup({
                inline: true,
                hoverable: true,
                position: 'bottom left',
                delay: {
                    show: 300,
                    hide: 800
                }
            });

        }
    });
});


Template.navbar.events({
    'click .logout'(event, instance) {
        Session.set('area', undefined);
        Session.set('areaName', undefined);
        Meteor.logout();
        FlowRouter.go('co.home');
    }
});

Template.navbar.helpers({
    getAreaName() {
        return Session.get('areaName');
    }
});

Template.MainLayout.helpers({
    notChoosenArea() {
        return _.isUndefined(Session.get('area'));
    }
});


