<template>
  <div id="blogs">
    <div class="row py-4">
      <!-- Blog entries-->
      <div class="col-lg-8">
        <!-- Nested row for non-featured blog posts-->
        <div class="card mb-3" v-for="item in blogs" :key="item.id" >
          <nuxt-link :to="'/blog/view?id=' + item.id">
            <div class="row g-0">
              <div class="col-md-9">
                <div class="card-body">
                  <h5 class="card-title">{{ item.title }}</h5>
                  <p class="card-text">{{ item.content }}...</p>
                  <p class="card-text">
                    <small class="text-muted">
                      <TimeSince :date="item.updatedAt" />
                    </small>
                  </p>
                </div>
              </div>
              <div class="col-md-3">
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
      <!-- Side widgets-->
      <div class="col-lg-4">
        <!-- Categories widget-->
        <div class="card mb-4">
          <div class="card-header">Blog theo danh mục</div>
          <div class="card-body">
            <ul class="row list-unstyled mb-0">
              <li class="col-lg-6" v-for="item in categories" :key="item.id">
                <a v-on:click="selectCategory(item.id)">{{ item.name }}</a>
              </li>
              <li class="col-lg-6">
                <a v-on:click="selectCategory(0)">Tất cả</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeSince from "~/components/TimeSince.vue";

export default {
  auth: false,
  head() {
    return {
      title: "Blog | Academy"
    };
  },
  components: { TimeSince },
  data() {
    return {
      page: 0,
      infiniteId: +new Date(),
      categories: [{
        id: 0,
        name: null
      }],
      selected: 0,
      blogs: []
    }
  },
  mounted: async function () {
    this.categories = await this.getCategories();
  },
  methods: {
    async selectCategory(id) {
      this.selected = id;
      this.page = 0;
      this.blogs = [];
      this.infiniteId += 1;
    },
    async infiniteHandler($state) {
      let data = await this.getBlogPosts(this.page * 10, 10, this.selected);
      if (data.length > 0) {
        this.page += 1;
        this.blogs.push(...data);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async getBlogPosts(skip = 0, take = 10, categoryId = 0) {
      try {
        let result = await this.$axios.get(`/api/blog?skip=${skip}&take=${take}&categoryId=${categoryId}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCategories() {
      try {
        let result = await this.$axios.get("/api/category");
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>