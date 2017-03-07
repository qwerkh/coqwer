export const CheckRoles = ({roles}) => {
    let currentUser = Meteor.user();
    if(currentUser && currentUser.username == 'super') {
        return Roles.userIsInRole(currentUser._id, roles);
    }
    if(currentUser) {
        return Roles.userIsInRole(currentUser._id, roles, 'co');
    }
};