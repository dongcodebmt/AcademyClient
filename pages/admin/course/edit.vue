<template>
  <div id="createCourse">
    <div class="row py-4">
      <div class="col-lg-3">
        <div class="row">
          <div class="col-12 mb-4">
            <div class="list-group">
              <a
                class="list-group-item list-group-item-action"
                :class="{ active: selected === 1 }"
                v-on:click="selected = 1"
              >Thông tin khóa học</a>
              <a
                class="list-group-item list-group-item-action"
                :class="{ active: selected === 2 }"
                v-on:click="selected = 2"
              >Kiến thức sẽ được học</a>
              <a
                class="list-group-item list-group-item-action"
                :class="{ active: selected === 3 }"
                v-on:click="selected = 3"
              >Yêu cầu khi tham gia khóa học</a>
              <a
                class="list-group-item list-group-item-action"
                :class="{ active: selected === 4 }"
                v-on:click="selected = 4"
              >Danh sách phần học</a>
              <a
                class="list-group-item list-group-item-action disabled"
                :class="{ active: selected === 5 }"
              >Danh sách bài học</a>
              <a
                class="list-group-item list-group-item-action disabled"
                :class="{ active: selected === 6 }"
              >Nội dung bài học</a>
              <a
                class="list-group-item list-group-item-action"
                :class="{ active: selected === 7 }"
                v-on:click="selected = 7"
              >Danh sách bài kiểm tra</a>
              <a
                class="list-group-item list-group-item-action disabled"
                :class="{ active: selected === 8 }"
              >Danh sách câu hỏi</a>
              <a
                class="list-group-item list-group-item-action disabled"
                :class="{ active: selected === 9 }"
              >Nội dung câu hỏi</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-9" v-if="selected === 1">
        <Course v-bind:courseId="id" />
      </div>
      <!-- Will learns -->
      <div class="col-lg-9" v-if="selected === 2">
        <WillLearns v-bind:courseId="id" />
      </div>
      <!-- End will learns -->
      <!-- Requirements -->
      <div class="col-lg-9" v-if="selected === 3">
        <Requirements v-bind:courseId="id" />
      </div>
      <!-- End requirements -->
      <!-- Tracks -->
      <div class="col-lg-9" v-if="selected === 4">
        <Tracks v-bind:courseId="id" v-on:open="openSteps($event)" />
      </div>
      <!-- End tracks -->
      <!-- List steps -->
      <div class="col-lg-9" v-if="selected === 5">
        <Steps
          v-bind:trackId="trackId"
          v-on:create="openStep('create')"
          v-on:edit="openStep('edit', $event)"
        />
      </div>
      <!-- End list steps -->
      <!-- Step -->
      <div class="col-lg-9" v-if="selected === 6">
        <Step v-bind:trackId="trackId" v-bind:stepId="stepId" v-on:back="openSteps($event)" />
      </div>
      <!-- End step -->
      <!-- Exam list -->
      <div class="col-lg-9" v-if="selected === 7">
        <Exams v-bind:courseId="id" v-on:open="openExam($event)" />
      </div>
      <!-- End exam list -->
      <!-- Questions list -->
      <div class="col-lg-9" v-if="selected === 8">
        <Questions
          v-bind:examId="examId"
          v-on:create="openQuestion('create')"
          v-on:edit="openQuestion('edit', $event)"
        />
      </div>
      <!-- End questions list -->
      <!-- Question -->
      <div class="col-lg-9" v-if="selected === 9">
        <Question
          v-bind:examId="examId"
          v-bind:questionId="questionId"
          v-on:back="openExam($event)"
        />
      </div>
      <!-- End question -->
    </div>
  </div>
</template>

<script>
import Course from "~/components/Course/Course.vue"
import WillLearns from "~/components/Course/WillLearns.vue"
import Requirements from "~/components/Course/Requirements.vue"
import Tracks from "~/components/Course/Tracks.vue"
import Steps from "~/components/Course/Steps.vue"
import Step from "~/components/Course/Step.vue"
import Exams from "~/components/Course/Exams.vue"
import Questions from "~/components/Course/Questions.vue"
import Question from "~/components/Course/Question.vue"

export default {
  layout: "admin",
  components: { Course, WillLearns, Requirements, Tracks, Steps, Step, Exams, Questions, Question },
  data() {
    return {
      selected: 1,
      id: this.$route.query.id,
      trackId: null,
      stepId: null,
      examId: null,
      questionId: null,
    }
  },
  mounted: async function () {
    if (!this.id) {
      this.$router.push({ path: "/admin/course/list" });
    }
  },
  methods: {
    async openExam(examId) {
      this.selected = 8;
      this.examId = examId;
    },
    async openQuestion(type, questionId = 0) {
      this.selected = 9;
      this.questionId = null;
      if (type === 'edit') {
        this.questionId = questionId;
      }
    },
    async openSteps(trackId) {
      this.selected = 5;
      this.trackId = trackId;
      this.stepId = null;
    },
    async openStep(type, stepId = 0) {
      this.selected = 6;
      this.stepId = null;
      if (type === "edit") {
        this.stepId = stepId;
      }
    }
  }
}
</script>