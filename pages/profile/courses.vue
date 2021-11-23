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
                    <th class="border-0">Tiến trình</th>
                    <th class="border-0 rounded-end">Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in courses" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.progress.toFixed(2) }}</td>
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
                    <th class="border-0">Điểm</th>
                    <th class="border-0 rounded-end">Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in certs" :key="item.courseId">
                    <td>{{ item.courseId }}</td>
                    <td>{{ item.courseName }}</td>
                    <td>{{ item.mark.toFixed(2) }}</td>
                    <td>
                      <!-- Button trigger modal -->
                      <a
                        data-bs-toggle="modal"
                        data-bs-target="#listExam"
                        v-on:click="showModal(item.courseId)"
                      >Xem chi tiết</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="listExam"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Danh sách các bài đã thi</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-4 rounded table-borderless">
                  <thead class="thead-light">
                    <tr>
                      <th class="border-0 rounded-start">#</th>
                      <th class="border-0">Tên bài thi</th>
                      <th class="border-0">Tổng số câu</th>
                      <th class="border-0">Số câu đúng</th>
                      <th class="border-0">Thời gian thi</th>
                      <th class="border-0">Thời gian nộp</th>
                      <th class="border-0">Điểm</th>
                      <th class="border-0 rounded-end">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in examUsers" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.title }}</td>
                      <td>{{ item.noOfQuestion }}</td>
                      <td>{{ item.noOfRightOption }}</td>
                      <td>{{ new Date(item.startedAt).toLocaleString() }}</td>
                      <td>{{ new Date(item.completedAt).toLocaleString() }}</td>
                      <td>{{ item.mark.toFixed(2) }}</td>
                      <td data-bs-dismiss="modal">
                        <nuxt-link :to="`/course/result?id=${item.id}`">Xem chi tiết</nuxt-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Thông tin khóa học | Academy"
    };
  },
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
        title: 0,
        progress: 0
      }],
      examUsers: [{
        id: 0,
        userId: 0,
        examId: 0,
        noOfQuestion: 0,
        startedAt: new Date(),
        completedAt: new Date(),
        noOfRightOption: 0,
        mark: 0,
        title: null,
      }]
    }
  },
  mounted: async function () {
    if (this.id) {
      [this.certs, this.courses] = await Promise.all([this.getCertifications(this.id), this.getCourseRegisted(this.id)]);
    }
  },
  methods: {
    async showModal(courseId) {
      this.examUsers = [];
      this.examUsers = await this.getExamUsers(courseId);
    },
    async getExamUsers(courseId) {
      try {
        let result = await this.$axios.get("/api/course/" + courseId + "/ExamUsers");
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
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