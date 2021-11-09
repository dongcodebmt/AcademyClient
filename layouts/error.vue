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
                <span class="fw-bolder text-primary">Không tìm thấy trang</span>
              </h1>
              <p class="lead my-4">
                Oops! Có vẻ như bạn đã bấm vào một liên kết không hợp lệ. Nếu bạn nghĩ rằng đây là lỗi của chúng chúng tôi, vui lòng cho chúng tôi biết.
              </p>
              <nuxt-link
                to="/"
                class="btn btn-gray-800 d-inline-flex align-items-center justify-content-center mb-4"
              >
                <fa-icon icon="long-arrow-alt-left" />&nbsp;Quay về trang chủ
              </nuxt-link>
            </div>
          </div>
        </div>
        <!-- End 404 Error -->

        <!-- Other Error -->
        <div class="row align-items-center" v-else>
          <div class="col-12 col-lg-5 order-2 order-lg-1 text-center text-lg-left">
            <h1 class="mt-5">
              <span class="text-primary">Đã xảy ra sự cố nghiêm trọng</span>
            </h1>
            <p
              class="lead my-4"
            >Đây là lúc để nghỉ giải lao. Chúng tôi sẽ quay lại khi bạn uống xong một tách cà phê.</p>
            <nuxt-link
              to="/"
              class="btn btn-gray-800 d-inline-flex align-items-center justify-content-center mb-4"
            >
              <fa-icon icon="long-arrow-alt-left" />&nbsp;Quay về trang chủ
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