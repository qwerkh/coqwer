
export const Co_ServiceType = new Meteor.Collection("co_serviceType");

Co_ServiceType.schema = new SimpleSchema({
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
    Co_ServiceType.attachSchema(Co_ServiceType.schema);
})
