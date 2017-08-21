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
import {Co_AccountType} from '../imports/collection/accountType';
import {Co_ChartAccount} from '../imports/collection/chartAccount';
import {Co_Journal} from '../imports/collection/journal';
import {Co_FixAsset} from '../imports/collection/fixAsset';
import {Co_EndOfProcess} from '../imports/collection/endOfProcess';
import {Co_MapFixAsset} from '../imports/collection/mapFixAsset';
import {Security} from 'meteor/ongoworks:security';

/*Security.permit(['insert', 'update', 'remove']).collections([
 Co_Patient,
 Co_Machin,
 Co_Medicine,
 Co_Service
 ]);*/

/*
 Co_Machin.permit(['insert', 'update']);
 Co_Patient.permit(['insert', 'update']);
 Co_Medicine.permit(['insert', 'update']);
 Co_Service.permit(['insert', 'update']);
 */

Security.permit(['insert', 'update', 'remove']).collections([
    Co_Machin,
    Co_Patient,
    Co_Medicine,
    Co_Service,
    Co_Register,
    Co_MachinType,
    Co_MedicineType,
    Co_ServiceType,
    Co_Exchange,
    Co_Company,
    Co_Reference,
    Co_Payment,
    Co_ChartAccount,
    Co_Journal,
    Co_FixAsset,
    Co_EndOfProcess,
    Co_MapFixAsset
]).allowInClientCode();
