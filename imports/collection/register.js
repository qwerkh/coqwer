import './image';
export const Co_Register = new Meteor.Collection("co_register");
export const VW_Register = new Meteor.Collection("vw_register");

Co_Register.schema = new SimpleSchema({
    patientId: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    registerDate: {
        type: Date,
        label: 'Register Date',
        autoform: {
            type: 'pickadate',
            defaultValue: moment().toDate(),
            pickadateOptions: {
                // selectMonths: true, // Creates a dropdown to control month
                selectYears: 170, // Creates a dropdown of 15 years to control year
                formatSubmit: "DD/MM/YYYY"
            }
        }
    },
    voucherId: {
        type: String,
        optional: true
    },
    services: {
        type: [Object],
        optional: true,
        blackbox: true
    },
    'services.$.serviceId': {
        type: String
    },
    'services.$.serviceName': {
        type: String
    },
    'services.$.machinId': {
        type: [String]
    },
    'services.$.price': {
        type: Number,
        decimal: true,
        autoform: {
            type: 'inputmask',
            afFieldInput: {
                inputmaskOptions: inputmaskOptions.decimal()
            }
        }
    },
    'services.$.qty': {
        type: Number
    },
    'services.$.amount': {
        type: Number,
        decimal: true
    },

    medicines: {
        type: [Object],
        optional: true,
        blackbox: true
    },
    'medicines.$.medicineId': {
        type: String
    }, 'medicines.$.medicineName': {
        type: String
    },
    'medicines.$.price': {
        type: Number,
        decimal: true,
        autoform: {
            type: 'inputmask',
            afFieldInput: {
                inputmaskOptions: inputmaskOptions.decimal()
            }
        }
    },
    'medicines.$.qty': {
        type: Number
    },
    'medicines.$.amount': {
        type: Number,
        decimal: true
    },

    totalService: {
        type: Number,
        decimal: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    discountServiceType: {
        type: String,
        optional: true,
        autoform: {
            type: "select",
            defaultValue: "Amount",
            afFieldInput: {
                options: function () {
                    let list = [];
                    list.push({label: "A", value: "Amount"});
                    list.push({label: "P", value: "Percent"});
                    return list;
                }
            }
        }
    },
    discountService: {
        type: Number,
        decimal: true,
        optional: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    netTotalService: {
        type: Number,
        decimal: true
    },
    totalMedicine: {
        type: Number,
        decimal: true
    },
    discountMedicineType: {
        type: String,
        optional: true,
        autoform: {
            type: "select",
            defaultValue: "Amount",
            afFieldInput: {
                options: function () {
                    let list = [];
                    list.push({label: "A", value: "Amount"});
                    list.push({label: "P", value: "Percent"});
                    return list;
                }
            }
        }
    },
    discountMedicine: {
        type: Number,
        decimal: true,
        optional: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    netTotalMedicine: {
        type: Number,
        decimal: true
    },
    netTotal: {
        type: Number,
        label: "Net Total",
        decimal: true,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    status: {
        type: String,
        defaultValue: "Active"
        //    Active
        //    Partial
        //    Complete
    },
    paidAmountUSD: {
        type: Number,
        label: "Paid USD",
        decimal: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    paidAmountKHR: {
        type: Number,
        label: "Paid Riel",
        decimal: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    paidAmountTHB: {
        type: Number,
        label: "Paid Baht",
        decimal: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    returnAmountUSD: {
        type: Number,
        label: "Return Dollar",
        decimal: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal({digits: 2});
            }
        }
    },
    returnAmountKHR: {
        type: Number,
        label: "Return Riel",
        decimal: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(0);
            }
        }
    },
    returnAmountTHB: {
        type: Number,
        label: "Return Baht",
        decimal: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(0);
            }
        }
    },


    balance: {
        type: Number,
        label: "Balance",
        decimal: true
    },

    rolesArea: {
        type: String,
        optional: true
    },
    paymentNumber: {
        type: Number,
        optional: true,
        defaultValue: 0
    }

})

Co_Register.serviceForm = new SimpleSchema({
    serviceId: {
        type: String,
        optional: true,
        autoform: {
            type: 'select'
        }
    },
    machinId: {
        type: [String],
        optional: true,
        autoform: {
            type: 'select',
            multi: true
        }
    }
    ,
    discountService: {
        type: Number,
        decimal: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    discountServiceType: {
        type: String,
        autoform: {
            type: "select",
            defaultValue: "Amount",
            afFieldInput: {
                options: function () {
                    let list = [];
                    list.push({label: "A", value: "Amount"});
                    list.push({label: "P", value: "Percent"});
                    return list;
                }
            }
        }
    },
    totalService: {
        type: Number,
        decimal: true,
        optional: true,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    netTotalService: {
        type: Number,
        decimal: true,
        optional: true,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    price: {
        type: Number,
        decimal: true,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    qty: {
        type: Number,
        decimal: true,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    amount: {
        type: Number,
        decimal: true,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    }
})

Co_Register.medicineForm = new SimpleSchema({
    medicineId: {
        type: String,
        optional: true,
        autoform: {
            type: 'select'
        }
    }
    ,
    discountMedicine: {
        type: Number,
        decimal: true,
        defaultValue: 0,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    discountMedicineType: {
        type: String,
        autoform: {
            type: "select",
            defaultValue: "Amount",
            afFieldInput: {
                options: function () {
                    let list = [];
                    list.push({label: "A", value: "Amount"});
                    list.push({label: "P", value: "Percent"});
                    return list;
                }
            }
        }
    },
    totalMedicine: {
        type: Number,
        decimal: true,
        optional: true,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    netTotalMedicine: {
        type: Number,
        decimal: true,
        optional: true,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    price: {
        type: Number,
        decimal: true,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    qty: {
        type: Number,
        decimal: true,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    },
    amount: {
        type: Number,
        decimal: true,
        autoform: {
            type: "inputmask",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal(2);
            }
        }
    }
})

Meteor.startup(function () {
    Co_Register.attachSchema(Co_Register.schema);
});
