//import funcchartAccount
import {CheckRoles} from '../../imports/api/methods/checkRoles';
//import template js here
import '../../imports/ui/home/home';
import '../../client/layout';
import '../../imports/ui/user/userSetting';
import '../../imports/ui/notFound/notFound';
import '../../imports/ui/area/area';

import '../../imports/ui/machin/machin';
import '../../imports/ui/machinType/machinType';
import '../../imports/ui/medicine/medicine';
import '../../imports/ui/medicineType/medicineType';
import '../../imports/ui/service/service';
import '../../imports/ui/serviceType/serviceType';
import '../../imports/ui/exchange/exchange';
import '../../imports/ui/company/company';
import '../../imports/ui/reference/reference';
import '../../imports/ui/chartAccount/chartAccount';
import '../../imports/ui/endOfProcess/endOfProcess';
import '../../imports/ui/mapFixAsset/mapFixAsset';
import '../../imports/ui/dashboard/dashBoard';

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

var coDirector = FlowRouter.group({
    prefix: '/co-director',
    name: 'coDirector',
    triggersEnter: [function (context, redirect) {
        if (!CheckRoles({roles: ['director', 'super']})) {
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


// User
coSetting.route('/user-setting', {
    name: 'co.userSetting',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main('co_userSetting');
        } else {
            FlowRouter.go('co.home');
        }
    }
});
coSetting.route('/user-setting/new', {
    name: 'co.userAdd',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main('co_userAdd');
        } else {
            FlowRouter.go('co.home')
        }
    }
});
coSetting.route('/user-setting/:userId/edit', {
    name: 'co.userSettingEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main('co_userSettingEdit');
        } else {
            FlowRouter.go('co.home');
        }
    }
});


//Machin
coSetting.route('/machin', {
    name: 'co.machin',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_machin");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/machin/add', {
    name: 'co.machinAdd',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_machinAdd");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/machin/:machinId/edit', {
    name: 'co.machinEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_machinEdit");
        } else {
            FlowRouter.go('co.home');
        }
    }

})


//Medicine
coSetting.route('/medicine', {
    name: 'co.medicine',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_medicine");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/medicine/add', {
    name: 'co.medicineAdd',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_medicineAdd");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/medicine/:medicineId/edit', {
    name: 'co.medicineEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_medicineEdit");
        } else {
            FlowRouter.go('co.home');
        }
    }

})


//Service
coSetting.route('/service', {
    name: 'co.service',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_service");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/service/add', {
    name: 'co.serviceAdd',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_serviceAdd");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/service/:serviceId/edit', {
    name: 'co.serviceEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_serviceEdit");
        } else {
            FlowRouter.go('co.home');
        }
    }

})
//Machin Type
coSetting.route('/machinType', {
    name: 'co.machinType',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_machinType");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/machinType/add', {
    name: 'co.machinTypeAdd',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_machinTypeAdd");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/machinType/:machinTypeId/edit', {
    name: 'co.machinTypeEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_machinTypeEdit");
        } else {
            FlowRouter.go('co.home');
        }
    }

})


//Medicine Type
coSetting.route('/medicineType', {
    name: 'co.medicineType',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_medicineType");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/medicineType/add', {
    name: 'co.medicineTypeAdd',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_medicineTypeAdd");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/medicineType/:medicineTypeId/edit', {
    name: 'co.medicineTypeEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_medicineTypeEdit");
        } else {
            FlowRouter.go('co.home');
        }
    }

})


//Service Type
coSetting.route('/serviceType', {
    name: 'co.serviceType',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_serviceType");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/serviceType/add', {
    name: 'co.serviceTypeAdd',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_serviceTypeAdd");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/serviceType/:serviceTypeId/edit', {
    name: 'co.serviceTypeEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_serviceTypeEdit");
        } else {
            FlowRouter.go('co.home');
        }
    }

})
//Exchange
coSetting.route('/exchange', {
    name: 'co.exchange',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_exchange");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/exchange/add', {
    name: 'co.exchangeAdd',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_exchangeAdd");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/exchange/:exchangeId/edit', {
    name: 'co.exchangeEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_exchangeEdit");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

//Company
coSetting.route('/company', {
    name: 'co.company',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_company");
        } else {
            FlowRouter.go('co.home');
        }
    }

})
coSetting.route('/company/:companyId/edit', {
    name: 'co.companyEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_companyEdit");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

//Reference
coSetting.route('/reference', {
    name: 'co.reference',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_reference");
        } else {
            FlowRouter.go('co.home');
        }
    }

})
coSetting.route('/reference/:referenceId/edit', {
    name: 'co.referenceEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_referenceEdit");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

//Chart Account
coSetting.route('/chartAccount', {
    name: 'co.chartAccount',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_chartAccount");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/chartAccount/add', {
    name: 'co.chartAccountAdd',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_chartAccountAdd");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/chartAccount/:chartAccountId/edit', {
    name: 'co.chartAccountEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_chartAccountEdit");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

//Map FixAsset
coSetting.route('/mapFixAsset', {
    name: 'co.mapFixAsset',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_mapFixAsset");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/mapFixAsset/add', {
    name: 'co.mapFixAssetAdd',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_mapFixAssetAdd");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

coSetting.route('/mapFixAsset/:mapFixAssetId/edit', {
    name: 'co.mapFixAssetEdit',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {

            _Main("co_mapFixAssetEdit");
        } else {
            FlowRouter.go('co.home');
        }
    }

})

//End Of Process
coSetting.route('/endOfProcess', {
    name: 'co.endOfProcess',
    action: function (query, params) {
        if (CheckRoles({roles: ['setting', 'super']})) {
            _Main("co_endOfProcess");
        } else {
            FlowRouter.go('co.home');
        }
    }

})


//End Of Process
coDirector.route('/dashboard', {
    name: 'co.dashboard',
    action: function (query, params) {
        if (CheckRoles({roles: ['director', 'super']})) {
            _Main("dashboard");
        } else {
            FlowRouter.go('co.home');
        }
    }

})


