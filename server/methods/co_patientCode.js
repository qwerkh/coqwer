import {Co_PatientCode} from '../../imports/collection/patientCode';
import {Co_PatientCodeReact} from '../../imports/collection/patientCode';
import {Co_Patient} from '../../imports/collection/patient';

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