<template>
  <div id="exam">
    <div class="card card-body border-0 shadow mb-4">
      <div class="mb-3">
        <div class="mb-3">
          <label class="form-label">Câu hỏi</label>
          <tinymce :init="$store.state.tinymce" v-model="questionFull.question.content" />
        </div>

        <div class="mb-3">
          <label class="form-label">Đáp án</label>
          <div class="table-responsive">
            <table class="table table-centered table-nowrap mb-0 rounded table-borderless">
              <thead class="thead-light">
                <tr>
                  <th class="border-0 rounded-start">#</th>
                  <th class="border-0">Câu hỏi</th>
                  <th class="border-0 rounded-end">Thao tác</th>
                </tr>
              </thead>
              <draggable v-model="questionFull.options" tag="tbody">
                <tr v-for="(item, index) in questionFull.options" :key="index">
                  <td class="col-1">{{ index + 1 }}</td>
                  <td class="col-9">
                    <input type="text" class="form-control" v-model="item.content" />
                  </td>
                  <td class="col-2">
                    <button class="btn btn-outline-danger btn-sm" v-on:click="removeItem(index)">Xóa</button>
                  </td>
                </tr>
              </draggable>
            </table>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <button
              type="button"
              class="btn btn-outline-primary mx-2"
              v-on:click="insertItem()"
            >Thêm</button>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Đáp án đúng</label>
          <select class="form-select" id="rightOption">
            <option
              v-for="(item, index) in questionFull.options"
              :value="index"
              v-bind:key="index"
              :selected="item.id === questionFull.rightOption.optionId"
            >{{ '#' + (index + 1) + ': ' + item.content }}</option>
          </select>
        </div>

        <div class="d-flex justify-content-end mt-4">
          <button
            type="button"
            class="btn btn-outline-warning mx-2"
            v-on:click="backToQuestions(examId)"
          >Quay lại</button>
          <button
            type="button"
            class="btn btn-outline-primary mx-2"
            v-if="questionId"
            v-on:click="putQuestion()"
          >Lưu</button>
          <button
            type="button"
            class="btn btn-outline-primary mx-2"
            v-else
            v-on:click="postQuestion()"
          >Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['examId', 'questionId'],
  data() {
    return {
      questionFull: {
        question: {
          id: null,
          examId: this.examId,
          content: null
        },
        options: [],
        rightOption: {
          questionId: 0,
          optionId: 0
        }
      }
    }
  },
  mounted: async function () {
    if (this.questionId) {
      this.questionFull = await this.getQuestionFull(this.questionId);
    }
  },
  methods: {
    async backToQuestions(id) {
      this.$emit('back', id);
    },
    async insertItem() {
      this.questionFull.options.push({ questionId: this.questionId, content: null });
    },
    async removeItem(index) {
      this.questionFull.options.splice(index, 1);
    },
    async checkData() {
      try {
        if (!this.questionFull.question.content || this.questionFull.question.content.length < 10) {
          this.$toast.error("Câu hỏi quá ngắn!", {
            duration: 5000
          });
          return false;
        }
        if (this.questionFull.options.length < 2) {
          this.$toast.error("Vui lòng nhập ít nhất hai đáp án!", {
            duration: 5000
          });
          return false;
        }
        let list = this.questionFull.options;
        list.forEach((element, index) => {
          if (!element.content) {
            this.$toast.error(`Vui lòng nhập nội dung cho đáp án ${index+1}!`, {
              duration: 5000
            });
            return false;
          }
        });
      } catch (e) {
        return false;
      }
      return true;
    },
    async putQuestion() {
      if (!await this.checkData()) {
        return;
      }
      try {
        this.questionFull.rightOption.index = document.getElementById("rightOption").value;
        let result = await this.$axios.put(`/api/exam/${this.questionId}/question`, this.questionFull);
        if (result.status === 200) {
          this.$toast.success("Sửa câu hỏi thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async postQuestion() {
      if (!await this.checkData()) {
        return;
      }
      try {
        this.questionFull.rightOption.index = document.getElementById("rightOption").value;
        let result = await this.$axios.post(`/api/exam/${this.examId}/question`, this.questionFull);
        if (result.status === 200) {
          this.$toast.success("Thêm câu hỏi thành công!", {
            duration: 5000
          });
          this.backToQuestions(this.examId);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getQuestionFull(questionId) {
      try {
        let result = await this.$axios.get(`/api/exam/${questionId}/QuestionFull`);
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