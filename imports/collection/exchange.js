export const Co_Exchange = new Mongo.Collection("co_exchange");

let Rates = new SimpleSchema({
    USD: {
        type: Number,
        defaultValue: 1,
        /*label: function () {
         return TAPi18n.__('core.exchange.usdLbl');
         },*/
        decimal: true,
        min: 0.000000001,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency({digits: 9});
            }
        }
    },
    KHR: {
        type: Number,
        /*label: function () {
         return TAPi18n.__('core.exchange.khrLbl');
         },*/
        decimal: true,
        min: 0.000000001,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency({prefix: '៛', digits: 9});
            }
        }
    },

    THB: {
        type: Number,
        /*label: function () {
         return TAPi18n.__('core.exchange.thbLbl');
         },*/
        decimal: true,
        min: 0.000000001,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency({prefix: 'B', digits: 9});
            }
        }
    }
});

Co_Exchange.schema = new SimpleSchema({
    exDate: {
        type: Date,
        /*label: function () {
         return TAPi18n.__('core.exchange.dateLbl');
         },*/
        unique: true,
        defaultValue: moment().toDate(),
        autoform: {
            afFieldInput: {
                type: "pickadate",
                pickadateOptions: {
                    // selectMonths: true, // Creates a dropdown to control month
                    selectYears: 170 // Creates a dropdown of 15 years to control year
                }
            }
        }
    },
    base: {
        type: String,
        defaultValue: "USD"
        /*label: function () {
         return TAPi18n.__('core.exchange.baseCurrencyLbl');
         }*/
    },
    rates: {
        type: Rates,
        /*label: function () {
         return TAPi18n.__('core.exchange.ratesLbl');
         }*/
    },
    rolesArea: {
        type: String,
        optional: true
    },
    status: {
        type: Boolean,
        label: "Status",
        defaultValue: false,
    }
});

Co_Exchange.attachSchema(Co_Exchange.schema);
