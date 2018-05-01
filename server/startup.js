import {Meteor} from 'meteor/meteor';

import {Co_Company} from '../imports/collection/company';
import {Co_Reference} from '../imports/collection/reference';
import {Co_AccountType} from '../imports/collection/accountType';

Meteor.startup(function () {
    if (Co_Company.find().count() == 0) {
        const data = {
            khName: 'ណាវី',
            khShortName: 'ណាវ',
            enName: 'Navi',
            enShortName: 'NV',
            khAddress: 'ភូមិរំចេក ៤ សង្កាត់រតនៈ ក្រុងបាត់ដំបង ខេត្តបាត់ដំបង',
            enAddress: 'Romchek 4 Village, Sangkat Rottanak, Krong Battamang, Battambang Province',
            telephone: '098486398',
            email: '',
            website: '',
            baseCurrency: "USD",
            language: "en",
            jan: 50,
            feb: 50,
            mar: 50,
            apr: 50,
            may: 50,
            jun: 50,
            jul: 50,
            aug: 50,
            sep: 50,
            oct: 50,
            nov: 50,
            dec: 50
        };
        Co_Company.insert(data);
    }

    if (Co_Reference.find().count() == 0) {
        let dataReference = [
            {name: "Amount", type: "Discount", order: 1},
            {name: "Percent", type: "Discount", order: 2}
        ];
        dataReference.forEach(function (obj) {
            Co_Reference.insert(obj);
        })
    }

    if (Co_AccountType.find().count() == 0) {
        Co_AccountType.insert(
            {
                _id: '10',
                name: 'Current Asset'
            }
        );
        Co_AccountType.insert(
            {
                _id: '20',
                name: 'Fixed Asset'
            }
        );
        Co_AccountType.insert(
            {
                _id: '21',
                name: 'Other Asset'
            }
        );
        Co_AccountType.insert(
            {
                _id: '30',
                name: 'Current Liability'
            }
        );
        Co_AccountType.insert(
            {
                _id: '31',
                name: 'Long Term Liability'
            }
        );
        Co_AccountType.insert(
            {
                _id: '40',
                name: 'Equity'
            }
        );
        Co_AccountType.insert(
            {
                _id: '50',
                name: 'Income'
            }
        );
        Co_AccountType.insert(
            {
                _id: '51',
                name: 'Other Income'
            }
        );
        Co_AccountType.insert(
            {
                _id: '60',
                name: 'Expense'
            }
        );
        Co_AccountType.insert(
            {
                _id: '61',
                name: 'Other Expense'
            }
        );
        Co_AccountType.insert(
            {
                _id: '70',
                name: 'Cost Of Good Sold'
            }
        );

    }
});