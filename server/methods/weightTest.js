import {Meteor} from "meteor/meteor";
import {Co_WeightTest} from "../../imports/collection/weightTest";

Meteor.methods({
    insertWeightTest(list, area, patientId, fileName) {
        let data = {};
        data.rolesArea = area;
        data.patientId = patientId;
        data.fileName = fileName;

        data.bodyElementsAnalysis = {};
        data.muscleFatAnalysis = {};
        data.obesityAnalysis = {};
        data.bioimpedance = {};
        data.weightControl = {};
        data.nutritionalAssessment = {};
        data.weightAssessment = {};
        data.obesityAnalysis2 = {};
        data.id = list[1].split("*")[1].split(" ")[2];
        data.date = list[3].split("*")[1].split(" ")[3] + " " + list[3].split("*")[1].split(" ")[4];
        data.testNo = list[6].split("*")[1].split(" ")[4];

        data.age = list[7].split("*")[1].split(" ")[10];
        data.sex = list[8].split("*")[1].split(" ")[10];
        data.height = list[9].split("*")[1].split(" ")[7];
        data.bodyElementsAnalysis.weight = list[12].split("*")[1].split(" ")[11];
        data.bodyElementsAnalysis.bodyFat = list[13].split("*")[1].split(" ")[10];
        data.bodyElementsAnalysis.bodyFatNormal = list[13].split("*")[3].split(" ")[7] + list[13].split("*")[3].split(" ")[8];
        data.bodyElementsAnalysis.removeF = list[14].split("*")[1].split(" ")[10];
        data.bodyElementsAnalysis.protein = list[15].split("*")[1].split(" ")[11];
        data.bodyElementsAnalysis.proteinNormal = list[15].split("*")[3].split(" ")[7] + list[15].split("*")[3].split(" ")[9];
        data.bodyElementsAnalysis.inoSalt = list[16].split("*")[1].split(" ")[9];
        data.bodyElementsAnalysis.inoSaltNormal = list[16].split("*")[3].split(" ")[6] + list[16].split("*")[3].split(" ")[7];
        data.bodyElementsAnalysis.waterC = list[17].split("*")[1].split(" ")[10];
        data.bodyElementsAnalysis.waterCNormal = list[17].split("*")[3].split(" ")[6] + list[17].split("*")[3].split(" ")[7];

        data.muscleFatAnalysis.weight = list[20].split("*")[1].split(" ")[12];
        data.muscleFatAnalysis.weightNormal = list[20].split("*")[3].split(" ")[6] + list[20].split("*")[3].split(" ")[7];
        data.muscleFatAnalysis.skeletal = list[21].split("*")[1].split(" ")[10];
        data.muscleFatAnalysis.skeletalNormal = list[21].split("*")[3].split(" ")[6] + list[21].split("*")[3].split(" ")[7];
        data.muscleFatAnalysis.bodyFat = list[22].split("*")[1].split(" ")[11];
        data.muscleFatAnalysis.bodyFatNormal = list[22].split("*")[3].split(" ")[7] + list[22].split("*")[3].split(" ")[8];

        data.obesityAnalysis.bmi = list[25].split("*")[1].split(" ")[16];
        data.obesityAnalysis.bmiNormal = list[25].split("*")[3].split(" ")[6] + list[25].split("*")[3].split(" ")[7];
        data.obesityAnalysis.bodyFatPercent = list[26].split("*")[1].split(" ")[5];
        data.obesityAnalysis.bodyFatPercentNormal = list[26].split("*")[3].split(" ")[6] + list[26].split("*")[3].split(" ")[7];
        data.obesityAnalysis.waistHipFatRate = list[27].split("*")[1].split(" ")[4].split(":")[1];
        data.obesityAnalysis.waistHipFatRateNormal = list[27].split("*")[3].split(" ")[6] + list[27].split("*")[3].split(" ")[7];
        data.obesityAnalysis.waterRate = list[28].split("*")[1].split(" ")[10];
        data.obesityAnalysis.waterRateNormal = list[28].split("*")[3].split(" ")[6] + list[28].split("*")[3].split(" ")[7];

        data.bioimpedance.ra20 = list[32].split("*")[1].split(" ")[2];
        data.bioimpedance.ra50 = list[33].split("*")[1].split(" ")[2];
        data.bioimpedance.ra100 = list[34].split("*")[1].split(" ")[1];
        data.bioimpedance.la20 = list[32].split("*")[1].split(" ")[3];
        data.bioimpedance.la50 = list[33].split("*")[1].split(" ")[3];
        data.bioimpedance.la100 = list[34].split("*")[1].split(" ")[2];
        data.bioimpedance.tr20 = list[32].split("*")[1].split(" ")[4];
        data.bioimpedance.tr50 = list[33].split("*")[1].split(" ")[4];
        data.bioimpedance.tr100 = list[34].split("*")[1].split(" ")[3];
        data.bioimpedance.rl20 = list[32].split("*")[1].split(" ")[5];
        data.bioimpedance.rl50 = list[33].split("*")[1].split(" ")[5];
        data.bioimpedance.rl100 = list[34].split("*")[1].split(" ")[4];
        data.bioimpedance.ll20 = list[32].split("*")[1].split(" ")[6];
        data.bioimpedance.ll50 = list[33].split("*")[1].split(" ")[6];
        data.bioimpedance.ll100 = list[34].split("*")[1].split(" ")[5];

        data.weightControl.targetWeight = list[37].split("*")[1].split(":")[1].replace(/[^\d\.]*/g, '');
        data.weightControl.weightControl = list[38].split("*")[1].split(":")[1].split(" ")[0] + list[38].split("*")[1].split(":")[1].replace(/[^\d\.]*/g, '');
        data.weightControl.fatControl = list[39].split("*")[1].split(":")[1].split(" ")[0] + list[39].split("*")[1].split(":")[1].replace(/[^\d\.]*/g, '');
        data.weightControl.muscleControl = list[40].split("*")[1].split(":")[1].split(" ")[0] + list[40].split("*")[1].split(":")[1].replace(/[^\d\.]*/g, '');
        data.weightControl.basalMet = list[41].split("*")[1].split(":")[1].replace(/[^\d\.]*/g, '');

        data.nutritionalAssessment.protein = list[44].split("*")[1].split(" ")[11];
        data.nutritionalAssessment.inorganic = list[45].split("*")[1].split(" ")[9];
        data.nutritionalAssessment.fat = list[46].split("*")[1].split(" ")[15];

        data.weightAssessment.weight = list[49].split("*")[1].split(" ")[12];
        data.weightAssessment.muscle = list[50].split("*")[1].split(" ")[12];

        data.obesityAnalysis2.bmi = list[53].split("*")[1].split(" ")[15];
        data.obesityAnalysis2.bodyFatP = list[54].split("*")[1].split(" ")[9];
        data.obesityAnalysis2.bodyShape = list[55].split("*")[1].split(" ")[9] + list[55].split("*")[1].split(" ")[13];

        data.health = list[57].split("*")[1].split(" ")[7];
        data.score = list[57].split("*")[1].split(" ")[11].split("Scor")[1];

        return Co_WeightTest.insert(data);
    },
    queryWeightTest({q, filter, patientId, options = {limit: 10, skip: 0}}) {
        if (Meteor.userId()) {
            let data = {
                content: [],
                countWeightTest: 0,
            };
            let selector = {};
            if (!!q) {
                let reg = new RegExp(q);
                if (!!filter) {
                    selector[filter] = {$regex: reg, $options: 'mi'}
                } else {
                    selector.$or = [{testNo: {$regex: reg, $options: 'mi'}}, {date: {$regex: reg, $options: 'mi'}}];
                }
            }
            selector.patientId = patientId;
            let weightTests = Co_WeightTest.aggregate([
                {
                    $match: selector
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $limit: options.limit
                },
                {
                    $skip: options.skip
                }
            ]);
            if (weightTests.length > 0) {
                data.content = weightTests;
                let weightTestTotal = Co_WeightTest.find(selector).count();
                data.countWeightTest = weightTestTotal;
            }
            return data;
        }
    },
    removeWeightTest(id) {
        let isRemoved = Co_WeightTest.remove({_id: id});
        return isRemoved;
    }

})