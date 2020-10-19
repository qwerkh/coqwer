import './co_patientCode.html';
import patientCode from '/imports/vue/ui/co_patientCode';

let indexTmpl = Template.co_patientCode;
indexTmpl.onRendered(function () {
    new Vue({
        render: h => h(patientCode)
    }).$mount('co_patientCode');
});

indexTmpl.onDestroyed(function () {
    $('.co_patientCode').remove();
});

