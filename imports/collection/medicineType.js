export const Co_MedicineType = new Meteor.Collection("co_medicineType");

Co_MedicineType.schema = new SimpleSchema({
    name: {
        type: String
    },
    description: {
        type: String,
        optional: true
    },
    rolesArea: {
        type: String,
        optional: true
    },
    type: {
        type: String,
        label: "Type",
        autoform: {
            type: "select",
            options: function () {
                let list = [];
                list.push({label: "ថ្នាំលេប", value: "ថ្នាំលេប"});
                list.push({label: "ថ្នាំចាក់", value: "ថ្នាំចាក់"});
                list.push({label: "ថ្នាំផឹក", value: "ថ្នាំផឹក"});
                list.push({label: "ថ្នាំលាប", value: "ថ្នាំលាប"});

                return list;

            }
        }
    }

})

Meteor.startup(function () {
    Co_MedicineType.attachSchema(Co_MedicineType.schema);
})
