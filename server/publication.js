import {Co_Patient} from '../imports/collection/patient';
import {Co_Machin} from '../imports/collection/machin';
import {Co_Medicine} from '../imports/collection/medicine';
import {Co_Service} from '../imports/collection/service';
import {Co_Register} from '../imports/collection/register';
import {Co_MachinType} from '../imports/collection/machinType';
import {Co_MedicineType} from '../imports/collection/medicineType';
import {Co_ServiceType} from '../imports/collection/serviceType';
import {Co_Exchange} from '../imports/collection/exchange';
import {Co_Company} from '../imports/collection/company';
import {Co_Reference} from '../imports/collection/reference';
import {Co_Payment} from '../imports/collection/payment';
import {Co_ChartAccount} from '../imports/collection/chartAccount';
import {Co_AccountType} from '../imports/collection/accountType';
import {Co_Journal} from '../imports/collection/journal';
import {Co_FixAsset} from '../imports/collection/fixAsset';
import {Co_EndOfProcess} from '../imports/collection/endOfProcess';

Meteor.publish('co_patientById', function co_patientById({id}) {
    if (this.userId) {
        return Co_Patient.find({id});
    }
    return this.ready();
})

Meteor.publish('co_machinById', function co_machinById({id}) {
    if (this.userId) {
        return Co_Machin.find({id});
    }
    return this.ready();
})

Meteor.publish('co_medicineById', function co_medicineById({id}) {
    if (this.userId) {
        return Co_Medicine.find({id});
    }
    return this.ready();
})
Meteor.publish('co_serviceById', function co_serviceById({id}) {
    if (this.userId) {
        return Co_Service.find({id});
    }
    return this.ready();
})

Meteor.publish('co_registerById', function co_registerById({id}) {
    if (this.userId) {
        return Co_Register.find({id});
    }
    return this.ready();
})

Meteor.publish('co_registerByPatientId', function co_registerByPatientId({patientId}) {
    if (this.userId) {
        return Co_Register.find({patientId});
    }
    return this.ready();
})
Meteor.publish('co_machinTypeById', function co_machinTypeById({id}) {
    if (this.userId) {
        return Co_MachinType.find({id});
    }
    return this.ready();
})
Meteor.publish('co_medicineTypeById', function co_medicineTypeById({id}) {
    if (this.userId) {
        return Co_MedicineType.find({id});
    }
    return this.ready();
})
Meteor.publish('co_serviceTypeById', function co_serviceTypeById({id}) {
    if (this.userId) {
        return Co_ServiceType.find({id});
    }
    return this.ready();
})
Meteor.publish('co_exchangeById', function co_exchangeById({id}) {
    if (this.userId) {
        return Co_Exchange.find({id});
    }
    return this.ready();
})

Meteor.publish('co_exchangeByStatus', function co_exchangeByStatus() {
    if (this.userId) {
        return Co_Exchange.find({status: true});
    }
    return this.ready();
})

Meteor.publish('co_company', function co_company() {
    if (this.userId) {
        return Co_Company.find();
    }
    return this.ready();
})
Meteor.publish('co_reference', function co_reference({id}) {
    if (this.userId) {
        return Co_Reference.find();
    }
    return this.ready();
})
Meteor.publish('co_paymentById', function co_paymentById({id}) {
    if (this.userId) {
        return Co_Payment.find({_id: id});
    }
    return this.ready();
})

Meteor.publish('co_chartAccountById', function co_chartAccountById({id}) {
    if (this.userId) {
        return Co_ChartAccount.find({id});
    }
    return this.ready();
})
Meteor.publish('co_accountType', function co_accountType({id}) {
    if (this.userId) {
        return Co_AccountType.find();
    }
    return this.ready();
})

Meteor.publish('co_journalById', function co_journalById({id}) {
    if (this.userId) {
        return Co_Journal.find({id});
    }
    return this.ready();
})

Meteor.publish('co_fixAssetById', function co_fixAssetById({id}) {
    if (this.userId) {
        return Co_FixAsset.find({id});
    }
    return this.ready();
})

Meteor.publish('co_endOfProcess', function co_endOfProcessById() {
    if (this.userId) {
        return Co_EndOfProcess.find({});
    }
    return this.ready();
})

