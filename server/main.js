import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (Meteor.users.find().count() <= 0) {
        let superId = Accounts.createUser({
            username: 'super',
            email: 'super@navi.com',
            password: 'superh2e',
            approved: true
        });
    }
});
