<template>
  <div id="search">
    <div class="row d-flex justify-content-center py-4">
      <div class="col-lg-8" v-if="!query || query.length < 5">
        <div class="card border-0 shadow mb-4">
          <div class="card-body d-flex justify-content-center">
            <h5 class="card-title">Vui lòng nhập gì đó lớn hơn 5 ký tự!</h5>
          </div>
        </div>
      </div>

      <div class="col-lg-8" else>
        <div class="card mb-3" v-for="item in search" :key="item.key">
          <nuxt-link :to="getLink(item.type, item.id)">
            <div class="row g-0">
              <div :class="{ 'col-md-9': item.picturePath, 'col-md-12': !item.picturePath }">
                <div class="card-body">
                  <h5 class="card-title">{{ item.title }}</h5>
                  <p class="card-text" v-html="item.description">...</p>
                </div>
              </div>
              <div class="col-md-3" v-if="item.picturePath">
                <img
                  :src="[ item.picturePath && item.picturePath !== '/' ? item.picturePath : require('@/assets/img/empty.png') ]"
                  class="rounded-end img-fluid"
                />
              </div>
            </div>
          </nuxt-link>
        </div>
        <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  head() {
    return {
      title: "Tìm kiếm | Academy"
    };
  },
  data() {
    return {
      query: this.$route.query.query,
      page: 0,
      infiniteId: +new Date(),
      search: []
    }
  },
  methods: {
    async infiniteHandler($state) {
      let data = await this.searchQuery(this.query, this.page);
      if (data.length > 0) {
        this.page += 1;
        this.search.push(...data);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    getLink(type, id) {
      let link = "/";
      if (type === "course") {
        link = "/course/course?id=" + id;
      } else if (type === "blog") {
        link = "/blog/view?id=" + id;
      } else {
        link = "/question/view?id=" + id;
      }
      return link;
    },
    async searchQuery(query, page) {
      try {
        let result = await this.$axios.get(`/api/search/${query}?page=${page}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    refreshInfiniteLoading() {
      this.page = 0;
      this.search = [];
      this.infiniteId += 1;
    },
  },
  watch: {
    $route(to, from) {
      if (this.$route.query.query) {
        this.query = this.$route.query.query;
        this.refreshInfiniteLoading();
      }
    }
  },
}
</script>