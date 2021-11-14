<template>
  <div id="questions">
    <div class="row d-flex justify-content-center">
      <div class="col-lg-9 gy-4" v-if="!start && !result">
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
            <h2 class="card-text">Kết quả của bạn là: {{ result.noOfRightOption + '/' + result.noOfQuestion }}</h2>
            <h5 class="card-text">Số điểm của bạn là: {{ (result.noOfRightOption/result.noOfQuestion*10).toFixed(2) }}</h5>
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
  data() {
    return {
      id: this.$route.query.id,
      start: false,
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
      this.exam = await this.getExam(this.id);
    }
  },
  methods: {
    async postAnswers(examUserId, data) {
      if (!examUserId) {
        return;
      }
      try {
        let result = await this.$axios.post("/api/exam/" + examUserId + "/answers", data);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getOwnExam(examId) {
      try {
        let result = await this.$axios.get("/api/exam/" + examId + "/test");
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
          clearInterval(timer);
          this.result = await this.postAnswers(this.examUserId, this.answers);
          this.start = false;
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
        let result = await this.$axios.get("/api/exam/" + examId);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getExamQuestions(examId) {
      try {
        let result = await this.$axios.get("/api/exam/" + examId + "/questions");
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