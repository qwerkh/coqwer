import RegisterService from '/imports/vue/ui/registerService.vue';
import './registerService.html';

let index = Template.co_registerServiceReport;
index.onRendered(function () {
    new Vue({
        render: h => h(RegisterService),
    }).$mount('#co-registerService-report')
});

index.onDestroyed(function () {
    $('.co-registerService-report').remove();
});
