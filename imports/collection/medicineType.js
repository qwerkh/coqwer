
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
    }

})

Meteor.startup(function () {
    Co_MedicineType.attachSchema(Co_MedicineType.schema);
})
