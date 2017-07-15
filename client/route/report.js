//function 
import {CheckRoles} from '../../imports/api/methods/checkRoles';

//template js 
import '../../imports/report/register/register';


import {_Main} from '../lib/_renderLayout';

var reportData = FlowRouter.group({
    prefix: '/co-report',
    name: 'coData',
    triggersEnter: [function (context, redirect) {
        /*if (!CheckRoles({roles: ['setting', 'super', 'write', 'read', 'remove']})) {
         redirect('co.home');
         }*/
    }]
});
//Patient
reportData.route('/registerReport', {
    name: 'co.registerReport',
    action: function (query, params) {
        _Main("co_registerReport");
    }
})