import './importFile.html';
import ImportFile from '/imports/vue/ui/ImportFile';

let indexTmpl = Template.importTest;
indexTmpl.onRendered(function () {
    new Vue({
        render: h => h(ImportFile)
    }).$mount('importTest');
});

indexTmpl.onDestroyed(function () {
    $('.importTest').remove();
});

