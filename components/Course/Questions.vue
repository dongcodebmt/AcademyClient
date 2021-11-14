<template>
  <div id="exams">
    <div class="card card-body border-0 shadow mb-4">
      <div class="mb-3">
        <label class="form-label">Danh sách các câu hỏi</label>
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0 rounded table-borderless">
            <thead class="thead-light">
              <tr>
                <th class="border-0 rounded-start">#</th>
                <th class="border-0">Câu hỏi</th>
                <th class="border-0 rounded-end">Thao tác</th>
              </tr>
            </thead>
            <draggable v-model="examQuestions" tag="tbody">
              <tr v-for="(item, index) in examQuestions" :key="index">
                <td class="col-1">{{ item.id }}</td>
                <td class="col-9" v-html="item.content">
                </td>
                <td class="col-2">
                  <button class="btn btn-outline-danger btn-sm" v-on:click="deleteExamQuestion(index)">Xóa</button>
                  <button
                    class="btn btn-outline-primary btn-sm"
                    v-on:click="openQuestion('edit', item.id)"
                  >Sửa</button>
                </td>
              </tr>
            </draggable>
          </table>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <button
            type="button"
            class="btn btn-outline-primary mx-2"
            v-on:click="openQuestion('create')"
          >Thêm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['examId'],
  data() {
    return {
      examQuestions: [],
    }
  },
  mounted: async function () {
    this.examQuestions = await this.getExamQuestions(this.examId);
  },
  methods: {
    async removeItem(index) {
        this.examQuestions.splice(index, 1);
    },
    async deleteExamQuestion(index) {
      try {
        let id = this.examQuestions[index].id;
        let result = await this.$axios.delete("/api/exam/" + id + "/question");
        if (result.status === 200) {
          await this.removeItem(index);
          this.$toast.success("Xóa câu hỏi thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getExamQuestions(examId) {
      try {
        let result = await this.$axios.get("/api/exam/" + examId + "/examquestions");
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async openQuestion(type, questionId = 0) {
      if (type === 'create') {
        this.$emit('create');
      } else if (type === 'edit') {
        this.$emit('edit', questionId);
      }
    }
  }
}
</script>