<template>
  <div id="exam">
    <div class="card card-body border-0 shadow mb-4">
      <div class="mb-3">
        <div class="mb-3">
          <label class="form-label">Câu hỏi</label>
          <tinymce :init="$store.state.tinymce" v-model="exam.question.content" />
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
              <draggable v-model="exam.options" tag="tbody">
                <tr v-for="(item, index) in exam.options" :key="index">
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
          <select class="form-select" aria-label="Danh mục" id="rightOption">
            <option
              v-for="(item, index) in exam.options"
              :value="index"
              v-bind:key="index"
              :selected="item.id === exam.rightOption.optionId"
            >{{ '#' + (index + 1) + ': ' + item.content }}</option>
          </select>
        </div>

        <div class="d-flex justify-content-end mt-4">
          <button type="button" class="btn btn-outline-primary mx-2" v-if="questionId" v-on:click="putQuestion()">Lưu</button>
          <button type="button" class="btn btn-outline-primary mx-2" v-else v-on:click="postQuestion()">Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['courseId', 'questionId'],
  data() {
    return {
      exam: {
        question: {
          id: null,
          courseId: this.courseId,
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
      this.exam = await this.getExamQuestion(this.questionId);
    }
  },
  methods: {
    async insertItem() {
      this.exam.options.push({ questionId: this.questionId, content: null });
    },
    async removeItem(index) {
      this.exam.options.splice(index, 1);
    },
    async putQuestion() {
      try {
        this.exam.rightOption.index = document.getElementById("rightOption").value;
        let result = await this.$axios.put("/api/exam/" + this.questionId, this.exam);
        if (result.data === 200) {
          this.$toast.success("Sửa câu hỏi thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async postQuestion() {
      try {
        this.exam.rightOption.index = document.getElementById("rightOption").value;
        let result = await this.$axios.post("/api/exam", this.exam);
        if (result.data === 200) {
          this.$toast.success("Thêm câu hỏi thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getExamQuestion(id) {
      try {
        let result = await this.$axios.get("/api/exam/" + id);
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