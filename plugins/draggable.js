import Vue from 'vue';
import draggable from 'vuedraggable';

if (process.browser) {
    Vue.component("draggable", draggable)
}