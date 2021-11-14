<template>
  <div id="course">
    <Learning :id="id" v-if="selector === 1" />
    <Preview :id="id" v-if="selector === 2" />
  </div>
</template>

<script>
import Learning from "~/components/Course/Learning.vue";
import Preview from "~/components/Course/Preview.vue";

export default {
  components: { Learning, Preview },
  data() {
    return {
      id: this.$route.query.id,
      selector: 0,
    }
  },
  mounted: async function () {
    if (this.id && await this.isRegisted(this.id)) {
      this.selector = 1;
    } else {
      this.selector = 2;
    }
    if (!this.id) {
      this.$router.push("/courses");
    }
  },
  methods: {
    async isRegisted(id) {
      try {
        let result = await this.$axios.get("api/Course/" + id + "/IsRegisted");
        if (result.status === 200 && JSON.parse(result.data) === true) {
          return true;
        }
      } catch (e) {
        console.log(e);
      }
      return false;
    }
  }
}
</script>