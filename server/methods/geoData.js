import {Meteor} from 'meteor/meteor';

Meteor.methods({
    fetchProvinces(){
        let list = [];
        let provinces = JSON.parse(Assets.getText('geoData/province.json'));
        provinces.forEach(function (province) {
            list.push({label: `${province.properties.NAME1}`, value: `${province.properties.ADMIN_ID1}`});
        });
        return list;
    },
    fetchDistricts(adminId1){
        let list = [];
        let districts = JSON.parse(Assets.getText('geoData/district.json'));
        districts.map(function (o) {
            if (o.properties.ADMIN_ID1 == adminId1) {
                list.push({label: `${o.properties.NAME2}`, value: `${o.properties.ADMIN_ID2}`});
            }
        });
        return list;
    },
    fetchCommunes(adminId2){
        let list = [];
        let communes = JSON.parse(Assets.getText('geoData/commune.json'));
        communes.map(function (o) {
            if (o.properties.ADMIN_ID2 == adminId2) {
                list.push({label: `${o.properties.NAME3}`, value: `${o.properties.ADMIN_ID3}`});
            }
        });
        return list;
    },
    fetchVillages(adminId3){
        let list = [];
        let communes = JSON.parse(Assets.getText('geoData/village.json'));
        communes.map(function (o) {
            if (o.properties.ADMIN_ID3 == adminId3) {
                list.push({label: `${o.properties.NAME}`, value: `${o.properties.ADMIN_ID}`});
            }
        });
        return list;
    },
    fetchRolesBranch(userId){
        let list = [];
        if (Meteor.userId()) {
            let provinces = JSON.parse(Assets.getText('geoData/province.json'));
            let currentUser = Meteor.users.findOne(userId);
            if (!userId || currentUser && currentUser.username == 'super') {
                provinces.forEach(function (province) {
                    list.push({label: `${province.properties.NAME1}`, value: `${province.properties.ADMIN_ID1}`});
                });
            } else {
                if (currentUser) {
                    let province = provinces.find(o => o.properties.ADMIN_ID1 == currentUser.rolesBranch);
                    if (province) {
                        list.push({label: `${province.properties.NAME1}`, value: `${province.properties.ADMIN_ID1}`});
                    }
                }
            }
        }
        return list;
    },
    fetchRolesArea(userId, adminId1){
        let list = [];
        if (Meteor.userId()) {
            let districts = JSON.parse(Assets.getText('geoData/district.json'));
            let currentUser = Meteor.users.findOne(userId);
            if (!userId || currentUser && currentUser.username == 'super') {
                districts.map(function (o) {
                    if (adminId1) {
                        if (o.properties.ADMIN_ID1 == adminId1) {
                            list.push({label: `${o.properties.NAME2}`, value: `${o.properties.ADMIN_ID2}`});
                        }
                    }
                });
            } else {
                let geoDistrict = currentUser.rolesArea;
                geoDistrict.forEach(function (elem) {
                    let geoDistrictObj = districts.find(o => o.properties.ADMIN_ID2 == elem);
                    if (geoDistrictObj) {
                        list.push({
                            label: `${geoDistrictObj.properties.NAME2}`,
                            value: `${geoDistrictObj.properties.ADMIN_ID2}`
                        });
                    }
                });
            }

        }
        return list;
    },
    fetchRolesAreaByMultiRoleBranch(userId, adminId1){
        let list = [];
        if (Meteor.userId()) {
            let districts = JSON.parse(Assets.getText('geoData/district.json'));
            let currentUser = Meteor.users.findOne(userId);
            if (!userId || currentUser && (currentUser.username == 'super' || currentUser.username == "own-admin"  )) {
                districts.map(function (o) {
                    if (adminId1) {
                        if (adminId1.indexOf(o.properties.ADMIN_ID1) > -1) {
                            list.push({label: `${o.properties.NAME2}`, value: `${o.properties.ADMIN_ID2}`});
                        }
                    }
                });
            } else {
                let geoDistrict = currentUser.rolesArea;
                geoDistrict.forEach(function (elem) {
                    let geoDistrictObj = districts.find(o => o.properties.ADMIN_ID2 == elem);
                    if (geoDistrictObj && adminId1.indexOf(geoDistrictObj.properties.ADMIN_ID1) > -1) {
                        list.push({
                            label: `${geoDistrictObj.properties.NAME2}`,
                            value: `${geoDistrictObj.properties.ADMIN_ID2}`
                        });
                    }
                });
            }
        }
        return list;
    },
    findDistrict(id){
        let districts = JSON.parse(Assets.getText('geoData/district.json'));
        let districtObj = districts.find(x => x.properties.ADMIN_ID2 == id);
        return districtObj ? districtObj.properties.NAME2 : '';
    }
});