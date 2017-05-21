if (false) {
    //Create View Patient
    db.createView('vw_patient', 'co_patient',
        [
            {
                $lookup: {
                    from: "Images",
                    localField: "picture",
                    foreignField: "_id",
                    as: "imageDoc"
                }
            },
            {$unwind: {path: "$imageDoc", preserveNullAndEmptyArrays: true}}

        ]
    )

    //Service


    db.createView('vw_service', 'co_service',
        [
            {
                $lookup: {
                    from: "co_serviceType",
                    localField: "serviceTypeId",
                    foreignField: "_id",
                    as: "serviceTypeDoc"
                }
            },
            {$unwind: {path: "$serviceTypeDoc", preserveNullAndEmptyArrays: true}},
            {
                $lookup: {
                    from: "co_machinType",
                    localField: "machinTypeId",
                    foreignField: "_id",
                    as: "machinTypeDoc"
                }
            },

            {
                $project: {
                    "name": 1,
                    "price": 1,
                    "description": 1,
                    "status": 1,
                    "rolesArea": 1,
                    "serviceTypeDoc": "$serviceTypeDoc",
                    "machinTypeList": "$machinTypeDoc.name"

                }
            }
        ]
    )


//    Machin

    db.createView('vw_machin', 'co_machin',
        [
            {
                $lookup: {
                    from: "co_machinType",
                    localField: "machinTypeId",
                    foreignField: "_id",
                    as: "machinTypeDoc"
                }
            },
            {$unwind: {path: "$machinTypeDoc", preserveNullAndEmptyArrays: true}}

        ]
    )

//    Medicine

    db.createView('vw_medicine', 'co_medicine',
        [
            {
                $lookup: {
                    from: "co_medicineType",
                    localField: "medicineTypeId",
                    foreignField: "_id",
                    as: "medicineTypeDoc"
                }
            },
            {$unwind: {path: "$medicineTypeDoc", preserveNullAndEmptyArrays: true}}

        ]
    )

    // Register

    db.createView('vw_register', 'co_register',
        [
            {
                $lookup: {
                    from: "co_patient",
                    localField: "patientId",
                    foreignField: "_id",
                    as: "patientDoc"
                }
            },
            {$unwind: {path: "$patientDoc", preserveNullAndEmptyArrays: true}}

        ]
    )

}

