import './image';

export const Co_Counter = new Meteor.Collection("co_counter");

Co_Counter.schema = new SimpleSchema({
    type: {
        type: String
    },
    groupType: {
        type: String
    },
    count: {
        type: Number
    },
    createdAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return moment().toDate();
            }
        }
    },
    createdUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    updatedUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    },
    rolesArea: {
        type: String,
        optional: true
    }

})

Meteor.startup(function () {
    Co_Counter.attachSchema(Co_Counter.schema);
})
