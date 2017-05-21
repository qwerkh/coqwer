export const Co_AccountType = new Meteor.Collection("co_accountType");
Co_AccountType.schema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    }
});

Meteor.startup(function () {
    Co_AccountType.attachSchema(Co_AccountType.schema);
})
