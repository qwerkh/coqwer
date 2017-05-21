export const Co_ChartAccount = new Meteor.Collection("co_chartAccount");
Co_ChartAccount.schema = new SimpleSchema({
    code: {
        type: String,
        label: "Code",
        unique: true,
        max: 7
    },
    name: {
        type: String,
        label: "Name"
    },
    parentId: {
        type: String,
        label: "Parent",
        optional: true,
        autoform: {
            type: "select"
        }
    },
    parentName: {
        type: String,
        label: "Parent",
        optional: true
    },
    accountTypeId: {
        type: String,
        label: "Account Type",
        autoform: {
            type: "select"
        }
    },
    accountTypeName: {
        type: String,
        label: "Account Type",
        optional: true
    },
    level: {
        type: Number,
        defaultValue: 0
    },
    paymentReceiveType: {
        type: String,
        label: "Payment/Receive Type",
        autoform: {
            type: "select-radio-inline",
            defaultValue: "Payment/Receive",
            options: function () {
                let arr = [];
                arr.push({value: "Payment/Receive", label: "Payment/Receive"});
                arr.push({value: "Normal", label: "Normal"});

                return arr;
            }
        }
    },
    paymentReceiveName: {
        type: String,
        label: "Payment/Receive Name",
        optional: true
    }
});

Meteor.startup(function () {
    Co_ChartAccount.attachSchema(Co_ChartAccount.schema);
})
