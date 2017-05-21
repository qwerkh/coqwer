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
    }


})

Meteor.startup(function () {
    Co_Company.attachSchema(Co_Company.schema);
})
