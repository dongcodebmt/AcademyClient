<template>
  <div id="courses">
    <div class="row py-4">
      <div class="col-lg-6">
        <div class="card border-0 shadow mb-4">
          <div class="card-body">
            <h5 class="card-title">Các khóa đang tham gia</h5>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-4 rounded table-borderless">
                <thead class="thead-light">
                  <tr>
                    <th class="border-0 rounded-start">#</th>
                    <th class="border-0">Tên khoá học</th>
                    <th class="border-0 rounded-end">Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in courses" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                    <td>
                      <nuxt-link :to="'/course/course?id=' + item.id">Xem chi tiết</nuxt-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card border-0 shadow mb-4">
          <div class="card-body">
            <h5 class="card-title">Các khóa học đã hoàn thành</h5>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-4 rounded table-borderless">
                <thead class="thead-light">
                  <tr>
                    <th class="border-0 rounded-start">#</th>
                    <th class="border-0">Tên khoá học</th>
                    <th class="border-0 rounded-end">Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in certs" :key="item.courseId">
                    <td>{{ item.courseId }}</td>
                    <td>{{ item.courseName }}</td>
                    <td>{{ item.mark.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$auth.user.id,
      certs: [
        {
          userId: 0,
          courseId: 0,
          courseName: null,
          mark: 0
        }
      ],
      courses: [{
        id: 0,
        lecturerId: 0,
        title: 0
      }]
    }
  },
  mounted: async function () {
    if (this.id) {
      this.certs = await this.getCertifications(this.id);
      this.courses = await this.getCourseRegisted(this.id);
    }
  },
  methods: {
    async getCourseRegisted(userId) {
      try {
        let result = await this.$axios.get("/api/course/CourseRegisted/" + userId);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCertifications(userId) {
      try {
        let result = await this.$axios.get("/api/course/certifications/" + userId);
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