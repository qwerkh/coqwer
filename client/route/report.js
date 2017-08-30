//function 
import {CheckRoles} from '../../imports/api/methods/checkRoles';

//template js 
import '../../imports/report/register/register';
import '../../imports/ui/fixAsset/fixAsset';

import '../../imports/report/content.html';
import '../../imports/report/sign-footer.html';


import {_Report} from '../lib/_renderLayout';
import {_ReportNoSideBar} from '../lib/_renderLayout';

var reportData = FlowRouter.group({
    prefix: '/co-report',
    name: 'coData',
    triggersEnter: [function (context, redirect) {
        /*if (!CheckRoles({roles: ['setting', 'super', 'write', 'read', 'remove']})) {
         redirect('co.home');
         }*/
    }]
});
//Register
reportData.route('/registerReport', {
    name: 'co.registerReport',
    action: function (query, params) {
        _Report("co_registerReport");
    }
})

//FixAsset
reportData.route('/fixAssetDepListReport', {
    name: 'co.fixAssetDepListReport',
    action: function (query, params) {
        _ReportNoSideBar("co_fixAssetDepList");
    }
})
//FixAssetSummary
reportData.route('/fixAssetDepSummaryList', {
    name: 'co.fixAssetDepSummaryList',
    action: function (query, params) {
        _ReportNoSideBar("co_fixAssetDepSummaryList");
    }
})