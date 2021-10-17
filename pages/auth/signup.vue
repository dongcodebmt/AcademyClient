<template>
  <section class="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
    <div class="container">
      <p class="text-center">
        <nuxt-link to="/" class="d-flex align-items-center justify-content-center">
          <fa-icon icon="long-arrow-alt-left" />&nbsp; Back to homepage
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
              <h1 class="mb-0 h3">Create Account</h1>
            </div>
            <form class="mt-4" v-on:submit.prevent="signUp()">
              <!-- Form -->
              <div class="form-group mb-2">
                <label for="firstname">First Name</label>
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
                    placeholder="First Name"
                    id="firstname"
                    autofocus
                    required
                  />
                </div>
              </div>
              <!-- End of Form -->
              <!-- Form -->
              <div class="form-group mb-2">
                <label for="lastname">Last Name</label>
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
                    placeholder="Last Name"
                    id="lastname"
                    autofocus
                    required
                  />
                </div>
              </div>
              <!-- End of Form -->
              <!-- Form -->
              <div class="form-group mb-2">
                <label for="email">Your Email</label>
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
                  <label for="password">Your Password</label>
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
                      placeholder="Password"
                      class="form-control"
                      id="password"
                      required
                    />
                  </div>
                </div>
                <!-- End of Form -->
                <!-- Form -->
                <div class="form-group mb-2">
                  <label for="confirm_password">Confirm Password</label>
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
                      placeholder="Confirm Password"
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
                      id="remember"
                      required
                    />
                    <label class="form-check-label fw-normal mb-0" for="remember">
                      I agree to the
                      <a href="#" class="fw-bold">terms and conditions</a>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="alert alert-danger" role="alert" v-if="alert.data">{{ alert.data }}</div>

              <div class="d-grid">
                <button type="submit" class="btn btn-gray-800">Sign up</button>
              </div>
            </form>
            <SocialLogin></SocialLogin>
            <div class="d-flex justify-content-center align-items-center mt-4">
              <span class="fw-normal">
                Already have an account?
                <nuxt-link to="/auth/signin" class="fw-bold">Login here</nuxt-link>
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
      },
      alert: {
        data: null
      }
    };
  },
  mounted: async function() {},
  methods: {
    async signUp() {
      if (this.user.terms === false) {
        return await this.showAlert("Bạn không chấp nhận điều khoản và điều kiện của chúng tôi!");
      }
      if (this.user.password !== this.user.confirmPassword) {
        return await this.showAlert("Hai mật bạn đã nhập không không khớp!");
      }
      if (this.user.password.length < 8) {
        return await this.showAlert("Mật khẩu cần lớn hơn 8 ký tự!");
      }
      try {
        let result = await this.$axios.post("/api/auth/register", this.user);
        if (result.status === 200) {
          //Register successful => set token to nuxtjs/auth to login
          try {
            await this.$auth.setStrategy('local');
            await this.$auth.setUserToken(result.data.accessToken, result.data.refreshToken);
            this.$router.push("/");
          } catch (e) {
            await this.showAlert("Đăng ký tài khoản thất bại vui lòng liên hệ quản trị viên để biết thêm chi tiết!");
          }
        }
      } catch (e) {
          let message = e.response.data.message;
          await this.showAlert(message);
      }
      
    },
    async showAlert(data) {
      this.alert.data = data;
      setTimeout(() => {
        this.alert.data = null;
      }, 3000);
    }
  }
};
</script>
