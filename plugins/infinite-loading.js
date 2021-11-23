import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, {
  slots: {
    noMore: 'Bạn đang ở cuối trang'
  },
});