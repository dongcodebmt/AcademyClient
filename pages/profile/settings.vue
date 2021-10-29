<template>
  <div id="settings">
    <div class="row py-4">
      <div class="col-12 col-xl-8">
        <div class="card card-body border-0 shadow mb-4">
          <h2 class="h5 mb-4">Thông tin cá nhân</h2>
          <form v-on:submit.prevent="update()">
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
                  v-on:click="uploadFile()"
                >Lưu</button>
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
  head() {
    return {
      title: "Thông tin cá nhân | Academy"
    };
  },
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        email: null,
        picture: null
      },
      file: null
    }
  },
  mounted: async function () {
    await this.getCurrentUser();
  },
  methods: {
    async uploadFile() {
      // Initialize the form data
      let formData = new FormData();
      formData.append('file', this.file);
      try {
        let result = await this.$axios.post("/api/picture/profile", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (result.status === 200) {
          this.$auth.fetchUser();
          this.$toast.success("Cập nhật ảnh đại diện thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
          this.$toast.error("Hình ảnh đã chọn không hợp lệ!", {
            duration: 5000
          });
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.user.picture = URL.createObjectURL(this.file);
    },
    async update() {
      try {
        let result = await this.$axios.put("/api/user/infomation", this.user);
        if (result.status === 200) {
          this.$auth.fetchUser();
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
    async getCurrentUser() {
      this.user.firstName = this.$auth.user.firstName;
      this.user.lastName = this.$auth.user.lastName;
      this.user.email = this.$auth.user.email;
      this.user.picture = this.$auth.user.picture;
    }
  }
};
</script>
