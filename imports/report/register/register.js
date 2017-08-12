import Register from '/imports/vue/ui/register.vue';
import './register.html';
let index = Template.co_registerReport;
index.onRendered(function () {
    new Vue({
        render: h => h(Register),
    }).$mount('#co-register-report')
});

index.onDestroyed(function () {
    $('.co-register-report').remove();
});
