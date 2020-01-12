import MedicineBarcode from '/imports/vue/ui/medicineBarcode.vue';
import './medicineBarcode.html';
let index = Template.co_medicineBarcodeReport;
index.onRendered(function () {
    new Vue({
        render: h => h(MedicineBarcode),
    }).$mount('#co-medicineBarcode-report')
});

index.onDestroyed(function () {
    $('.co-medicineBarcode-report').remove();
});
