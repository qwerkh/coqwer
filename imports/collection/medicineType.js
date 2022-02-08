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
                list.push({label: "ថ្នាំរឹត", value: "ថ្នាំរឹត"});
                list.push({label: "ថ្នាំទឹក", value: "ថ្នាំទឹក"});
                list.push({label: "ថ្នាំបន្តោង", value: "ថ្នាំបន្តោង"});
                list.push({label: "ថ្នាំបន្តក់", value: "ថ្នាំបន្តក់"});
                list.push({label: "សាប៊ូ", value: "សាប៊ូ"});
                list.push({label: "Gel បិទ", value: "Gel បិទ"});
                list.push({label: "Gel ស្អំ", value: "Gel ស្អំ"});
                list.push({label: "Mask", value: "Mask"});
                list.push({label: "Serum", value: "Serum"});
                list.push({label: "UV", value: "UV"});
                list.push({label: "Other", value: "Other"});

                return list;

            }
        }
    }

})

Meteor.startup(function () {
    Co_MedicineType.attachSchema(Co_MedicineType.schema);
})
