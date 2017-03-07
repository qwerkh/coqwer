Accounts.onCreateUser((options, user) => {
    if (user) {
        if (!user.username) {
            user.username = user.emails && user.emails[0].address.split('@')[0]
        }
        if (options.profile) {
            user.profile = {};
            user.profile.status = options.profile.status;
            user.profile.approved = options.profile.approved;
            user.areaId = options.profile.areaId;
            user.rolesBranch = options.rolesBranch;
            user.rolesArea = options.rolesArea;
            Roles.addUsersToRoles(user._id, options.profile.roles, options.profile.areaId)
        }
        if (_.isUndefined(user.profile)) {
            user.profile = {
                tags: [],
                interest: {
                    category: []
                },
                interestPick: true
            };
            if (user.username == 'super') {
                user.profile.approved = true;
                user.profile.status = 'enable';
                user.roles = ['super'];
                user.areaId = 'super';
                Roles.addUsersToRoles(user._id, ['super'], 'super');
            } else {
                user.profile.approved = false;
                user.profile.status = 'enable';
                user.roles = []
            }
        } else {
            user.profile.status = 'enable';
        }
        if (user.services.facebook) {
            let fb = user.services.facebook;
            user.profile.username = `${fb.last_name} ${fb.first_name}`
        } else {
            var splitEmail = user.emails[0].address.split('@');
            user.profile.username = `${splitEmail[0]}`
        }
        return user
    }
});
