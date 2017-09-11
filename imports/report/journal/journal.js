import Journal from '/imports/vue/ui/journal.vue';
import './journal.html';
let index = Template.co_journalReport;
index.onRendered(function () {
    new Vue({
        render: h => h(Journal),
    }).$mount('#co-journal-report')
});

index.onDestroyed(function () {
    $('.co-register-report').remove();
});
