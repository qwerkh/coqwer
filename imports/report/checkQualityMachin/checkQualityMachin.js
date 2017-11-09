import CheckQualityMachin from '/imports/vue/ui/checkQualityMachin.vue';
import './checkQualityMachin.html';

let index = Template.co_checkQualityMachinReport;
index.onRendered(function () {
    new Vue({
        render: h => h(CheckQualityMachin),
    }).$mount('#co-checkQualityMachin-report')
});

index.onDestroyed(function () {
    $('.co-checkQualityMachin-report').remove();
});
