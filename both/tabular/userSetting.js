import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
Meteor.isClient && require('../../imports/ui/user/userSetting.html');
export const UserSettingTabular = new Tabular.Table({
    name: "co.userSettingTabular",
    collection: Meteor.users,
    responsive: true,
    columns: [
        {data: "username", title: "Username"},
        {
            data: "emails",
            title: "Email",
            render: function (val) {
                return val && val[0].address;
            }
        },
        {
            data: "profile.approved",
            title: "Approved",
            render: function (val) {
                if (val) {
                    return `<span class="chip teal white-text">${val}</span>`
                }
                return `<span class="chip light-green accent-3 white-text">${val}</span>`
            }
        },
        // {data: "copies", title: "Copies Available"},
        // {
        //     data: "lastCheckedOut",
        //     title: "Last Checkout",
        //     render: function (val, type, doc) {
        //         if (val instanceof Date) {
        //             return moment(val).calendar();
        //         } else {
        //             return "Never";
        //         }
        //     }
        // },
        {data: "summary", title: "Summary"},
        // {
        //     tmpl: Meteor.isClient && Template.co_action
        // },
        {
            extraFields: ["email"]
        }
    ]
});