<template>
  <h1 class="text-center">Xin chào {{ $auth.user.firstName + " " + $auth.user.lastName }}!</h1>
</template>
<script>
export default {
  middleware: ['role'],
  meta: {
    auth: { authority: 3 }
  },
  layout: "admin",
  head() {
    return {
      title: "Quản trị | Academy"
    };
  }
}
</script>