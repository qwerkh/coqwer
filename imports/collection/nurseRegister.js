export const Co_NurseRegister = new Meteor.Collection("co_nurseRegister");

Co_NurseRegister.schema = new SimpleSchema({
    date: {
        type: String,
        optional: true
    },
    patientId: {
        type: String
    },
    history: {
        type: String,
        optional: true,
        label: "History",
        autoform: {
            // type: "textarea"

            type: "medium",
            mediumOptions: {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'anchor'],
                    diffLeft: 25,
                    diffTop: 10,
                },
                keepLabel: true
            }
        }
    },
    physicalExam: {
        type: String,
        optional: true,
        label: "Physical Exam",
        autoform: {
            // type: "textarea"

            type: "medium",
            mediumOptions: {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'anchor'],
                    diffLeft: 25,
                    diffTop: 10,
                },
                keepLabel: true
            }
        }
    },

    patientComplaint: {
        type: String,
        optional: true,
        label: "Patient Complaint",
        autoform: {
            // type: "textarea"

            type: "medium",
            mediumOptions: {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'anchor'],
                    diffLeft: 25,
                    diffTop: 10,
                },
                keepLabel: true
            }
        }
    },


    diagnosis: {
        type: String,
        optional: true,
        label: "Diagnosis",
        autoform: {
            // type: "textarea"

            type: "medium",
            mediumOptions: {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'anchor'],
                    diffLeft: 25,
                    diffTop: 10,
                },
                keepLabel: true
            }
        }
    },
    planning: {
        type: String,
        optional: true,
        label: "Planing",
        autoform: {
            // type: "textarea"

            type: "medium",
            mediumOptions: {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'anchor'],
                    diffLeft: 25,
                    diffTop: 10,
                },
                keepLabel: true
            }
        }
    },
    implementation: {
        type: String,
        optional: true,
        label: "Implementation",
        autoform: {
            // type: "textarea"

            type: "medium",
            mediumOptions: {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'anchor'],
                    diffLeft: 25,
                    diffTop: 10,
                },
                keepLabel: true
            }
        }
    },
    evaluation: {
        type: String,
        optional: true,
        label: "Evaluation",
        autoform: {
            // type: "textarea"

            type: "medium",
            mediumOptions: {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'anchor'],
                    diffLeft: 25,
                    diffTop: 10,
                },
                keepLabel: true
            }
        }
    },
    other: {
        type: String,
        optional: true,
        label: "Other",
        autoform: {
            // type: "textarea"

            type: "medium",
            mediumOptions: {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'anchor'],
                    diffLeft: 25,
                    diffTop: 10,
                },
                keepLabel: true
            }
        }
    },
    rolesArea: {
        type: String,
        optional: true
    }

})

Meteor.startup(function () {
    Co_NurseRegister.attachSchema(Co_NurseRegister.schema);
})
