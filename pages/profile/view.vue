<template>
  <div id="user">
    <div class="row py-4">
      <div class="col-12 col-xl-8 ">
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

        <div class="card border-0 shadow mb-4">
          <div class="card-body">
            <h5 class="card-title">Các khóa đang tham gia</h5>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-4 rounded table-borderless">
                <thead class="thead-light">
                  <tr>
                    <th class="border-0 rounded-start">#</th>
                    <th class="border-0">Tên khoá học</th>
                    <th class="border-0 rounded-end">Tiến trình</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in courses" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.progress.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4">
        <div class="row">
          <div class="col-12 mb-4">
            <div class="card shadow border-0 text-center p-0">
              <div class="card-body pb-5 py-8">
                <img
                  :src="[user.picture && user.picture !== '/' ? user.picture :  require('@/assets/img/team/blank-profile.png') ]"
                  class="avatar-xl rounded-circle mx-auto mt-n7 mb-4"
                  style="object-fit: cover;"
                />
                <h4 class="h3">{{ user.firstName + " " + user.lastName }}</h4>
                <p class="text-gray mb-4" v-if="user.scope.length > 0">Chức vụ: {{ user.scope.join(', ') }}</p>
                <p class="text-gray mb-4" v-else>Chức vụ: Register</p>
              </div>
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
      title: this.user.firstName + " " + this.user.lastName + " | Academy"
    };
  },
  data() {
    return {
      id: this.$route.query.id,
      user: {
        id: 0,
        email: null,
        firstName: null,
        lastName: null,
        picture: null,
        pictureId: 0,
        scope: []
      },
      courses: [],
      certs: [],
    }
  },
  mounted: async function () {
    if (this.id) {
      [this.user, this.courses, this.certs] = await Promise.all([
        this.getUser(this.id),
        this.getRegistedCourses(this.id),
        this.getCertifications(this.id)
      ]);
    }
  },
  methods: {
    // Get completed courses
    async getCertifications(userId) {
      try {
        let result = await this.$axios.get(`/api/course/certifications/${userId}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Get registed courses
    async getRegistedCourses(userId) {
      try {
        let result = await this.$axios.get(`/api/course/RegistedCourses/${userId}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Get user
    async getUser(id) {
      try {
        let result = await this.$axios.get(`/api/User/Public/${id}`);
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