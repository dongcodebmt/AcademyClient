<template>
  <div id="courses">
    <div class="list py-4">
      <div class="row">
        <div class="col-sm-3" v-for="item in courses" :key="item.id">
          <nuxt-link :to="`/course/course?id=${item.id}`">
            <div class="card special-card border-0 h-100">
              <img
                :src="[ item.picturePath && item.picturePath !== '/' ? item.picturePath : require('@/assets/img/empty.png') ]"
                class="card-img-top rounded-3 image-crop"
              />
              <div class="card-body">
                <h6 class="card-title card-name">{{ item.title }}</h6>
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
      title: "Khóa học | Academy"
    };
  },
  data() {
    return {
      page: 0,
      infiniteId: +new Date(),
      courses: []
    }
  },
  mounted: async function () {
    // this.courses = await this.getCourses();
  },
  methods: {
    async infiniteHandler($state) {
      let data = await this.getCourses(this.page * 10);
      if (data.length > 0) {
        this.page += 1;
        this.courses.push(...data);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async getCourses(skip = 0, take = 10) {
      try {
        let courses = await this.$axios.get(`/api/course?skip=${skip}&take=${take}`);
        if (courses.status === 200) {
          return courses.data;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>