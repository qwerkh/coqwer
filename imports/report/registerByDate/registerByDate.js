import RegisterByDate from '/imports/vue/ui/registerByDate.vue';
import './registerByDate.html';
let index = Template.co_registerByDateReport;
index.onRendered(function () {
    new Vue({
        render: h => h(RegisterByDate),
    }).$mount('#co-registerByDate-report')
});

index.onDestroyed(function () {
    $('.co-registerByDate-report').remove();
});
