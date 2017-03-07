//import func
import {CheckRoles} from '../../imports/api/methods/checkRoles';
//import template js here
import '../../imports/ui/home/home';
import '../../client/layout';
// import '../../imports/ui/user/userSetting';
import '../../imports/ui/notFound/notFound';
import '../../imports/ui/area/area';


//import layout render
import {_Main} from '../lib/_renderLayout';

//not found route
FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render('Co_notFound');
    }
};

var coSetting = FlowRouter.group({
    prefix: '/co-setting',
    name: 'coSetting',
    triggersEnter: [function (context, redirect) {
        if (!CheckRoles({roles: ['setting', 'super']})) {
           redirect('co.home');
        }
    }]
});

FlowRouter.route('/', {
    name: 'co.home',
    action: function (query, params) {
        _Main('co_home');
    }
});
coSetting.route('/area', {
    name: 'co.area',
    action: function (query, params) {
        _Main('sample_area');
    }
});




//User
// coSetting.route('/user-setting', {
//     name: 'co.userSetting',
//     action: function (query, params) {
//         if (CheckRoles({roles: ['setting', 'super']})) {
//             _Main('co_userSetting');
//         } else {
//             FlowRouter.go('co.home');
//         }
//     }
// });
// coSetting.route('/user-setting/new', {
//     name: 'co.userAdd',
//     action: function (query, params) {
//         if (CheckRoles({roles: ['setting', 'super']})) {

//             _Main('co_userAdd');
//         } else {
//             FlowRouter.go('co.home')
//         }
//     }
// });
// coSetting.route('/user-setting/:userId/edit', {
//     name: 'co.userSettingEdit',
//     action: function (query, params) {
//         if (CheckRoles({roles: ['setting', 'super']})) {
//             _Main('co_userSettingEdit');
//         } else {
//             FlowRouter.go('co.home');
//         }
//     }
// });
