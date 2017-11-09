import UnPaidByCustomer from '/imports/vue/ui/unpaidByCustomer.vue';
import './unpaidByCustomer.html';
let index = Template.co_unpaidByCustomerReport;
index.onRendered(function () {
    new Vue({
        render: h => h(UnPaidByCustomer),
    }).$mount('#co-unpaidByCustomer-report')
});

index.onDestroyed(function () {
    $('.co-unpaidByCustomer-report').remove();
});
