import Vue from 'vue';
import editor from '@tinymce/tinymce-vue'

/* Import TinyMCE */
import 'tinymce/tinymce';
/* Default icons are required for TinyMCE 5.3 or above */
import 'tinymce/icons/default';

/* A theme is also required */
import 'tinymce/themes/silver';
import 'tinymce/skins/ui/oxide/skin.min.css';

/* Import plugins */
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
// import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
// import 'tinymce/plugins/emoticons';
// import 'tinymce/plugins/emoticons/js/emojis';
// import 'tinymce/plugins/searchreplace';
// import 'tinymce/plugins/visualblocks';
// import 'tinymce/plugins/fullscreen';
// import 'tinymce/plugins/insertdatetime';
// import 'tinymce/plugins/media';
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/help';
// import 'tinymce/plugins/wordcount';

if (process.browser) {
    Vue.component("tinymce", editor)
}