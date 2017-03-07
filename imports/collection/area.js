export const areaSchema = new SimpleSchema({
    rolesBranch: {
        type: String,
        autoform: {
            type: 'select'
        }
    },
    rolesArea: {
        type: String,
        autoform: {
            type: 'select'
        }
    }
});