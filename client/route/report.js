//function 
import {CheckRoles} from '../../imports/api/methods/checkRoles';

//template js 
import '../../imports/report/register/register';
import '../../imports/report/registerByDate/registerByDate';
import '../../imports/report/registerByItem/registerByItem';
import '../../imports/report/registerService/registerService';
import '../../imports/report/registerMedicine/registerMedicine';
import '../../imports/report/journal/journal';
import '../../imports/report/profitLost/profitLost';
import '../../imports/report/unpaidByCustomer/unpaidByCustomer';
import '../../imports/report/checkQualityMachin/checkQualityMachin';
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

//Unpaid By Customer
reportData.route('/unPaidByCustomerReport', {
    name: 'co.unPaidByCustomerReport',
    action: function (query, params) {
        _Report("co_unpaidByCustomerReport");
    }
})
//Check Quality Machin
reportData.route('/checkQualityMachinReport', {
    name: 'co.checkQualityMachinReport',
    action: function (query, params) {
        _Report("co_checkQualityMachinReport");
    }
})
//Register By Date
reportData.route('/registerByDateReport', {
    name: 'co.registerByDateReport',
    action: function (query, params) {
        _Report("co_registerByDateReport");
    }
})
//Register By Item
reportData.route('/registerByItemReport', {
    name: 'co.registerByItemReport',
    action: function (query, params) {
        _Report("co_registerByItemReport");
    }
})
//Register Service
reportData.route('/registerServiceReport', {
    name: 'co.registerServiceReport',
    action: function (query, params) {
        _Report("co_registerServiceReport");
    }
})
//Register Medicine
reportData.route('/registerMedicineReport', {
    name: 'co.registerMedicineReport',
    action: function (query, params) {
        _Report("co_registerMedicineReport");
    }
})

//Journal
reportData.route('/journalReport', {
    name: 'co.journalReport',
    action: function (query, params) {
        _Report("co_journalReport");
    }
})
//Profit Lost
reportData.route('/profitLostReport', {
    name: 'co.profitLostReport',
    action: function (query, params) {
        _Report("co_profitLostReport");
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