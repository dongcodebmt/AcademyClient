<template>
  <div id="password">
    <div class="row py-4 d-flex justify-content-center">
      <div class="col-12 col-xl-4">
        <div class="card card-body border-0 shadow mb-4">
          <h2 class="h5 mb-4">Thay đổi mật khẩu</h2>
          <form v-on:submit.prevent="changePassword()">
            <div class="row">
              <div class="col-md-12 mb-3">
                <div>
                  <label for="old_password">Mật khẩu cũ</label>
                  <input
                    v-model="password.oldPassword"
                    class="form-control"
                    id="old_password"
                    type="password"
                    placeholder="Nhập mật khẩu cũ"
                  />
                </div>
              </div>
            </div>
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
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Đổi mật khẩu | Academy"
    };
  },
  data() {
    return {
      password: {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
      }
    }
  },
  methods: {
    async changePassword() {
      if (this.password.newPassword !== this.password.confirmPassword) {
        return this.$toast.error("Hai mật bạn đã nhập không không khớp!", {
          duration: 5000
        });
      }
      if (this.password.newPassword.length < 8) {
        return this.$toast.error("Mật khẩu cần lớn hơn 8 ký tự!", {
          duration: 5000
        });
      }

      try {
        let result = await this.$axios.post("/api/user/password", this.password);
        if (result.status === 200) {
          this.$toast.success("Đổi mật khẩu thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        if (e.response) {
          let message = e.response.data.message;
          console.log(message);
          this.$toast.error("Mật khẩu cũ không đúng!", {
            duration: 5000
          });
        }
      }
    }
  }
};
</script>
