import ProfitLost from '/imports/vue/ui/profitLost.vue';
import './profitLost.html';
let index = Template.co_profitLostReport;
index.onRendered(function () {
    new Vue({
        render: h => h(ProfitLost),
    }).$mount('#co-profitLost-report')
});

index.onDestroyed(function () {
    $('.co-profitLost-report').remove();
});
