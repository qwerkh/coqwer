import ReceivePayment from '/imports/vue/ui/receivePayment.vue';
import './receivePayment.html';
let index = Template.co_receivePaymentReport;
index.onRendered(function () {
    new Vue({
        render: h => h(ReceivePayment),
    }).$mount('#co-receivePayment-report')
});

index.onDestroyed(function () {
    $('.co-receivePayment-report').remove();
});
