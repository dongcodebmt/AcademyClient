<template>
  <div id="courses">
    <div class="list py-4">
      <div class="row g-4">
        <div class="col-sm-3" v-for="item in courses" :key="item.key">
          <nuxt-link :to="'/course/course?id=' + item.id">
            <div class="card h-100">
              <img
                :src="[ item.picturePath && item.picturePath !== '/' ? item.picturePath : 'https://dummyimage.com/460x260/f0e37d/0011ff' ]"
                class="card-img-top"
              />
              <div class="card-body">
                <h5 class="card-title card-name">{{ item.title }}</h5>
                <p class="card-text">
                  <fa-icon icon="users" />&nbsp;84.890
                </p>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- <div id="paging">
      <nav aria-label="Pagination">
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
            <a class="page-link" href="#!">10</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#!">Older</a>
          </li>
        </ul>
      </nav>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [{
        id: null,
        lecturerId: null,
        categoryId: null,
        createAt: null,
        title: null,
        picturePath: null
      }]
    }
  },
  mounted: async function () {
    this.courses = await this.getCourses();
  },
  methods: {
    async getCourses() {
      try {
        let courses = await this.$axios.get("/api/course");
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