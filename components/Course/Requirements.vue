<template>
  <div id="requirements">
    <div class="card card-body border-0 shadow mb-4">
      <div class="mb-3">
        <label class="form-label">Các yều trước khi tham gia khóa học</label>
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0 rounded table-borderless">
            <thead class="thead-light">
              <tr>
                <th class="border-0 rounded-start">#</th>
                <th class="border-0">Yêu cầu</th>
                <th class="border-0 rounded-end">Thao tác</th>
              </tr>
            </thead>
            <draggable v-model="requirements" tag="tbody">
              <tr v-for="(item, index) in requirements" :key="index">
                <td class="col-1">{{ item.id }}</td>
                <td class="col-9">
                  <input
                    type="text"
                    class="form-control"
                    v-model="item.content"
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
                    v-on:click="deleteRequirement(index)"
                    v-if="item.id"
                  >Xóa</button>
                  <!-- Post request -->
                  <button
                    class="btn btn-outline-primary btn-sm"
                    v-if="!item.id"
                    v-on:click="postRequirement(index)"
                  >Lưu</button>
                  <!-- Put request -->
                  <button
                    class="btn btn-outline-primary btn-sm"
                    v-if="item.id && item.edit === true"
                    v-on:click="putRequirement(index)"
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
      requirements: [],
    }
  },
  mounted: async function() {
    this.requirements = await this.getRequirements(this.courseId);
  },
  methods: {
    async removeItem(index) {
        this.requirements.splice(index, 1);
    },
    async insertItem() {
        this.requirements.push({ courseId: this.courseId, content: null });
    },
    async deleteRequirement(index) {
      try {
        let id = this.requirements[index].id;
        let result = await this.$axios.delete(`/api/requirement/${id}`);
        if (result.status === 200) {
          this.removeItem(index);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async putRequirement(index) {
      try {
        let id = this.requirements[index].id;
        let result = await this.$axios.put(`/api/requirement/${id}`, this.requirements[index]);
        if (result.status === 200) {
          this.requirements[index].edit = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async postRequirement(index) {
      try {
        let result = await this.$axios.post("/api/requirement", this.requirements[index]);
        if (result.status === 200) {
          this.removeItem(index);
          result.data.edit = false;
          this.requirements.push(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getRequirements(courseId) {
      try {
        let result = await this.$axios.get(`/api/course/${courseId}/requirements`);
        if (result.status === 200) {
          return await this.addFlag(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addFlag(data) {
      try {
        data = JSON.parse(JSON.stringify(data));
        data.forEach(element => element.edit = false);
      } catch (e) {
        console.log(e);
      }
      return data;
    }
  }
}
</script>