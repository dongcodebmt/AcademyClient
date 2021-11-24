<template>
  <div id="questions">
    <div class="row d-flex justify-content-center">
      <div class="col-lg-9 gy-4" v-if="isTested">
        <div class="card border-0 shadow mb-4">
          <div class="card-body d-flex justify-content-center">
            <h5 class="card-title">Bạn đã hoàn thành bài kiểm tra hoặc khóa học này rồi!</h5>
          </div>
        </div>
      </div>
      <div class="col-lg-9 gy-4" v-if="!start && !result && !isTested">
        <div class="card border-0 shadow mb-4">
          <div class="card-body">
            <p class="card-text">{{ exam.title }}</p>
            <p class="card-text">Thời gian làm bài kiểm tra: {{ secToMin(exam.examDuration) }}</p>
            <button class="btn btn-outline-primary" v-on:click="startExam()">Bắt đầu</button>
          </div>
        </div>
      </div>
      <div class="col-lg-9 gy-4" v-if="result">
        <div class="card border-0 shadow mb-4">
          <div class="card-body">
            <h2
              class="card-text"
            >Kết quả của bạn là: {{ result.noOfRightOption + '/' + result.noOfQuestion }}</h2>
            <h5 class="card-text">Số điểm của bạn là: {{ result.mark.toFixed(2) }}</h5>
            <p class="card-text">
              <nuxt-link :to="`/course/result?id=${examUserId}`">Xem chi tiết kết quả</nuxt-link>
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 gy-4" v-if="start">
        <div
          class="card card-body border-0 shadow mb-4"
          v-for="(item, index) in questions"
          :key="item.id"
        >
          <h4>Câu hỏi: {{ index + 1 }}</h4>
          <div class="card-text" v-html="item.question.content"></div>

          <div :id="'options' + item.question.id">
            <div class="form-check" v-for="i in item.options" :key="i.id">
              <input
                class="form-check-input"
                type="radio"
                :name="'options' + item.question.id"
                :id="'option' + i.id"
                :value="i.id"
                v-on:click="optionSelected(item.question.id, i.id)"
              />
              <label class="form-check-label" :for="'option' + i.id">{{ i.content }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 gy-4" v-if="start">
        <nav class="sticky-top">
          <div class="card border-0 shadow mb-4">
            <div class="card-body">
              <p class="card-text">{{ exam.title }}</p>
              <h2 class="card-text text-danger">{{ secToMin(timeSeconds) }}</h2>
              <button class="btn btn-outline-primary" v-on:click="timeSeconds = 0">Nộp bài</button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Kiểm tra | Academy"
    };
  },
  data() {
    return {
      id: this.$route.query.id,
      start: false,
      isTested: false,
      timeSeconds: 0,
      exam: {
        id: 0,
        courseId: 0,
        title: null,
        examDuration: 0
      },
      examUserId: 0,
      questions: [
        {
          question: {
            id: 0,
            courseId: 0,
            content: null
          },
          options: [
            {
              id: 0,
              questionId: 0,
              content: null
            }
          ],
          rightOption: null
        }
      ],
      answers: [],
      result: null
    }
  },
  mounted: async function () {
    if (this.id) {
      let is = await this.IsFinished(this.id);
      if (is === false) {
        this.exam = await this.getExam(this.id);
      } else {
        this.isTested = true;
      }
    }
  },
  methods: {
    async requestCertify(courseId) {
      try {
        let result = await this.$axios.post(`/api/course/${courseId}/certify`);
        if (result.status === 200 && result.data === true) {
          return true;
        }
      } catch (e) {
        console.log(e);
      }
      return false;
    },
    async IsFinished(examId) {
      try {
        let result = await this.$axios.get(`/api/exam/${examId}/IsFinished`);
        if (result.status === 200 && result.data === true) {
          return true;
        }
      } catch (e) {
        console.log(e);
      }
      return false;
    },
    async postAnswers(examUserId, data) {
      if (!examUserId) {
        return;
      }
      try {
        let result = await this.$axios.post(`/api/exam/${examUserId}/answers`, data);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    //Get current exam info of user
    async getOwnExam(examId) {
      try {
        let result = await this.$axios.get(`/api/exam/${examId}/test`);
        if (result.status === 200) {
          return result.data.id;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async startExam() {
      this.examUserId = await this.getOwnExam(this.id);
      if (this.examUserId != 0) {
        this.start = true;
        this.questions = await this.getExamQuestions(this.id);
        this.timeSeconds = this.exam.examDuration;

        this.timeCounter();
      }
    },
    async optionSelected(questionId, optionId) {
      let data = this.answers.find(x => x.questionId == questionId);
      if (data) {
        data.optionId = optionId;
      } else {
        this.answers.push({ questionId: questionId, optionId: optionId });
      }
    },
    async timeCounter() {
      let timer = setInterval(async () => {
        if (this.timeSeconds !== 0) {
          --this.timeSeconds
        } else {
          //Clear interval, post answer options and request certify
          clearInterval(timer);
          this.result = await this.postAnswers(this.examUserId, this.answers);
          this.start = false;
          await this.requestCertify(this.exam.courseId);
        }
      }, 1000);
    },
    secToMin(seconds) {
      let format = val => `0${Math.floor(val)}`.slice(-2);
      let hours = seconds / 3600;
      let minutes = (seconds % 3600) / 60;

      return [hours, minutes, seconds % 60].map(format).join(':');
    },
    async getExam(examId) {
      try {
        let result = await this.$axios.get(`/api/exam/${examId}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getExamQuestions(examId) {
      try {
        let result = await this.$axios.get(`/api/exam/${examId}/ExamQuestions`);
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

<style>
.content {
  overflow: unset;
}

html {
  overflow-x: hidden;
}

main {
  overflow: unset;
}
</style>