<template>
  <div id="social-login">
    <div class="mt-3 mb-4 text-center">
      <span class="fw-normal">or login with</span>
    </div>
    <div class="d-flex justify-content-center my-4">
      <a
        v-on:click="google()"
        href="#"
        class="btn btn-icon-only btn-pill btn-outline-gray-500 me-2"
        aria-label="google button"
        title="google button"
      >
        <fa-icon class="icon icon-xxs" :icon="['fab', 'google']" />
      </a>
      <a
        v-on:click="facebook()"
        href="#"
        class="btn btn-icon-only btn-pill btn-outline-gray-500 me-2"
        aria-label="facebook button"
        title="facebook button"
      >
        <fa-icon class="icon icon-xxs" :icon="['fab', 'facebook-f']" />
      </a>
      <!-- <a
        href="#"
        class="btn btn-icon-only btn-pill btn-outline-gray-500"
        aria-label="github button"
        title="github button"
      >
        <fa-icon class="icon icon-xxs" :icon="['fab', 'github']" />
      </a> -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async google() {
      this.$auth.loginWith("google");
    },
    async facebook() {
      this.$auth.loginWith("facebook");
    }
  }
};
</script>
