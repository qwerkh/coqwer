//function 
import {CheckRoles} from '../../imports/api/methods/checkRoles';

//template js 
import '../../imports/ui/patient/patient';
import '../../imports/ui/register/register';
import '../../imports/ui/payment/payment';
import '../../imports/ui/journal/journal';
import '../../imports/ui/fixAsset/fixAsset';
import '../../imports/ui/co_patientCode/co_patientCode';
import '../../imports/ui/print/a4'
import '../../imports/ui/print/a4Summary'
import '../../imports/ui/print/a4Sum'

import {_Main} from '../lib/_renderLayout';

var coData = FlowRouter.group({
    prefix: '/co-data',
    name: 'coData',
    triggersEnter: [function (context, redirect) {
        /*if (!CheckRoles({roles: ['setting', 'super', 'write', 'read', 'remove']})) {
         redirect('co.home');
         }*/
    }]
});
//Patient
coData.route('/patient', {
    name: 'co.patient',
    action: function (query, params) {
        _Main("co_patient");
    }

})
coData.route('/patientCode', {
    name: 'co.patientCode',
    action: function (query, params) {
        _Main("co_patientCode");
    }

})

coData.route('/patient/add', {
    name: 'co.patientAdd',
    action: function (query, params) {
        _Main("co_patientAdd");
    }

})

coData.route('/patient/:patientId/edit', {
    name: 'co.patientEdit',
    action: function (query, params) {
        _Main("co_patientEdit");
    }

})

coData.route('/patient/:patientId/showDetail', {
    name: 'co.patientShowDetail',
    action: function (query, params) {
        _Main("co_patientDetail");
    }

})



//Register
coData.route('/register', {
    name: 'co.register',
    action: function (query, params) {
        _Main("co_register");
    }

})
//Register
coData.route('/register/print', {
    name: 'co.register-print',
    /*   action: function (query, params) {
     _Main("co_printA4");
     }*/
    action: function (params, queryParams) {
        BlazeLayout.render('PrintLayout', {printLayout: 'co_printA4'});
    }

})

coData.route('/register/printSummary', {
    name: 'co.register-print-summary',
    /*   action: function (query, params) {
     _Main("co_printA4");
     }*/
    action: function (params, queryParams) {
        BlazeLayout.render('PrintLayout', {printLayout: 'co_printA4Summary'});
    }

})
coData.route('/register/printSum', {
    name: 'co.register-print-sum',
    /*   action: function (query, params) {
     _Main("co_printA4");
     }*/
    action: function (params, queryParams) {
        BlazeLayout.render('PrintLayout', {printLayout: 'co_printA4Sum'});
    }

})
coData.route('/register/:patientId/byPatient', {
    name: 'co.registerByPatientId',
    action: function (query, params) {
        _Main("co_register");
    }

})

coData.route('/register/add', {
    name: 'co.registerAdd',
    action: function (query, params) {
        _Main("co_registerAdd");
    }

})

coData.route('/register/:registerId/edit', {
    name: 'co.registerEdit',
    action: function (query, params) {
        _Main("co_registerEdit");
    }

})


//Payment
coData.route('/payment', {
    name: 'co.payment',
    action: function (query, params) {
        _Main("co_payment");
    }

})

coData.route('/payment/add', {
    name: 'co.paymentAdd',
    action: function (query, params) {
        _Main("co_paymentAdd");
    }

})

coData.route('/payment/:paymentId/edit', {
    name: 'co.paymentEdit',
    action: function (query, params) {
        _Main("co_paymentEdit");
    }

})

//Journal
coData.route('/journal', {
    name: 'co.journal',
    action: function (query, params) {
        _Main("co_journal");
    }

})
//Payment
coData.route('/journal/add', {
    name: 'co.journalAdd',
    action: function (query, params) {
        _Main("co_journalAdd");
    }

})

coData.route('/journal/:journalId/edit', {
    name: 'co.journalEdit',
    action: function (query, params) {
        _Main("co_journalEdit");
    }

})
//Receive
coData.route('/journalReceive/add', {
    name: 'co.journalReceiveAdd',
    action: function (query, params) {
        _Main("co_journalReceiveAdd");
    }

})

coData.route('/journalReceive/:journalId/edit', {
    name: 'co.journalReceiveEdit',
    action: function (query, params) {
        _Main("co_journalReceiveEdit");
    }

})


//FixAsset
coData.route('/fixAsset', {
    name: 'co.fixAsset',
    action: function (query, params) {
        _Main("co_fixAsset");
    }

})

coData.route('/fixAsset/add', {
    name: 'co.fixAssetAdd',
    action: function (query, params) {
        _Main("co_fixAssetAdd");
    }

})

coData.route('/fixAsset/:fixAssetId/edit', {
    name: 'co.fixAssetEdit',
    action: function (query, params) {
        _Main("co_fixAssetEdit");
    }

})
