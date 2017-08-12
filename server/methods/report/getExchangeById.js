import {Co_Exchange} from "../../../imports/collection/exchange"

Meteor.methods({
    getExchangeById(id){
        return Co_Exchange.findOne({_id: id});
    }

})