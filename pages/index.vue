<template>
  <!-- Page Content-->
  <div id="homepage" class="px-4 px-lg-5">
    <!-- Heading Row-->
    <div id="intro">
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
    </div>
    <div id="content">
      <div class="d-grid gap-3 my-2 py-1">
        <div class="p-2 bg-secondary text-center rounded border">Khóa học cơ bản</div>
      </div>
      <!-- Content Row-->
      <div class="row g-4">
        <div class="col-sm-3" v-for="item in courses" :key="item.key">
          <div class="card h-100">
            <img src="https://dummyimage.com/460x260/f0e37d/0011ff" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title card-name">{{ item.title }}</h5>
              <p class="card-text">
                <fa-icon icon="users" /> 84.890
              </p>
            </div>
          </div>
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
        title: null
      }]
    }
  },
  mounted: async function () {
    await this.getCourses();
    console.log(this.courses)
  },
  methods: {
    async getCourses() {
      try {
        let courses = await this.$axios.get("/api/course");
        if (courses.status === 200) {
          this.courses = courses.data.listCourse;
        }
      } catch (e) {
        console.log(e);
      }
      
    }
  }
};
</script>