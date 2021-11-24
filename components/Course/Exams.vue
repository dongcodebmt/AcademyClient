<template>
  <div id="exams">
    <div class="card card-body border-0 shadow mb-4">
      <div class="mb-3">
        <label class="form-label">Danh sách các bài kiểm tra</label>
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0 rounded table-borderless">
            <thead class="thead-light">
              <tr>
                <th class="border-0 rounded-start">#</th>
                <th class="border-0">Bài kiểm tra</th>
                <th class="border-0">Thời gian kiểm tra</th>
                <th class="border-0 rounded-end">Thao tác</th>
              </tr>
            </thead>
            <draggable v-model="exams" tag="tbody">
              <tr v-for="(item, index) in exams" :key="index">
                <td class="col-1">{{ item.id }}</td>
                <td class="col-8">
                  <input
                    type="text"
                    class="form-control"
                    v-model="item.title"
                    v-on:click="item.edit = true"
                  />
                </td>
                <td class="col-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="item.examDuration"
                    v-on:click="item.edit = true"
                  />
                </td>
                <td class="col-2">
                  <!-- Delete local -->
                  <button
                    class="btn btn-outline-danger btn-sm"
                    v-if="!item.id"
                    v-on:click="removeItem(index)"
                  >Xóa</button>
                  <!-- Request delete method -->
                  <button
                    class="btn btn-outline-danger btn-sm"
                    v-on:click="deleteExam(index)"
                    v-if="item.id"
                  >Xóa</button>
                  <!-- Open list question with examID -->
                  <button
                    class="btn btn-outline-primary btn-sm"
                    v-if="item.id"
                    v-on:click="selectExam(item.id)"
                  >Quản lý</button>
                  <!-- Post request -->
                  <button
                    class="btn btn-outline-primary btn-sm"
                    v-if="!item.id"
                    v-on:click="postExam(index)"
                  >Lưu</button>
                  <!-- Put request -->
                  <button
                    class="btn btn-outline-primary btn-sm"
                    v-if="item.id && item.edit"
                    v-on:click="putExam(index)"
                  >Lưu</button>
                </td>
              </tr>
            </draggable>
          </table>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <button type="button" class="btn btn-outline-primary mx-2" v-on:click="insertItem()">Thêm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['courseId'],
  data() {
    return {
      exams: [],
    }
  },
  mounted: async function () {
    this.exams = await this.getExams(this.courseId);
  },
  methods: {
    async selectExam(id) {
      this.$emit('open', id);
    },
    async removeItem(index) {
      this.exams.splice(index, 1);
    },
    async insertItem() {
      this.exams.push({ courseId: this.courseId, title: null, examDuration: null });
    },
    async deleteExam(index) {
      try {
        let id = this.exams[index].id;
        let result = await this.$axios.delete(`/api/exam/${id}`);
        if (result.status === 200) {
          this.removeItem(index);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async putExam(index) {
      if (!await checkData(index)) {
        return;
      }
      try {
        let id = this.exams[index].id;
        let result = await this.$axios.put(`/api/exam/${id}`, this.exams[index]);
        if (result.status === 200) {
          this.exams[index].edit = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async postExam(index) {
      if (!await checkData(index)) {
        return;
      }
      try {
        let result = await this.$axios.post("/api/exam", this.exams[index]);
        if (result.status === 200) {
          this.removeItem(index);
          result.data.edit = false;
          this.exams.push(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async checkData(index) {
      if (this.exams[index].title === null) {
        this.$toast.error("Vui lòng nhập tiêu đề!", {
          duration: 5000
        });
        return false;
      }
      if (this.exams[index].examDuration < 300 || this.exams[index].examDuration > 21600) {
        this.$toast.error("Thời gian cần lớn hơn 300s và nhỏ hơn 21.600s!", {
          duration: 5000
        });
        return false;
      }
      return true;
    },
    async getExams(courseId) {
      try {
        let result = await this.$axios.get(`/api/course/${courseId}/exams`);
        if (result.status === 200) {
          return await this.addFlag(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addFlag(data) {
      data = JSON.parse(JSON.stringify(data));
      data.forEach(element => element.edit = false);
      return data;
    }
  }
}
</script>