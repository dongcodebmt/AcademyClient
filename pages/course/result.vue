<template>
  <div id="questions">
    <div class="row d-flex justify-content-center">
      <div class="col-lg-9 gy-4">
        <div class="card border-0 shadow mb-4">
          <div class="card-body">
            <h4 class="d-flex justify-content-center card-title">Chi tiết bài kiểm tra</h4>
            <h5 class="d-flex justify-content-center card-title">{{ result.title }}</h5>
            <p class="card-text">Thời bắt đầu làm bài: {{ new Date(result.startedAt).toLocaleString() }}</p>
            <p
              class="card-text"
            >Thời gian làm bài: {{ secToMin((new Date(result.completedAt) - new Date(result.startedAt))/1000) }}</p>
            <p class="card-text">Câu đúng: {{ result.noOfRightOption }}</p>
            <p class="card-text">Câu sai: {{ result.noOfQuestion - result.noOfRightOption }}</p>
            <h5 class="card-text text-danger">Điểm: {{ result.mark.toFixed(2) }}</h5>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <div
          class="card card-body border-0 shadow mb-4"
          v-for="(item, index) in result.details"
          :key="item.id"
        >
          <h4>Câu hỏi: {{ index + 1 }}</h4>
          <div class="card-text" v-html="item.questionContent"></div>

          <div :id="'options' + item.questionId">
            <div class="form-check">
              <input
                class="form-check-input"
                :class="item.isRight ? 'bg-success' : 'bg-danger'"
                type="radio"
                :name="'options' + item.questionId"
                :id="'option' + item.optionId"
                :value="item.optionId"
                checked
              />
              <label
                class="form-check-label text-white"
                :class="item.isRight ? 'bg-success' : 'bg-danger'"
                :for="'option' + item.optionId"
              >{{ item.optionContent }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Kết quả bài kiểm tra | Academy"
    };
  },
  data() {
    return {
      id: this.$route.query.id,
      result: {
        id: 0,
        userId: 0,
        examId: 0,
        noOfQuestion: 0,
        startedAt: null,
        completedAt: null,
        noOfRightOption: 0,
        mark: 0,
        title: null,
        details: [
          {
            questionId: 0,
            questionContent: null,
            optionId: 0,
            optionContent: null,
            isRight: true
          }
        ]
      }
    }
  },
  mounted: async function () {
    if (this.id) {
      this.result = await this.getExamResult(this.id);
    } else {
      this.$route.push("/");
    }
  },
  methods: {
    secToMin(seconds) {
      let format = val => `0${Math.floor(val)}`.slice(-2);
      let hours = seconds / 3600;
      let minutes = (seconds % 3600) / 60;

      return [hours, minutes, seconds % 60].map(format).join(':');
    },
    async getExamResult(examUserId) {
      try {
        let result = await this.$axios.get("/api/exam/" + examUserId + "/Result");
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