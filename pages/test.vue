<template>
    
</template>

<script>
export default {
  auth: false,
  mounted: async function() {
    this.$toast.show("Logging in...");
    let data = await this.$auth.fetchUser();
    console.log(data)
    let scp = this.$auth.hasScope('admin');
    console.log(this.$auth.user.user)
  }
};
</script>