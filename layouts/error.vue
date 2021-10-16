<template>
  <main>
    <section class="vh-100 d-flex align-items-center justify-content-center">
      <div class="container">
        <!-- 404 Error -->
        <div class="row" v-if="error.statusCode === 404">
          <div class="col-12 text-center d-flex align-items-center justify-content-center">
            <div>
              <img
                class="img-fluid w-75"
                src="~assets/img/illustrations/404.svg"
                alt="404 not found"
              />
              <h1 class="mt-5">
                Page not
                <span class="fw-bolder text-primary">found</span>
              </h1>
              <p class="lead my-4">
                Oops! Looks like you followed a bad link. If you think this is a
                problem with us, please tell us.
              </p>
              <nuxt-link
                to="/"
                class="btn btn-gray-800 d-inline-flex align-items-center justify-content-center mb-4"
              >
                <fa-icon icon="long-arrow-alt-left" />&nbsp;Back to homepage
              </nuxt-link>
            </div>
          </div>
        </div>
        <!-- End 404 Error -->

        <!-- Other Error -->
        <div class="row align-items-center" v-else>
          <div class="col-12 col-lg-5 order-2 order-lg-1 text-center text-lg-left">
            <h1 class="mt-5">
              Something has gone
              <span class="text-primary">seriously</span> wrong
            </h1>
            <p
              class="lead my-4"
            >It's always time for a coffee break. We should be back by the time you finish your coffee.</p>
            <nuxt-link
              to="/"
              class="btn btn-gray-800 d-inline-flex align-items-center justify-content-center mb-4"
            >
              <fa-icon icon="long-arrow-alt-left" />&nbsp;Back to homepage
            </nuxt-link>
          </div>
          <div
            class="col-12 col-lg-7 order-1 order-lg-2 text-center d-flex align-items-center justify-content-center"
          >
            <img
              class="img-fluid w-75"
              src="~assets/img/illustrations/500.svg"
              alt="500 Server Error"
            />
          </div>
        </div>
        <!-- End Other Error -->
      </div>
    </section>
  </main>
</template>

<script>
export default {
  props: ["error"],
  layout: "empty",
  head() {
    return {
      title: this.error.statusCode + " | Academy"
    };
  }
};
</script>