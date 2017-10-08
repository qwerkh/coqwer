import ClassReport from "../class";

Meteor.methods({
    giveMeRegisterReport(param){
        return ClassReport.registerReport(param);
    },
    giveMeRegisterByDateReport(param){
        return ClassReport.registerByDateReport(param);
    },
    giveMeJournalReport(param){
        return ClassReport.journalReport(param);
    },
    giveMeProfitLostReport(param,exchangeId){
        return ClassReport.profitLostReport(param,exchangeId);
    }
})