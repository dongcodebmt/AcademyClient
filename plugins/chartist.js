import Vue from 'vue';
import chartist from 'vue-chartist';

import 'chartist/dist/chartist.min.css';

if (process.browser) {
    Vue.use(chartist);
}