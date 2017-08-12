/**
 * Created by snr on 8/7/17.
 */
import {areaSchema}  from "../../../imports/collection/area"

Meteor.methods({
    getBranchHeader(param){
        let branchList = "";
        let districts = JSON.parse(Assets.getText('geoData/district.json'));
        let i = 0;
        districts.map(function (o) {
            if (param.indexOf(o.properties.ADMIN_ID2) > -1) {
                if (i > 0) {
                    branchList += " , ";
                }
                branchList += o.properties.NAME2;
            }

        });

        return branchList;
    }
})