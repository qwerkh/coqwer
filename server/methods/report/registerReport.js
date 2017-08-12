import ClassReport from "../class";

Meteor.methods({
    giveMeRegisterReport(param){
        return ClassReport.registerReport(param);
    }
})