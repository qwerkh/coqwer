import './dashboard.html';
import dashboard from '/imports/vue/ui/dashboard';

let indexTmpl = Template.dashboard;
indexTmpl.onRendered(function () {
    new Vue({
        render: h => h(dashboard)
    }).$mount('dashboard');
});

indexTmpl.onDestroyed(function () {
    $('.dashboard').remove();
});

