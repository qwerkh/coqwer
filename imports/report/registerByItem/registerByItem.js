import RegisterByItem from '/imports/vue/ui/registerByItem.vue';
import './registerByItem.html';

let index = Template.co_registerByItemReport;
index.onRendered(function () {
    new Vue({
        render: h => h(RegisterByItem),
    }).$mount('#co-registerByItem-report')
});

index.onDestroyed(function () {
    $('.co-registerByItem-report').remove();
});
