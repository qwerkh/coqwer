import './uploadPatientImage.html';
import PatientImage from '/imports/vue/ui/patientImage';

let indexTmpl = Template.uploadPatientImage;
indexTmpl.onRendered(function () {
    new Vue({
        render: h => h(PatientImage)
    }).$mount('uploadPatientImage');
});

indexTmpl.onDestroyed(function () {
    $('.uploadPatientImage').remove();
});

