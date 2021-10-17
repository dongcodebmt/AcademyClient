<template>
  <section class="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center form-bg-image">
        <p class="text-center">
          <nuxt-link to="/" class="d-flex align-items-center justify-content-center">
            <fa-icon icon="long-arrow-alt-left" />&nbsp; Back to homepage
          </nuxt-link>
        </p>
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div
            class="signin-inner my-3 my-lg-0 bg-white shadow border-0 rounded p-4 p-lg-5 w-100 fmxw-500"
          >
            <h1 class="h3">Forgot your password?</h1>
            <p class="mb-4">
              Don't fret! Just type in your email and we will send you a code to
              reset your password!
            </p>
            <form action="#">
              <!-- Form -->
              <div class="mb-4">
                <label for="email">Your Email</label>
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="john@company.com"
                    required
                    autofocus
                  />
                </div>
              </div>
              <!-- End of Form -->
              <div class="d-grid">
                <button type="submit" class="btn btn-gray-800">Recover password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  layout: "empty"
};
</script>
