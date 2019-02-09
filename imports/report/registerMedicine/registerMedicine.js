import RegisterMedicine from '/imports/vue/ui/registerMedicine.vue';
import './registerMedicine.html';

let index = Template.co_registerMedicineReport;
index.onRendered(function () {
    new Vue({
        render: h => h(RegisterMedicine),
    }).$mount('#co-registerMedicine-report')
});

index.onDestroyed(function () {
    $('.co-registerMedicine-report').remove();
});
