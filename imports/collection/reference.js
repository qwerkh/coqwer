export const Co_Reference = new Meteor.Collection("co_reference");

Co_Reference.schema = new SimpleSchema({
    name: {
        type: String
    },
    type: {
        type: String,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    order: {
        type: Number,
        optional: true
    },
    rolesArea: {
        type: String,
        optional: true
    }

})

Meteor.startup(function () {
    Co_Reference.attachSchema(Co_Reference.schema);
})
