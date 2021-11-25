<template>
  <!-- Page Content-->
  <div id="homepage" class="px-4 px-lg-5">
    <!-- Heading Row-->
    <!-- <div id="intro">
      <div class="row gx-4 gx-lg-5 align-items-center my-5">
        <div class="col-lg-7">
          <img
            class="img-fluid rounded mb-4 mb-lg-0"
            src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg"
          />
        </div>
        <div class="col-lg-5">
          <h1 class="font-weight-light">Học lập trình để làm gì?</h1>
          <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
          <a class="btn btn-primary" href="#">Get Started!</a>
        </div>
      </div>
    </div>-->
    <div id="content">
      <div class="d-grid gap-3 my-2 py-1">
        <div class="p-2 bg-purple text-center text-white rounded border">Khóa học mới</div>
      </div>
      <!-- Content Row-->
      <div class="row g-4">
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
      </div>

      <div class="d-grid gap-3 my-2 py-1">
        <div class="p-2 bg-purple text-center text-white rounded border">Bài viết mới</div>
      </div>
      <div class="row g-4">
        <div class="col-sm-3" v-for="item in blogs" :key="item.id">
          <nuxt-link :to="`/blog/view?id=${item.id}`">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  head() {
    return {
      title: "Trang chủ | Academy"
    };
  },
  data() {
    return {
      courses: [{
        id: null,
        lecturerId: null,
        categoryId: null,
        createAt: null,
        title: null,
        picturePath: null
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
    [this.courses, this.blogs] = await Promise.all([this.getCourses(), this.getBlogPosts()]);
  },
  methods: {
    async getBlogPosts(skip = 0, take = 8) {
      try {
        let result = await this.$axios.get(`/api/blog?skip=${skip}&take=${take}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCourses(skip = 0, take = 8) {
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
};
</script>

<style>
.image-crop {
  width: 365px;
  height: 150px;
  object-fit: cover;
}
.special-card {
  background: none;
}
</style>