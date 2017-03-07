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

}

