import WeightTestReport from '/imports/vue/ui/weightTestReport';
import './weightTest.html';
let index = Template.co_weightTestReport;
index.onRendered(function () {
    new Vue({
        render: h => h(WeightTestReport),
    }).$mount('#co-weightTest-report')
});

index.onDestroyed(function () {
    $('.co-weightTest-report').remove();
});
