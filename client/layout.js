import './layout.html';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import 'lodash';
import 'meteor/tap:i18n-ui';
import '../imports/ui/area/area';
//Page
import './layout.html';
Template.navbar.onRendered(function () {
    $(".dropdown").dropdown();
    $('#settings-dropdown').dropdown();
});

Template.navbar.events({
    'click .logout'(event, instance){
        Session.set('area', undefined);
        Meteor.logout();
        FlowRouter.go('co.home');
    }
});

Template.navbar.helpers({
    getAreaName(){
        return Session.get('areaName');
    }
});

Template.MainLayout.helpers({
    notChoosenArea(){
        return _.isUndefined(Session.get('area'));
    }
});