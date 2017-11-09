import VeeValidate from 'vee-validate';
import 'element-ui/lib/theme-default/index.css';
import ElementUI from 'element-ui/lib/index.js';
import locale from 'element-ui/lib/locale/lang/en'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import VueMask from 'v-mask'
import numeral from 'numeral';
import moment from 'moment';
// import VueBarcodeScanner from 'vue-barcode-scanner';

// Vue.use(VueBarcodeScanner);
Vue.use(VueMask);
Vue.use(CollapseTransition);
Vue.use(ElementUI, {locale});
Vue.use(VeeValidate);

Vue.filter('numFormat', (val) => {
    return numeral(val).format('(0,0.00)');
});

Vue.filter('numFormatRiel', (val) => {
    return numeral(val).format('0,0');
});

Vue.filter('tabFormat', (val) => {

    let char = '';
    let i = 1;
    let num=val *10;
    for (i = 1; i <= num; i++) {
        char += '\u00A0';
    }
    return char;
});


Vue.filter('momentFormat', (val) => {
    return moment(val).format('DD/MM/YYYY');
});