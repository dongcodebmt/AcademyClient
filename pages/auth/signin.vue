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
              <h1 class="mb-0 h3">Đăng nhập vào hệ thống</h1>
            </div>
            <form class="mt-4" v-on:submit.prevent="signIn()">
              <!-- Form -->
              <div class="form-group mb-4">
                <label for="email">Địa chỉ email</label>
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1">
                    <fa-icon
                      icon="envelope"
                      class="icon icon-xs text-gray-600"
                      style="font-size: 20px"
                    />
                  </span>
                  <input
                    v-model="account.email"
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
                <div class="form-group mb-4">
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
                      v-model="account.password"
                      type="password"
                      placeholder="Mật khẩu"
                      class="form-control"
                      id="password"
                      required
                    />
                  </div>
                </div>
                <!-- End of Form -->
                <div class="d-flex justify-content-between align-items-top mb-4">
                  <!-- <div class="form-check">
                    <input
                      v-model="account.keepLogin"
                      class="form-check-input"
                      type="checkbox"
                      id="remember"
                    />
                    <label class="form-check-label mb-0" for="remember">Remember me</label>
                  </div>-->
                  <div>
                    <nuxt-link to="/auth/forgot-password" class="small text-right">Quên mật khẩu?</nuxt-link>
                  </div>
                </div>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-gray-800">Đăng nhập</button>
              </div>
            </form>
            <div class="mt-3 mb-4 text-center">
              <span class="fw-normal">hoặc đăng nhập với</span>
            </div>
            <SocialLogin></SocialLogin>
            <div class="d-flex justify-content-center align-items-center mt-4">
              <span class="fw-normal">
                Chưa đăng ký?
                <nuxt-link to="/auth/signup" class="fw-bold">Tạo tài khoản</nuxt-link>
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
  layout: "empty",
  head() {
    return {
      title: "Đăng nhập | Academy"
    };
  },
  data() {
    return {
      account: {
        email: null,
        password: null
      }
    };
  },
  mounted: async function () { },
  methods: {
    async signIn() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.account
        });
        this.$toast.success("Đăng nhập thành công!", {
          duration: 5000
        });
      } catch (e) {
        console.log(e);
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
