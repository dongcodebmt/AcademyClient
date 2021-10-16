<template>
  <section class="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
    <div class="container">
      <p class="text-center">
        <nuxt-link
          to="/"
          class="d-flex align-items-center justify-content-center"
        >
          <fa-icon icon="long-arrow-alt-left" />
          &nbsp; Back to homepage
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
          <div
            class="
              bg-white
              shadow
              border-0
              rounded
              border-light
              p-4 p-lg-5
              w-100
              fmxw-500
            "
          >
            <div class="text-center text-md-center mb-4 mt-md-0">
              <h1 class="mb-0 h3">Create Account</h1>
            </div>
            <form action="#" class="mt-4">
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
                <div class="form-group mb-4">
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
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="remember"
                    />
                    <label
                      class="form-check-label fw-normal mb-0"
                      for="remember"
                    >
                      I agree to the
                      <a href="#" class="fw-bold">terms and conditions</a>
                    </label>
                  </div>
                </div>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-gray-800">Sign up</button>
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
                Already have an account?
                <nuxt-link to="/auth/signin" class="fw-bold"
                  >Login here</nuxt-link
                >
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
};
</script>
