import {Co_PatientCode} from '../../imports/collection/patientCode';
import {Co_PatientCodeReact} from '../../imports/collection/patientCode';
import {Co_Patient, Co_PatientImage} from '../../imports/collection/patient';

Meteor.methods({
    queryPatientCode({q, filter, options = {limit: 10, skip: 0}}) {
        if (Meteor.userId()) {
            let data = {
                content: [],
                countPatientCode: 0,
            };
            let selector = {};
            if (!!q) {
                let reg = new RegExp(q);
                if (!!filter) {
                    selector[filter] = {$regex: reg, $options: 'mi'}
                } else {
                    let patientSelector = {};
                    patientSelector.$or = [
                        {
                            enName: {
                                $regex: reg,
                                $options: 'mi'
                            }
                        },
                        {
                            khName: {
                                $regex: reg,
                                $options: 'mi'
                            }
                        },
                        {
                            order: parseFloat(q)
                        },
                        {
                            phoneNumber: {
                                $regex: reg,
                                $options: 'mi'
                            }
                        },
                        {
                            address: {
                                $regex: reg,
                                $options: 'mi'
                            }
                        },
                        {
                            occupation: {
                                $regex: reg,
                                $options: 'mi'
                            }
                        }
                    ];
                    let patientList = Co_Patient.find(patientSelector, {_id: true},
                        {
                            $limit: options.limit
                        },
                        {
                            $skip: options.skip
                        }).fetch().map((obj) => {
                        return obj._id;
                    });


                    selector.$or = [
                        {code: {$regex: reg, $options: 'mi'}},
                        {patientId: {$in: patientList}}
                    ];
                }
            }
            let patientCodeList = Co_PatientCode.aggregate([
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
                },
                {
                    $lookup: {
                        from: "co_patient",
                        localField: "patientId",
                        foreignField: "_id",
                        as: "patientDoc"
                    }
                },
                {$unwind: {path: "$patientDoc", preserveNullAndEmptyArrays: true}},
            ]);

            if (patientCodeList.length > 0) {
                data.content = patientCodeList;
                let patientCodeTotal = Co_PatientCode.find(selector).count();
                data.countPatientCode = patientCodeTotal;
            }
            return data;
        }
    },
    insertPatientCode(data) {
        let isInserted = Co_PatientCode.insert(data);
        if (isInserted) {
            patientCodeReact(isInserted);
        }
        return isInserted;
    },
    updatePatientUrl(patientId, url) {
        if (Meteor.userId()) {
            let patientDoc = Co_Patient.findOne({_id: patientId});
            let urlList = patientDoc.urlList || [];
            urlList.unshift(url);
            let isUpdated = Co_Patient.update({_id: patientId}, {$set: {urlList: urlList}});
            return isUpdated;
        }
    },
    removePatientImage(patientId, url) {
        if (Meteor.userId()) {
            let patientDoc = Co_Patient.findOne({_id: patientId});
            let urlList = (patientDoc.urlList || []).filter((e) => e !== url);
            let isUpdated = Co_Patient.update({_id: patientId}, {$set: {urlList: urlList}});
            if (isUpdated) {
                Co_PatientImage.insert({patientId: patientId, url: url});
            }
            return isUpdated;
        }
    }
});


let patientCodeReact = function (id) {
    let doc = Co_PatientCodeReact.findOne();
    if (doc) {
        Co_PatientCodeReact.update({_id: doc._id}, {
            $set: {
                id: id
            }
        });
    } else {
        Co_PatientCodeReact.insert({
            id: id
        });
    }
}