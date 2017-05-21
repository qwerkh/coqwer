/**
 * Created by snr on 5/14/17.
 */

import {Co_Company} from '../../imports/collection/company'

Meteor.methods({
    getCompany(){
        return Co_Company.findOne();
    }
})