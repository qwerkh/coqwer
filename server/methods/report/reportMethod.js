import ClassReport from "../class";

Meteor.methods({
    giveMeRegisterReport(param, userId) {
        return ClassReport.registerReport(param, userId);
    },
    giveMeRegisterByDateReport(param, userId) {
        return ClassReport.registerByDateReport(param, userId);
    },
    giveMeRegisterByItemReport(param, userId) {
        return ClassReport.registerByItemReport(param, userId);
    },
    giveMeRegisterServiceReport(param, serviceType, service, userId) {
        return ClassReport.registerServiceReport(param, serviceType, service, userId);
    },
    giveMeRegisterMedicineReport(param, medicineType, medicine, userId) {
        return ClassReport.registerMedicineReport(param, medicineType, medicine, userId);
    },
    giveMeJournalReport(param, userId) {
        return ClassReport.journalReport(param, userId);
    },
    giveMeProfitLostReport(param, exchangeId, userId) {
        return ClassReport.profitLostReport(param, exchangeId, userId);
    },
    giveMeUnPaidByCustomerReport(param, userId) {
        return ClassReport.unpaidByCustomerReport(param, userId);

    },
    giveMeCheckQualityMachinReport(param, userId, machinTypeId, machinId) {
        return ClassReport.checkQualityMachinReport(param, userId, machinTypeId, machinId);

    },
    giveMeMedicineBarcodeReport(param) {
        return ClassReport.medicineBarcodeReport(param);

    },
    giveMeWeightTestReport(param) {
        return ClassReport.weightTestReport(param);

    }
})