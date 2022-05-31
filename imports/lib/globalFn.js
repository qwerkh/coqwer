import numeral from "numeral";
import {Co_RegisterAudit} from '../../imports/collection/register';
import {Co_PaymentAudit} from '../../imports/collection/payment';
import {Co_PatientAudit} from '../../imports/collection/patient';

export default class GlobalFn {
    static collectionAudit = (collectionAuditName, oldDoc, type) => {
        if (type && type !== undefined && oldDoc && oldDoc !== undefined) {
            let od = {};
            od.type = type;
            od.data = oldDoc;
            switch (collectionAuditName) {
                case "Co_RegisterAudit":
                    Co_RegisterAudit.insert(od);
                    break;
                case "Co_PaymentAudit":
                    Co_PaymentAudit.insert(od);
                    break;
                case "Co_PatientAudit":
                    Co_PatientAudit.insert(od);
                    break;
                default:
                    break;
            }
        }
    };


}
