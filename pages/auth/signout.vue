<template>
  <div class="d-flex justify-content-center">
    <div class="spinner-border" style="width: 5rem; height: 5rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Đăng xuất | Academy"
    };
  },
  mounted: async function() {
    await this.signOut();
  },
  methods: {
    async signOut() {
      setTimeout(() => {
        this.$auth.logout();
        this.$router.push("/auth/signin");
      }, 1000);
    }
  }
};
</script>
