<template>
  <section class="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
    <div class="container">
      <p class="text-center">
        <nuxt-link to="/" class="d-flex align-items-center justify-content-center">
          <fa-icon icon="long-arrow-alt-left" />&nbsp; Quay về trang chủ
        </nuxt-link>
      </p>
      <div
        class="row justify-content-center form-bg-image"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/img/illustrations/signin.svg') + ')',
        }"
      >
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div class="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
            <div class="text-center text-md-center mb-4 mt-md-0">
              <h1 class="mb-0 h3">Tạo tài khoản</h1>
            </div>
            <form class="mt-4" v-on:submit.prevent="signUp()">
              <!-- Form -->
              <div class="form-group mb-2">
                <label for="firstname">Họ</label>
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1">
                    <fa-icon
                      icon="user"
                      class="icon icon-xs text-gray-600"
                      style="font-size: 20px"
                    />
                  </span>
                  <input
                    v-model="user.firstName"
                    type="text"
                    class="form-control"
                    placeholder="Họ"
                    id="firstname"
                    autofocus
                    required
                  />
                </div>
              </div>
              <!-- End of Form -->
              <!-- Form -->
              <div class="form-group mb-2">
                <label for="lastname">Tên</label>
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1">
                    <fa-icon
                      icon="user"
                      class="icon icon-xs text-gray-600"
                      style="font-size: 20px"
                    />
                  </span>
                  <input
                    v-model="user.lastName"
                    type="text"
                    class="form-control"
                    placeholder="Tên"
                    id="lastname"
                    autofocus
                    required
                  />
                </div>
              </div>
              <!-- End of Form -->
              <!-- Form -->
              <div class="form-group mb-2">
                <label for="email">Email</label>
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1">
                    <fa-icon
                      icon="envelope"
                      class="icon icon-xs text-gray-600"
                      style="font-size: 20px"
                    />
                  </span>
                  <input
                    v-model="user.email"
                    type="email"
                    class="form-control"
                    placeholder="example@company.com"
                    id="email"
                    autofocus
                    required
                  />
                </div>
              </div>
              <!-- End of Form -->
              <div class="form-group">
                <!-- Form -->
                <div class="form-group mb-2">
                  <label for="password">Mật khẩu</label>
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon2">
                      <fa-icon
                        icon="lock"
                        class="icon icon-xs text-gray-600"
                        style="font-size: 20px"
                      />
                    </span>
                    <input
                      v-model="user.password"
                      type="password"
                      placeholder="Mật khẩu"
                      class="form-control"
                      id="password"
                      required
                    />
                  </div>
                </div>
                <!-- End of Form -->
                <!-- Form -->
                <div class="form-group mb-2">
                  <label for="confirm_password">Xác nhận mật khẩu</label>
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon2">
                      <fa-icon
                        icon="lock"
                        class="icon icon-xs text-gray-600"
                        style="font-size: 20px"
                      />
                    </span>
                    <input
                      v-model="user.confirmPassword"
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      class="form-control"
                      id="confirm_password"
                      required
                    />
                  </div>
                </div>
                <!-- End of Form -->
                <div class="mb-4">
                  <div class="form-check">
                    <input
                      v-model="user.terms"
                      class="form-check-input"
                      type="checkbox"
                      value
                      id="terms"
                      required
                    />
                    <label class="form-check-label fw-normal mb-0" for="terms">
                      Tôi đồng ý với
                      <nuxt-link :to="'/policies'" class="fw-bold">các điều khoản và điều kiện</nuxt-link>
                    </label>
                  </div>
                </div>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-gray-800">Đăng ký</button>
              </div>
            </form>
            <SocialLogin></SocialLogin>
            <div class="d-flex justify-content-center align-items-center mt-4">
              <span class="fw-normal">
                Đã có tài khoản?
                <nuxt-link to="/auth/signin" class="fw-bold">Đăng nhập ở đây</nuxt-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  layout: "empty",
  head() {
    return {
      title: "Đăng ký | Academy"
    };
  },
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
        terms: false
      }
    };
  },
  mounted: async function () { },
  methods: {
    async signUp() {
      if (this.user.terms === false) {
        return this.$toast.error(
          "Bạn không chấp nhận điều khoản và điều kiện của chúng tôi!",
          {
            duration: 5000
          }
        );
      }
      if (this.user.password !== this.user.confirmPassword) {
        return this.$toast.error("Hai mật bạn đã nhập không không khớp!", {
          duration: 5000
        });
      }
      if (this.user.password.length < 8) {
        return this.$toast.error("Mật khẩu cần lớn hơn 8 ký tự!", {
          duration: 5000
        });
      }
      try {
        let result = await this.$axios.post("/api/user/register", this.user);
        if (result.status === 200) {
          //Register successful => login
          try {
            let data = {
              email: this.user.email,
              password: this.user.password
            };
            let response = await this.$auth.loginWith("local", {
              data: data
            });
            this.$toast.success("Đăng ký tài thành công!", {
              duration: 5000
            });
            this.$router.push("/");
          } catch (e) {
            this.$toast.error(
              "Đăng ký tài khoản thất bại vui lòng liên hệ quản trị viên để biết thêm chi tiết!",
              {
                duration: 5000
              }
            );
          }
        }
      } catch (e) {
        if (e.response) {
          let message = e.response.data.message;
          this.$toast.error(message, {
            duration: 5000
          });
        }
      }
    }
  }
};
</script>
