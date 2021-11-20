<template>
  <p>{{ timeAgo }}</p>
</template>

<script>
export default {
  props: ['date'],
  data() {
    return {
      timeAgo: null
    }
  },
  mounted: async function () {
    this.timer();
  },
  methods: {
    async timer() {
      let interval = 10000;
      let result = await this.timeSince(this.date)
      this.timeAgo = result.str;
      let timer = setInterval(async () => {
        result = await this.timeSince(this.date);
        this.timeAgo = result.str;
        if (result.type === "y" || result.type === "m" || result.type === "d") {
          clearInterval(timer);
        }
      }, interval)
    },
    async timeSince(date) {
      if (date) {
        let seconds = Math.floor((new Date() - new Date(date)) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
          return { str: Math.floor(interval) + " năm trước", type: "y" };
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return { str: Math.floor(interval) + " tháng trước", type: "m" };
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return { str: Math.floor(interval) + " ngày trước", type: "d" };
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return { str: Math.floor(interval) + " giờ trước", type: "h" };
        }
        interval = seconds / 60;
        if (interval > 1) {
          return { str: Math.floor(interval) + " phút trước", type: "M" };
        }
        return { str: Math.floor(seconds) + " giây trước", type: "s" };
      }
      return null;
    }
  }
}
</script>