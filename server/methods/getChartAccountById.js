/**
 * Created by snr on 5/14/17.
 */

import {Co_ChartAccount} from '../../imports/collection/chartAccount'

Meteor.methods({
    getChartAccountById(id){
        return Co_ChartAccount.findOne({_id: id});
    }
})