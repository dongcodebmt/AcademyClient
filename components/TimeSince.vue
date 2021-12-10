<template>
  <p>{{ timeAgo }}</p>
</template>

<script>
export default {
  props: ['date'],
  data() {
    return {
      interval: null,
      timeAgo: null,
      timeType: "s"
    }
  },
  mounted: async function () {
    this.startCounter();
  },
  methods: {
    async stopCounter() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    },
    async startCounter() {
      let result = await this.timeSince(this.date);
      this.timeAgo = result.str;
      let counter = result.refresh;

      const handleInterval = async () => {
        result = await this.timeSince(this.date);
        this.timeAgo = result.str;

        if (result.type !== this.timeType) {
          this.timeType = result.type;
          counter = result.refresh;
          clearInterval(this.interval);
          this.interval = setInterval(handleInterval, counter);
        }
      }

      this.interval = setInterval(handleInterval, counter);
    },
    async timeSince(date) {
      if (date) {
        let lastDate = new Date(date.replace(/\Z$/, "") + "Z");
        let seconds = Math.floor((new Date() - lastDate) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
          return { str: Math.floor(interval) + " năm trước", type: "y", refresh: 30 * 24 * 60 * 60 * 1000 };
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return { str: Math.floor(interval) + " tháng trước", type: "m", refresh: 7 * 24 * 60 * 60 * 1000 };
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return { str: Math.floor(interval) + " ngày trước", type: "d", refresh: 3 * 60 * 60 * 1000 };
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return { str: Math.floor(interval) + " giờ trước", type: "h", refresh: 15 * 60 * 1000 };
        }
        interval = seconds / 60;
        if (interval > 1) {
          return { str: Math.floor(interval) + " phút trước", type: "M", refresh: 30 * 1000 };
        }
        return { str: Math.floor(seconds) + " giây trước", type: "s", refresh: 1000 };
      }
      return null;
    }
  },
  watch: {
    date: async function (val) {
      await this.stopCounter();
      this.startCounter();
    }
  }
}
</script>