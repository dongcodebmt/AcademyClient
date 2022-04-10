<template>
  <div id="user">
    <div class="row py-4">
      <div class="col-12 col-xl-8">
        <div class="card card-body border-0 shadow mb-4">
          <h2 class="h5 mb-4">Thông tin cá nhân</h2>
          <form v-on:submit.prevent="putUser(id)">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div>
                  <label for="first_name">Họ</label>
                  <input
                    v-model="user.firstName"
                    class="form-control"
                    id="first_name"
                    type="text"
                    placeholder="Nhập họ của bạn"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <label for="last_name">Tên</label>
                  <input
                    v-model="user.lastName"
                    class="form-control"
                    id="last_name"
                    type="text"
                    placeholder="Nhập tên của bạn"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    v-model="user.email"
                    class="form-control"
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end mt-3">
              <button class="btn btn-gray-800 mt-2 animate-up-2" type="submit">Lưu</button>
            </div>
          </form>
        </div>

        <div class="card border-0 shadow mb-4">
          <div class="card-body">
            <h5 class="card-title">Các khóa đang tham gia</h5>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-4 rounded table-borderless">
                <thead class="thead-light">
                  <tr>
                    <th class="border-0 rounded-start">#</th>
                    <th class="border-0 rounded-end">Tên khoá học</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in courses" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

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
      <div class="col-12 col-xl-4">
        <div class="row">
          <div class="col-12">
            <div class="card card-body border-0 shadow mb-4">
              <h2 class="h5 mb-4">Thay đổi ảnh đại diện</h2>
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <!-- Avatar -->
                  <img
                    class="rounded avatar-xl"
                    alt="change avatar"
                    style="object-fit: cover;"
                    :src="[ user.picture && user.picture !== '/' ? user.picture : require('@/assets/img/team/blank-profile.png') ]"
                  />
                </div>
                <div class="file-field">
                  <div class="d-flex justify-content-xl-center ms-xl-3">
                    <div class="d-flex">
                      <input type="file" @change="handleFileUpload( $event )" />
                      <fa-icon icon="paperclip" class="icon text-gray-500 me-2" />
                      <div class="d-md-block text-left">
                        <div class="fw-normal text-dark mb-1">Chọn ảnh</div>
                        <div class="text-gray small">JPG, GIF hoặc PNG</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end mt-3">
                <button
                  class="btn btn-gray-800 mt-2 animate-up-2"
                  type="submit"
                  v-on:click="updatePicture(id)"
                >Lưu</button>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="card card-body border-0 shadow mb-4">
              <h2 class="h5 mb-4">Phân quyền</h2>
              <div class="form-check" v-for="item in fullRoles" :key="item.id">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="item"
                  :value="item"
                  v-model="roles"
                />
                <label class="form-check-label" :for="item">{{ item }}</label>
              </div>
              <div class="d-flex justify-content-end mt-3">
                <button
                  class="btn btn-gray-800 mt-2 animate-up-2"
                  type="submit"
                  v-on:click="setRoles(id)"
                >Lưu</button>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="card card-body border-0 shadow mb-4">
              <h2 class="h5 mb-4">Cập nhật mật khẩu</h2>
              <form v-on:submit.prevent="changePassword(id)">
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <div class="form-group">
                      <label for="new_password">Mật khẩu mới</label>
                      <input
                        v-model="password.newPassword"
                        class="form-control"
                        id="new_password"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <div class="form-group">
                      <label for="confirm_password">Nhập lại mật khẩu</label>
                      <input
                        v-model="password.confirmPassword"
                        class="form-control"
                        id="confirm_password"
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end mt-3">
                  <button class="btn btn-gray-800 mt-2 animate-up-2" type="submit">Đổi mật khẩu</button>
                </div>
              </form>
            </div>
          </div>

          <!-- Cert details modal -->
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
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
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
                          <th class="border-0 rounded-end">Điểm</th>
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
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['role'],
  meta: {
    auth: { authority: 2 }
  },
  layout: "admin",
  head() {
    return {
      title: "Sửa thông tin người dùng | Academy"
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
      password: {
        newPassword: null,
        confirmPassword: null
      },
      file: null,
      fullRoles: [],
      roles: [],
      courses: [],
      certs: []
    }
  },
  mounted: async function () {
    this.fullRoles = await this.getFullRoles();
    if (this.id) {
      [this.user, this.roles, this.courses, this.certs, this.mark] = await Promise.all([
        this.getUser(this.id),
        this.getUserRoles(this.id),
        this.getRegistedCourses(this.id),
        this.getCertifications(this.id)
      ]);
    }
  },
  methods: {
    // Exam details
    async showModal(courseId) {
      this.examUsers = [];
      this.examUsers = await this.getExamUsers(courseId);
    },
    async getExamUsers(courseId) {
      try {
        let result = await this.$axios.get(`/api/course/${courseId}/ExamUsers?userId=${this.id}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
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
    // Roles
    async setRoles(userId) {
      try {
        if (this.roles.length < 1) {
          this.$toast.error("Vui lòng chọn ít nhất 1 quyền!", {
            duration: 5000
          });
          return;
        }
        let result = await this.$axios.post(`/api/user/${userId}/roles`, this.roles);
        if (result.status === 200) {
          this.$toast.success("Thay đổi quyền thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getUserRoles(id) {
      try {
        let result = await this.$axios.get(`/api/user/${id}/roles`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getFullRoles() {
      try {
        let result = await this.$axios.get(`/api/user/roles`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Password
    async changePassword(userId) {
      if (this.password.newPassword.length < 8) {
        return this.$toast.error("Mật khẩu cần lớn hơn 8 ký tự!", {
          duration: 5000
        });
      }
      if (this.password.newPassword !== this.password.confirmPassword) {
        return this.$toast.error("Hai mật khẩu không trùng nhau!", {
          duration: 5000
        });
      }
      try {
        let result = await this.$axios.post(`/api/user/${userId}/password`, { password: this.password.newPassword });
        if (result.status === 200) {
          this.password.newPassword = null;
          this.password.confirmPassword = null;
          this.$toast.success("Cập nhật thông tin thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Picture
    async updatePicture(userId) {
      let picId = await this.uploadFile(userId);
      if (picId === 0) {
        this.$toast.error("Hình ảnh đã chọn không hợp lệ!", {
          duration: 5000
        });
      }
    },
    async uploadFile(userId) {
      if (!this.file) {
        return 0;
      }
      // Initialize the form data
      let formData = new FormData();
      formData.append('file', this.file);
      try {
        let result = await this.$axios.post(`/api/picture/upload/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (result.status === 200) {
          return result.data.id;
        }
      } catch (e) {
        console.log(e);
      }
      return 0;
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.user.picture = URL.createObjectURL(this.file);
    },
    // Update user
    async putUser(id) {
      if (!this.user.firstName) {
        this.$toast.error("Vui lòng nhập họ!", {
          duration: 5000
        });
        return;
      }
      if (!this.user.firstName) {
        this.$toast.error("Vui lòng nhập tên!", {
          duration: 5000
        });
        return;
      }
      if (!this.user.email) {
        this.$toast.error("Vui lòng nhập email!", {
          duration: 5000
        });
        return;
      }
      
      try {
        let result = await this.$axios.put(`/api/user/${id}`, this.user);
        if (result.status === 200) {
          this.$toast.success("Cập nhật thông tin thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        if (e.response) {
          let error = JSON.stringify(e.response.data.error);
          this.$toast.error(error, {
            duration: 5000
          });
        }
      }
    },
    // Get user
    async getUser(id) {
      try {
        let result = await this.$axios.get(`/api/user/${id}`);
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