export const Co_DrRegister = new Meteor.Collection("co_drRegister");

Co_DrRegister.schema = new SimpleSchema({
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
    pastMedical: {
        type: String,
        optional: true,
        label: "Past Medical",
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
    currentMedical: {
        type: String,
        optional: true,
        label: "Current Medical",
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
    allergie: {
        type: String,
        optional: true,
        label: "Allergie",
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
    otherInAssessment: {
        type: String,
        optional: true,
        label: "Other (Assessment)",
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
    paraClinic: {
        type: String,
        optional: true,
        label: "Para Clinic",
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
    treatment: {
        type: String,
        optional: true,
        label: "Treatment",
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
    Co_DrRegister.attachSchema(Co_DrRegister.schema);
})
