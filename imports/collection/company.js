export const Co_Company = new Meteor.Collection("co_company");

Co_Company.schema = new SimpleSchema({
    khName: {
        type: String,
        /* label: __('core.company.khNameLbl'),*/
        max: 200
    },
    khShortName: {
        type: String,
        /*label: __('core.company.khShortNameLbl'),*/
        max: 200
    },
    enName: {
        type: String,
        /*label: __('core.company.enNameLbl'),*/
        max: 200
    },
    enShortName: {
        type: String,
        /*label: __('core.company.enShortNameLbl'),*/
        max: 200
    },
    khAddress: {
        type: String,
        /*label: __('core.company.khAddressLbl'),*/
        max: 500
    },
    enAddress: {
        type: String,
        /*label: __('core.company.enAddressLbl'),*/
        max: 500
    },
    telephone: {
        type: String,
        /*label: __('core.company.telephoneLbl'),*/
        max: 100
    },
    email: {
        type: String,
        /*label: __('core.company.emailLbl'),*/
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    website: {
        type: String,
        /*label: __('core.company.websiteLbl'),*/
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    baseCurrency: {
        type: String,
        /*label: __('core.setting.baseCurrencyLbl'),*/
        autoform: {
            type: "select-radio-inline",
            options: function () {
                let list = [
                    {label: "USD", value: "USD"},
                    {label: "KHR", value: "KHR"},
                    {label: "THB", value: "THB"},
                ]
                return list;
            }
        }
    },
    language: {
        type: String,
        /*label: __('core.setting.languageLbl'),*/
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: 'En', value: 'en'},
                    {label: 'Km', value: 'km'}
                ];
            }
        }
    },
    asigneUser: {
        type: [String],
        label: "Assign User",

        optional: true,
        autoform: {
            type: "select",
            // multiple: true
        }
    },
    jan: {
        type: Number,
        label: "January (%)",
        decimal: true,
        max: 99
    },
    feb: {
        type: Number,
        label: "February (%)",
        decimal: true,
        max: 99
    },
    mar: {
        type: Number,
        label: "March (%)",
        decimal: true,
        max: 99
    },
    apr: {
        type: Number,
        label: "April (%)",
        decimal: true,
        max: 99
    },
    may: {
        type: Number,
        label: "May (%)",
        decimal: true,
        max: 99
    },
    jun: {
        type: Number,
        label: "June (%)",
        decimal: true,
        max: 99
    },
    jul: {
        type: Number,
        label: "July (%)",
        decimal: true,
        max: 99
    },
    aug: {
        type: Number,
        label: "August (%)",
        decimal: true,
        max: 99
    },
    sep: {
        type: Number,
        label: "September (%)",
        decimal: true,
        max: 99
    },
    oct: {
        type: Number,
        label: "October (%)",
        decimal: true,
        max: 99
    },
    nov: {
        type: Number,
        label: "November (%)",
        decimal: true,
        max: 99
    },

    dec: {
        type: Number,
        label: "December (%)",
        decimal: true,
        max: 99
    }

})

Meteor.startup(function () {
    Co_Company.attachSchema(Co_Company.schema);
})
