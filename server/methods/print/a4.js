import {Co_Register} from '../../../imports/collection/register';
import {Co_Company} from '../../../imports/collection/company';
import {Co_Payment} from '../../../imports/collection/payment.js';
import {Co_MedicineType} from '../../../imports/collection/medicineType';
import {Co_Medicine} from '../../../imports/collection/medicine';
import {Co_Patient} from '../../../imports/collection/patient.js';
import {Co_Exchange} from '../../../imports/collection/exchange';
import {GeneralFunction} from "../../../imports/api/methods/generalFunction";

Meteor.methods({
    printA4({invoiceId, summary}) {
        let company = Co_Company.findOne({});
        let register = Co_Register.findOne({
            $or: [
                {_id: invoiceId},
                {printId: invoiceId}
            ]
        });
        let result = [];
        if (summary) {
            register.medicines.forEach((obj) => {
                let medicineDoc = Co_Medicine.findOne({_id: obj.medicineId})
                obj.type = Co_MedicineType.findOne({_id: medicineDoc.medicineTypeId}).type;
                return obj;
            })

            register.medicines.reduce(function (key, val) {
                if (!key[val.type]) {
                    key[val.type] = {
                        type: val.type,
                        amount: val.amount
                    };
                    result.push(key[val.type]);
                } else {
                    key[val.type].amount += math.round(val.amount, 3);
                }
                return key;
            }, {});

            register.medicines = result;
        }

        register.patient = Co_Patient.findOne({_id: register.patientId});
        register.totalPaid = register.netTotal - register.balance;
        let payment = Co_Payment.findOne({registerId: register._id});
        let exchangeDoc = Co_Exchange.findOne({exDate: {$lte: moment(register.registerDate).endOf("days").toDate()}}, {sort: {exDate: -1}});
        register.netTotalRiel = GeneralFunction.exchange(company.baseCurrency, "KHR", register.netTotal);
        register.ageCal = moment(register.registerDate).diff(moment(register.patient.dob).startOf("day").toDate(), "year");
        return {company: company, register: register, payment: payment};
    },
    printMini({invoiceId}) {
        let invoice = Invoices.aggregate([
            {
                $match: {
                    $or: [
                        {_id: invoiceId},
                        {printId: invoiceId}
                    ]
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "staffId",
                    foreignField: "_id",
                    as: "userDoc"
                }
            },
            {
                $lookup: {
                    from: "pos_customers",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "_customer"
                }
            }, {
                $lookup: {
                    from: "pos_stockLocations",
                    localField: "stockLocationId",
                    foreignField: "_id",
                    as: "stockLocationDoc"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "staffId",
                    foreignField: "_id",
                    as: "_staff"
                }
            },

            {$unwind: {path: '$_customer', preserveNullAndEmptyArrays: true}},
            {$unwind: {path: '$userDoc', preserveNullAndEmptyArrays: true}},
            {$unwind: {path: '$_staff', preserveNullAndEmptyArrays: true}},
            {$unwind: {path: '$items', preserveNullAndEmptyArrays: true}},
            {$unwind: {path: '$stockLocationDoc', preserveNullAndEmptyArrays: true}},
            {
                $lookup: {
                    from: "pos_item",
                    localField: "items.itemId",
                    foreignField: "_id",
                    as: "items.itemDoc"
                }
            },
            {$unwind: {path: '$items.itemDoc', preserveNullAndEmptyArrays: true}},
            {
                $lookup: {
                    from: "pos_unitConvert",
                    localField: 'items.unitConvertId',
                    foreignField: "_id",
                    as: 'unitConvertDoc'
                }
            },
            {
                $unwind: {
                    path: '$unitConvertDoc', preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    voucherId: 1,
                    invoiceDate: 1,
                    dueDate: 1,
                    shipTo: 1,
                    userDoc: 1,
                    _rep: 1,
                    _customer: 1,
                    _staff: 1,
                    total: 1,
                    subTotal: 1,
                    discount: 1,
                    invoiceType: 1,
                    stockLocationDoc: 1,
                    items: {
                        itemId: 1,
                        qty: 1,
                        originalQty: calculateOriginalQty(),
                        discount: {$add: ["$items.discount", 0]},
                        amount: 1,
                        price: {$add: ["$items.price", 0]},
                        itemName: '$items.itemDoc.name',
                        remainQty: 1,
                        _unit: 1,
                        itemDoc: {
                            _unit: 1,
                            name: {$ifNull: [{$concat: [checkCoefficientType()]}, "$items.itemDoc.name"]}
                        },
                        unitConvertDoc: '$unitConvertDoc'
                    }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    voucherId: {$last: '$voucherId'},
                    saleDate: {
                        $last: '$invoiceDate'
                    },
                    dueDate: {
                        $last: '$dueDate'
                    },
                    _customer: {$last: '$_customer'},
                    userDoc: {$last: '$userDoc'},
                    _staff: {$last: '$_staff'},
                    _rep: {$last: '$_rep'},
                    total: {$last: '$total'},
                    stockLocationDoc: {$last: '$stockLocationDoc'},
                    invoiceType: {$last: '$invoiceType'},
                    subTotal: {$last: '$subTotal'},
                    discount: {$last: '$discount'},
                    items: {$push: "$items"},
                    shipTo: {$last: '$shipTo'}
                }
            },
            {
                $lookup: {
                    from: "pos_receivePayment",
                    localField: "_id",
                    foreignField: "invoiceId",
                    as: "paymentDoc"
                }
            },
            {$unwind: {path: '$paymentDoc', preserveNullAndEmptyArrays: true}},
            {
                $project: {
                    sale: {
                        _id: {$ifNull: ["$voucherId", "$_id"]},
                        _customer: '$_customer',
                        userDoc: '$userDoc',
                        _staff: '$_staff',
                        _rep: '$_rep',
                        saleDate: '$saleDate',
                        dueDate: '$dueDate',
                        stockLocationDoc: '$stockLocationDoc',
                        total: '$total',
                        invoiceType: '$invoiceType',
                        typeOfInvoice: {
                            $ifNull: ["$saleOrderType", "កម្ម៉ង់ទិញ"]
                        },
                        subTotal: '$subTotal',
                        discount: {
                            $ifNull: ['$discount', 0]
                        },
                        saleDetails: '$items',
                        paymentObj: {
                            paidAmount: {$sum: "$paymentDoc.paidAmount"},
                            balanceAmount: {$subtract: ['$total', {$sum: "$paymentDoc.paidAmount"}]}
                        }
                    }
                }
            }
        ]);
        if (invoice.length > 0) {
            return {invoice: invoice[0], user: invoice[0] && invoice[0].sale.userDoc};
        }
        return [{}];
    }
});

function checkCoefficientType() {
    return {
        $switch: {
            branches: [
                {
                    case: {$eq: ["$unitConvertDoc.coefficient", 'divide']},
                    then: "&nbsp;/&nbsp;"
                },
                {
                    case: {$eq: ["$unitConvertDoc.coefficient", 'multiply']},
                    then: "&nbsp;*&nbsp;"
                },
                {
                    case: {$eq: ["$unitConvertDoc.coefficient", 'addition']},
                    then: "&nbsp;+&nbsp;"
                },
                {
                    case: {$eq: ["$unitConvertDoc.coefficient", 'subtract']},
                    then: "&nbsp;-&nbsp;"
                },
            ],
            default: ''
        }
    }
}

function calculateOriginalQty() {
    return {
        $switch: {
            branches: [
                {
                    case: {$eq: ["$unitConvertDoc.coefficient", 'divide']},
                    then: {$multiply: ["$items.qty", "$unitConvertDoc.convertAmount"]}
                },
                {
                    case: {$eq: ["$unitConvertDoc.coefficient", 'multiply']},
                    then: {$divide: ["$items.qty", "$unitConvertDoc.convertAmount"]}
                },
                {
                    case: {$eq: ["$unitConvertDoc.coefficient", 'addition']},
                    then: {$subtract: ["$items.qty", "$unitConvertDoc.convertAmount"]}
                },
                {
                    case: {$eq: ["$unitConvertDoc.coefficient", 'subtract']},
                    then: {$add: ["$items.qty", "$unitConvertDoc.convertAmount"]}
                },
            ],
            default: '$items.qty'
        }
    }
}