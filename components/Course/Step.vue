<template>
  <div id="step">
    <div class="card card-body border-0 shadow mb-4">
      <!-- Title -->
      <div class="mb-3">
        <label for="title" class="form-label">Tên bài học</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Bài học"
          v-model="step.title"
        />
      </div>

      <div class="mb-3">
        <label for="title" class="form-label">Thời lượng bài học</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="300"
          v-model="step.duration"
        />
      </div>

      <div class="mb-3">
        <label for="embedLink" class="form-label">Nhúng liên kết video</label>
        <input
          type="text"
          class="form-control"
          id="embedLink"
          v-model="step.embedLink"
          placeholder="https://www.youtube.com/embed/[id]"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Nội dung bài học</label>
        <tinymce :init="$store.state.tinymce" v-model="step.content" />
      </div>

      <div class="d-flex justify-content-end mt-4">
        <button
          type="button"
          class="btn btn-outline-warning mx-2"
          v-on:click="backToSteps(trackId)"
        >Quay lại</button>
        <!-- Create because because there is no step id -->
        <button
          type="button"
          class="btn btn-outline-primary mx-2"
          v-if="!stepId"
          v-on:click="post()"
        >Lưu</button>
        <!-- Put request -->
        <button type="button" class="btn btn-outline-primary mx-2" v-else v-on:click="putStep()">Lưu</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['trackId', 'stepId'],
  data() {
    return {
      step: {
        title: null,
        trackId: null,
        duration: null,
        content: null,
        embedLink: null
      }
    }
  },
  mounted: async function () {
    if (this.stepId) {
      this.step = await this.getStep(this.stepId);
    }
  },
  methods: {
    async post() {
      try {
        if (!await this.checkData()) {
          return;
        }
        await this.postStep(); 
        await this.backToSteps(this.trackId);
      } catch (e) {
        console.log(e);
      }
    },
    async checkData() {
      if (this.step.title === null) {
        this.$toast.error("Vui lòng nhập tiêu đề!", {
          duration: 5000
        });
        return false;
      }
      if (this.step.duration === null) {
        this.$toast.error("Vui lòng nhập thời gian!", {
          duration: 5000
        });
        return false;
      }
      return true;
    },
    async putStep() {
      try {
        this.step.trackId = this.trackId;
        let result = await this.$axios.put(`/api/step/${this.stepId}`, this.step);
        if (result.status === 200) {
          this.$toast.success("Sửa thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async postStep() {
      try {
        this.step.trackId = this.trackId;
        let result = await this.$axios.post("/api/step", this.step);
        if (result.status === 200) {
          this.$toast.success("Thêm thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getStep(id) {
      try {
        let result = await this.$axios.get(`/api/step/${id}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async backToSteps(id) {
      this.$emit('back', id);
    },
  }
}
</script>