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
              <h1 class="mb-0 h3">Sign in to our platform</h1>
            </div>
            <form class="mt-4" v-on:submit.prevent="signIn">
              <!-- Form -->
              <div class="form-group mb-4">
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
                      v-model="account.password"
                      type="password"
                      placeholder="Password"
                      class="form-control"
                      id="password"
                      required
                    />
                  </div>
                </div>
                <!-- End of Form -->
                <div class="d-flex justify-content-between align-items-top mb-4">
                  <div class="form-check">
                    <input
                      v-model="account.keepLogin"
                      class="form-check-input"
                      type="checkbox"
                      value
                      id="remember"
                    />
                    <label class="form-check-label mb-0" for="remember">Remember me</label>
                  </div>
                  <div>
                    <nuxt-link to="/auth/forgot-password" class="small text-right">Lost password?</nuxt-link>
                  </div>
                </div>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-gray-800">Sign in</button>
              </div>
            </form>
            <div class="mt-3 mb-4 text-center">
              <span class="fw-normal">or login with</span>
            </div>
            <div class="d-flex justify-content-center my-4">
              <a
                href="#"
                class="btn btn-icon-only btn-pill btn-outline-gray-500 me-2"
                aria-label="facebook button"
                title="facebook button"
              >
                <fa-icon class="icon icon-xxs" :icon="['fab', 'facebook-f']" />
              </a>
              <a
                href="#"
                class="btn btn-icon-only btn-pill btn-outline-gray-500 me-2"
                aria-label="twitter button"
                title="twitter button"
              >
                <fa-icon class="icon icon-xxs" :icon="['fab', 'twitter']" />
              </a>
              <a
                href="#"
                class="btn btn-icon-only btn-pill btn-outline-gray-500"
                aria-label="github button"
                title="github button"
              >
                <fa-icon class="icon icon-xxs" :icon="['fab', 'github']" />
              </a>
            </div>
            <div class="d-flex justify-content-center align-items-center mt-4">
              <span class="fw-normal">
                Not registered?
                <nuxt-link to="/auth/signup" class="fw-bold">Create account</nuxt-link>
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
        password: null,
        keepLogin: true
      }
    };
  },
  mounted: async function() {},
  methods: {
    async signIn() {
      // Get refresh token to create access token from middleware
      if (this.account.keepLogin) {
        delete this.account.keepLogin;
        let result = await this.axiosPost("api/auth/refreshToken", this.account);
        if (result.status === 200) {
          let data = result.data;
          this.setCookie("refreshToken", data.token, data.expires);
          this.$router.push("/");
        }
      }

      //Only get access token
      delete this.account.keepLogin;
      let result = await this.axiosPost("api/auth/accessToken", this.account);
      if (result.status === 200) {
        let data = result.data;
        this.setCookie("accessToken", data.token, data.expires);
        this.$router.push("/");
      }
    }
  }
};
</script>
