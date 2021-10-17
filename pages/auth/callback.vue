<template>
  <div id="main" class="d-flex flex-column min-vh-100">
    <div class="spinner-border mx-auto my-auto" style="width: 5rem; height: 5rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "empty",
  head() {
    return {
      title: "Loading... | Academy"
    };
  },
  data() {},
  mounted: async function() {},
  methods: {}
};
</script>
