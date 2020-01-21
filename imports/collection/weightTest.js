import moment from "moment";

export const Co_WeightTest = new Meteor.Collection("co_weightTest");

Co_WeightTest.schema = new SimpleSchema({
    patientId: {
        type: String,
    },
    id: {
        type: String,
        optional: true
    },
    fileName: {
        type: String,
        optional: true
    },
    date: {
        type: String,
        optional: true
    },
    testNo: {
        type: String,
        optional: true
    },
    age: {
        type: String,
        optional: true
    },
    sex: {
        type: String,
        optional: true
    },
    height: {
        type: String,
        optional: true
    },
    bodyElementsAnalysis: {
        type: Object,
        optional: true,
        blackbox: true
    },
    'bodyElementsAnalysis.$.weight': {
        type: String,
        optional: true
    },

    'bodyElementsAnalysis.$.bodyFat': {
        type: String,
        optional: true
    },
    'bodyElementsAnalysis.$.bodyFatNormal': {
        type: String,
        optional: true
    },
    'bodyElementsAnalysis.$.removeF': {
        type: String,
        optional: true
    },
    'bodyElementsAnalysis.$.protein': {
        type: String,
        optional: true
    },
    'bodyElementsAnalysis.$.proteinNormal': {
        type: String,
        optional: true
    },
    'bodyElementsAnalysis.$.inoSalt': {
        type: String,
        optional: true
    },
    'bodyElementsAnalysis.$.inoSaltNormal': {
        type: String,
        optional: true
    },
    'bodyElementsAnalysis.$.waterC': {
        type: String,
        optional: true
    },
    'bodyElementsAnalysis.$.waterCNormal': {
        type: String,
        optional: true
    },
    muscleFatAnalysis: {
        type: Object,
        optional: true,
        blackbox: true
    },
    'muscleFatAnalysis.$.weight': {
        type: String,
        optional: true
    },
    'muscleFatAnalysis.$.weightNormal': {
        type: String,
        optional: true
    },
    'muscleFatAnalysis.$.skeletal': {
        type: String,
        optional: true
    },
    'muscleFatAnalysis.$.skeletalNormal': {
        type: String,
        optional: true
    },
    'muscleFatAnalysis.$.bodyFat': {
        type: String,
        optional: true
    },
    'muscleFatAnalysis.$.bodyFatNormal': {
        type: String,
        optional: true
    },
    obesityAnalysis: {
        type: Object,
        optional: true,
        blackbox: true
    },
    'obesityAnalysis.$.bmi': {
        type: String,
        optional: true
    },
    'obesityAnalysis.$.bmiNormal': {
        type: String,
        optional: true
    },
    'obesityAnalysis.$.bodyFatPercent': {
        type: String,
        optional: true
    },
    'obesityAnalysis.$.bodyFatPercentNormal': {
        type: String,
        optional: true
    },
    'obesityAnalysis.$.waistHipFatRate': {
        type: String,
        optional: true
    },
    'obesityAnalysis.$.waistHipFatRateNormal': {
        type: String,
        optional: true
    },
    'obesityAnalysis.$.waterRate': {
        type: String,
        optional: true
    },
    'obesityAnalysis.$.waterRateNormal': {
        type: String,
        optional: true
    },

    bioimpedance: {
        type: Object,
        optional: true,
        blackbox: true
    },
    'bioimpedance.$.ra20': {
        type: String,
        optional: true
    },
    'bioimpedance.$.ra50': {
        type: String,
        optional: true
    },
    'bioimpedance.$.ra100': {
        type: String,
        optional: true
    },
    'bioimpedance.$.la20': {
        type: String,
        optional: true
    },
    'bioimpedance.$.la50': {
        type: String,
        optional: true
    },
    'bioimpedance.$.la100': {
        type: String,
        optional: true
    },
    'bioimpedance.$.tr20': {
        type: String,
        optional: true
    },
    'bioimpedance.$.tr50': {
        type: String,
        optional: true
    },
    'bioimpedance.$.tr100': {
        type: String,
        optional: true
    },
    'bioimpedance.$.rl20': {
        type: String,
        optional: true
    },
    'bioimpedance.$.rl50': {
        type: String,
        optional: true
    },
    'bioimpedance.$.rl100': {
        type: String,
        optional: true
    },
    'bioimpedance.$.ll20': {
        type: String,
        optional: true
    },
    'bioimpedance.$.ll50': {
        type: String,
        optional: true
    },
    'bioimpedance.$.ll100': {
        type: String,
        optional: true
    },
    weightControl: {
        type: Object,
        optional: true,
        blackbox: true
    },
    'weightControl.$.targetWeight': {
        type: String,
        optional: true
    },
    'weightControl.$.weightControl': {
        type: String,
        optional: true
    },
    'weightControl.$.fatControl': {
        type: String,
        optional: true
    },
    'weightControl.$.muscleControl': {
        type: String,
        optional: true
    },
    'weightControl.$.basalMet': {
        type: String,
        optional: true
    },

    nutritionalAssessment: {
        type: Object,
        optional: true,
        blackbox: true
    },
    'nutritionalAssessment.$.protein': {
        type: String,
        optional: true
    },
    'nutritionalAssessment.$.inorganic': {
        type: String,
        optional: true
    },
    'nutritionalAssessment.$.fat': {
        type: String,
        optional: true
    },

    weightAssessment: {
        type: Object,
        optional: true,
        blackbox: true
    },
    'weightAssessment.$.weight': {
        type: String,
        optional: true
    },
    'weightAssessment.$.muscle': {
        type: String,
        optional: true
    },
    obesityAnalysis2: {
        type: Object,
        optional: true,
        blackbox: true
    },
    'obesityAnalysis2.$.bmi': {
        type: String,
        optional: true
    },
    'obesityAnalysis2.$.bodyFatP': {
        type: String,
        optional: true
    },
    'obesityAnalysis2.$.bodyShape': {
        type: String,
        optional: true
    },
    health: {
        type: String,
        optional: true
    },
    score: {
        type: String,
        optional: true
    },

    rolesArea: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return moment().toDate();
            }
        }
    },
    createdUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    updatedUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    }

})

Meteor.startup(function () {
    Co_WeightTest.attachSchema(Co_WeightTest.schema);
})
