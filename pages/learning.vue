<template>
  <div class="learning">
    <div class="py-4">
      <div class="row">
        <div class="col-lg-8">
          <div class="card bg-primary mb-4" v-if="step.embedLink">
            <div id="player">
              <iframe :src="step.embedLink" style="min-height: 570px" width="95%" class="mx-4 my-4"></iframe>
            </div>
          </div>
          <div class="card mb-4" v-if="step.content">
            <div class="card-body border-0 shadow">
              <h5 class="card-title">{{ step.title }}</h5>
              <p class="card-text" v-html="step.content"></p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card card-body border-0 shadow mb-4">
            <div class="row align-items-center mb-3">
              <div class="col-auto">
                <fa-icon icon="book-open" />
              </div>
              <div class="col">
                <div class="progress-wrapper">
                  <div class="progress-info">
                    <div class="h6 mb-0">Tiến độ khóa học</div>
                    <div class="small fw-bold text-gray-500">
                      <span>75 %</span>
                    </div>
                  </div>
                  <div class="progress mb-0">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style="width: 75%;"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card card-body border-0 shadow mb-4">
            <div class="accordion" id="tracksteps">
              <div class="accordion-item" v-for="item in trackSteps" :key="item.id">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapse' + item.id"
                  >{{ item.title }}</button>
                </h2>
                <div :id="'collapse' + item.id" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <div class="list-group">
                      <a
                        class="list-group-item rounded"
                        v-for="i in item.steps"
                        :key="i.id"
                        :class="{ active: i.id === stepId }"
                        v-on:click="getStep(i.id)"
                      >{{ i.title }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      stepId: 0,
      step: {
        id: null,
        trackId: 0,
        title: null,
        duration: 0,
        content: null,
        embedLink: null
      },
      trackSteps: [],
    }
  },
  mounted: async function () {
    if (this.id) {
      this.trackSteps = await this.getTrackSteps(this.id);
    }
  },
  methods: {
    async getStep(stepId) {
      this.stepId = stepId;
      try {
        let result = await this.$axios.get("/api/Step/" + stepId);
        if (result.status === 200) {
          this.step = result.data;
          // High light code
          setTimeout(() => {
            Prism.manual = true;
            Prism.highlightAll();
          }, 1000);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getTrackSteps(courseId) {
      try {
        let result = await this.$axios.get("api/Course/" + courseId + "/TrackSteps");
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>