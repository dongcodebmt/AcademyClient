<template>
  <div id="questions">
    <div class="row py-4">
      <!-- Questions entries-->
      <div class="col-lg-8">
        <!-- Nested row for non-featured question posts-->
        <div class="card mb-3" v-for="item in questions" :key="item.updatedAt" >
          <nuxt-link :to="`/question/view?id=${item.id}`">
            <div class="row g-0">
              <div class="col-md-12">
                <div class="card-body">
                  <h5 class="card-title">{{ item.title }}</h5>
                  <p class="card-text" v-html="item.content">...</p>
                  <p class="card-text">
                    <small class="text-muted">
                      <TimeSince :date="item.updatedAt" />
                    </small>
                  </p>
                </div>
              </div>
              <!-- <div class="col-md-3">
                <img
                  :src="[ item.picturePath && item.picturePath !== '/' ? item.picturePath : require('@/assets/img/empty.png') ]"
                  class="rounded-end img-fluid"
                />
              </div> -->
            </div>
          </nuxt-link>
        </div>
        <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
      </div>
      <!-- Side widgets-->
      <div class="col-lg-4">
        <!-- Categories widget-->
        <div class="card mb-4">
          <div class="card-header">Hỏi đáp theo danh mục</div>
          <div class="card-body">
            <ul class="row list-unstyled mb-0">
              <li class="col-lg-6" :class="{'text-danger': isActive(item.id)}" v-for="item in categories" :key="item.id">
                <a v-on:click="selectCategory(item.id)">{{ item.name }}</a>
              </li>
              <li class="col-lg-6" :class="{'text-danger': isActive(0)}">
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
      title: "Câu hỏi | Academy"
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
      questions: []
    }
  },
  mounted: async function () {
    this.categories = await this.getCategories();
  },
  methods: {
    isActive(id) {
      if (id === this.selected) {
        return true;
      }
      return false;
    },
    async selectCategory(id) {
      this.selected = id;
      this.page = 0;
      this.questions = [];
      this.infiniteId += 1;
    },
    async infiniteHandler($state) {
      let data = await this.getQuestions(this.page * 10, 10, this.selected);
      if (data.length > 0) {
        this.page += 1;
        this.questions.push(...data);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async getQuestions(skip = 0, take = 10, categoryId = 0) {
      try {
        let result = await this.$axios.get(`/api/question?skip=${skip}&take=${take}&categoryId=${categoryId}`);
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