<template>
  <section class="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center form-bg-image">
        <p class="text-center">
          <nuxt-link to="/" class="d-flex align-items-center justify-content-center">
            <fa-icon icon="long-arrow-alt-left" />&nbsp; Quay về trang chủ
          </nuxt-link>
        </p>
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div
            class="signin-inner my-3 my-lg-0 bg-white shadow border-0 rounded p-4 p-lg-5 w-100 fmxw-500"
          >
            <h1 class="h3">Bạn đã quên mật khẩu?</h1>
            <p
              class="mb-4"
            >Đừng lo lắng! Chỉ cần nhập email của bạn và chúng tôi sẽ gửi cho bạn mã để đặt lại mật khẩu của mình!</p>
            <form v-on:submit.prevent="requestPassword()">
              <!-- Form -->
              <div class="mb-4">
                <label for="email">Địa chỉ email của bạn</label>
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="john@company.com"
                    v-model="email"
                    required
                    autofocus
                  />
                </div>
              </div>
              <!-- End of Form -->
              <div class="d-grid">
                <button type="submit" class="btn btn-gray-800">Đặt lại mật khẩu</button>
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
  layout: "empty",
  data() {
    return {
      email: null
    }
  },
  methods: {
    async requestPassword() {
      if (!this.email) {
        return this.$toast.error("Vui lòng nhập email!", {
          duration: 5000
        });
      }
      try {
        let result = await this.$axios.post(`/api/user/forgot`, JSON.stringify(this.email), {
          headers: {
            'Content-Type': 'application/json-patch+json'
          }
        });
        if (result.status === 200 && result.data === true) {
          this.$toast.success("Một mật khẩu mới đã được gửi vào email của bạn!", {
            duration: 10000
          });
        } else {
          this.$toast.error("Email không tồn tại!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
