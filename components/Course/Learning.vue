<template>
  <div class="learning">
    <div class="py-4">
      <div class="row">
        <div class="col-lg-8">
          <div class="mb-4" v-if="step.embedLink">
            <div id="player" class="ratio ratio-16x9">
              <iframe :src="step.embedLink" class="rounded" allowfullscreen></iframe>
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
                      <span>{{ getPercent() + '%' }}</span>
                    </div>
                  </div>
                  <div class="progress mb-0">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      :aria-valuenow="getPercent()"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      :style="'width: ' + getPercent() + '%;'"
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
                        :class="{ active: i.id === currentStepId, disabled: isDisable(i) }"
                        v-on:click="getStep(item.id, i.id)"
                      >{{ i.title }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Exam -->
              <div class="accordion-item" v-if="getPercent() >= 100 && exams.length > 0">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#exam"
                  >Làm bài kiểm tra</button>
                </h2>
                <div id="exam" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <div class="list-group">
                      <nuxt-link
                        class="list-group-item rounded"
                        v-for="item in exams"
                        :key="item.id"
                        :to="`/course/exam?id=${item.id}`"
                      >{{ item.title }}</nuxt-link>
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
  props: ['id'],
  data() {
    return {
      currentStepId: 0,
      nextStepId: 0,
      step: {
        id: null,
        trackId: 0,
        title: null,
        duration: 0,
        content: null,
        embedLink: null
      },
      trackSteps: [],
      exams: [],
      progress: {
        total: 0,
        completed: 0
      }
    }
  },
  mounted: async function () {
    if (this.id) {
      this.trackSteps = await this.getTrackSteps(this.id);
      this.exams = await this.getExams(this.id);
      await this.handleProgress();
      if (this.getPercent() >= 100) {
        this.showToastCompleted();
      }
    }
  },
  methods: {
    showToastCompleted() {
      this.$toast.success("Xin chúc mừng! Bạn đã hoàn thành tất cả bài học.", {
        duration: 5000,
        action: [
          {
            text: 'X',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          },
        ]
      });
    },
    getPercent() {
      let result = (this.progress.completed / this.progress.total) * 100;
      return result ? result.toFixed(2) : 0;
    },
    isDisable(item) {
      if (this.nextStepId === item.id) {
        return false;
      }
      if (item.completed === true) {
        return false;
      }
      return true;
    },
    async handleProgress() {
      for (let item of this.trackSteps) {
        this.progress.total += item.steps.length;
        for (let i of item.steps) {
          //Select current progress
          if (this.currentStepId === 0 && i.completed === false) {
            this.getStep(item.id, i.id);
            let d = document.getElementById("collapse" + item.id);
            if (d) {
              d.className += " show";
            }
            this.currentStepId = i.id;
            this.nextStepId = i.id;
          }
          //Count completed step
          if (i.completed === true) {
            this.progress.completed += 1;
          }
        }
      }

      //Show last step if completed
      if (this.currentStepId === 0) {
        let lastTrack = this.trackSteps[this.trackSteps.length - 1];
        let lastStep =  lastTrack.steps[lastTrack.steps.length - 1];
        this.getStep(lastTrack.id, lastStep.id);
        let d = document.getElementById("collapse" + lastTrack.id);
        if (d) {
          d.className += " show";
        }
        this.currentStepId = lastStep.id;
        this.nextStepId = lastStep.id;
      }
    },
    async getExams(courseId) {
      try {
        let result = await this.$axios.get(`/api/course/${courseId}/exams`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getStep(trackId, stepId) {
      this.currentStepId = stepId;
      try {
        let result = await this.$axios.get(`/api/step/${stepId}`);
        if (result.status === 200) {
          this.step = result.data;
          this.highLightCode();
          // Mark as complete
          this.completeTiming(trackId, stepId);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async completeTiming(trackId, stepId) {
      try {
        let trackIndex = this.trackSteps.findIndex(x => x.id === trackId);
        let stepIndex = this.trackSteps[trackIndex].steps.findIndex(x => x.id === stepId);
        let duration = ((this.trackSteps[trackIndex].steps[stepIndex].duration * 70) / 100) * 1000;
        if (this.trackSteps[trackIndex].steps[stepIndex].completed === true) {
          return;
        }
        setTimeout(async () => {
          let result = await this.markAsComplete(stepId);
          if (result) {
            this.nextStepId = await this.getNextStep(stepId);
            this.trackSteps[trackIndex].steps[stepIndex].completed = true;
            this.progress.completed += 1;
          }

          //Show message if user completed
          if (this.getPercent() >= 100) {
            this.showToastCompleted();
          }
        }, duration)
      } catch (e) {
        console.log(e);
      }
    },
    async getNextStep(stepId) {
      let next = false;
      for (let i = 0; i < this.trackSteps.length; i++) {
        for (let j = 0; j < this.trackSteps[i].steps.length; j++) {
          let id = this.trackSteps[i].steps[j].id;
          if (next) {
            return id;
          }
          if (id === stepId) {
            next = true;
          }
        }
      }
      return 0;
    },
    async markAsComplete(stepId) {
      try {
        if (!stepId || stepId === 0) {
          return;
        }
        let result = await this.$axios.post(`/api/step/${stepId}/progress`);
        if (result.status === 200 && result.data === true) {
          return true;
        }
      } catch (e) {
        console.log(e);
      }
      return false;
    },
    async getTrackSteps(courseId) {
      try {
        let result = await this.$axios.get(`api/course/${courseId}/tracksteps`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async highLightCode() {
      setTimeout(() => {
        Prism.manual = true;
        Prism.highlightAll();
      }, 600);
    }
  }
}
</script>