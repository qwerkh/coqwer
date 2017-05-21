
export const Co_MachinType = new Meteor.Collection("co_machinType");

Co_MachinType.schema = new SimpleSchema({
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
    Co_MachinType.attachSchema(Co_MachinType.schema);
})
