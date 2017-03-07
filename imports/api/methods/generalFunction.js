export class GeneralFunction {
    static generateId(collection, length, field) {
        field = field ? field : '_id';
        let newId = pad(1, length);
        let sortBy = {};
        sortBy[field] = -1;
        let obj = collection.findOne({}, {sort: sortBy});
        if (obj != null) {
            let tmpId = parseInt(obj[field]) + 1;
            // Check length
            if (tmpId.toString().length > length) {
                throw new Meteor.Error('Invalid Id length');
            } else {
                newId = pad(tmpId, length);
            }
        }
        return newId;
    }

    static generatePrefixId(collection, prefix, length, field) {
        field = field ? field : '_id';
        let newId = prefix + pad(1, length);
        let reg = {};
        reg[field] = new RegExp("^" + prefix, "m");
        let sortBy = {};
        sortBy[field] = -1;

        let obj = collection.findOne(reg, {sort: sortBy});

        if (obj != null) {
            let currentId = (obj[field]).substr((obj[field]).length-length);
            let tmpId = parseInt(currentId) + 1;
            // Check length
            if (tmpId.toString().length > length) {
                throw new Meteor.Error('Invalid Id length');
            } else {
                tmpId = pad(tmpId, length);
                newId = prefix + tmpId;
            }
        }

        return newId;
    }
}

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}