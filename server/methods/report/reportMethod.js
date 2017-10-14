import ClassReport from "../class";

Meteor.methods({
    giveMeRegisterReport(param,userId){
        return ClassReport.registerReport(param,userId);
    },
    giveMeRegisterByDateReport(param,userId){
        return ClassReport.registerByDateReport(param,userId);
    },
    giveMeJournalReport(param,userId){
        return ClassReport.journalReport(param,userId);
    },
    giveMeProfitLostReport(param,exchangeId,userId){
        return ClassReport.profitLostReport(param,exchangeId,userId);
    }
})