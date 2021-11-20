<template>
  <div id="blogs">
    <div class="row py-4">
      <!-- Blog entries-->
      <div class="col-lg-8">
        <!-- Nested row for non-featured blog posts-->
        <div class="row g-4 mb-4">
          <div class="col-sm-3" v-for="item in blogs" :key="item.updatedAt">
            <nuxt-link :to="'/blog/view?id=' + item.id">
              <div class="card h-100">
                <img
                  :src="[ item.picturePath && item.picturePath !== '/' ? item.picturePath : 'https://dummyimage.com/460x260/f0e37d/0011ff' ]"
                  class="card-img-top"
                />
                <div class="card-body">
                  <h5 class="card-title card-name">{{ item.title }}</h5>
                  <p class="card-text"><TimeSince :date="item.updatedAt" /></p>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>

        <!-- Pagination-->
        <!-- <nav aria-label="Pagination">
          <hr class="my-0" />
          <ul class="pagination justify-content-center my-4">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Newer</a>
            </li>
            <li class="page-item active" aria-current="page">
              <a class="page-link" href="#!">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#!">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#!">3</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#!">...</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#!">15</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#!">Older</a>
            </li>
          </ul>
        </nav>-->
      </div>
      <!-- Side widgets-->
      <div class="col-lg-4">
        <!-- Search widget-->
        <div class="card mb-4">
          <div class="card-header">Tìm kiếm</div>
          <div class="card-body">
            <div class="input-group">
              <input
                class="form-control"
                type="text"
                placeholder="Bạn muốn tìm gì?"
                aria-label="Bạn muốn tìm gì?"
                aria-describedby="button-search"
              />
              <button class="btn btn-primary" id="button-search" type="button">
                <fa-icon icon="search" />
              </button>
            </div>
          </div>
        </div>
        <!-- Categories widget-->
        <div class="card mb-4">
          <div class="card-header">Blog theo danh mục</div>
          <div class="card-body">
            <ul class="row list-unstyled mb-0">
              <li class="col-lg-6" v-for="item in categories" :key="item.id">
                <a href="#!">{{ item.name }}</a>
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
  components: { TimeSince },
  data() {
    return {
      categories: [{
        id: 0,
        name: null
      }],
      blogs: [
        {
          id: 0,
          userId: 0,
          categoryId: 0,
          title: null,
          content: null,
          createAt: null,
          isDeleted: true,
          pictureId: 0,
          picturePath: 0
        }
      ]
    }
  },
  mounted: async function () {
    [this.blogs, this.categories] = await Promise.all([this.getBlogPosts(), this.getCategories()]);
  },
  methods: {
    async getBlogPosts() {
      try {
        let result = await this.$axios.get("/api/blog");
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