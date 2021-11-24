<template>
  <div id="steps">
    <div class="card card-body border-0 shadow mb-4">
      <div class="mb-3">
        <label class="form-label">Danh sách các bài học</label>
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0 rounded table-borderless">
            <thead class="thead-light">
              <tr>
                <th class="border-0 rounded-start">#</th>
                <th class="border-0">Bài học</th>
                <th class="border-0 rounded-end">Thao tác</th>
              </tr>
            </thead>
            <draggable v-model="steps" tag="tbody">
              <tr v-for="(item, index) in steps" :key="index">
                <td class="col-1">{{ item.id }}</td>
                <td class="col-9">
                  <input type="text" class="form-control" v-model="item.title" />
                </td>
                <td class="col-2">
                  <!-- Delete local -->
                  <button
                    class="btn btn-outline-danger btn-sm"
                    v-on:click="removeItem(index)"
                    v-if="!item.id"
                  >Xóa</button>
                  <!-- Delete request -->
                  <button
                    class="btn btn-outline-danger btn-sm"
                    v-on:click="deleteStep(index)"
                    v-if="item.id"
                  >Xóa</button>
                  <button class="btn btn-outline-primary btn-sm" v-on:click="openStep('edit', item.id)">Sửa</button>
                </td>
              </tr>
            </draggable>
          </table>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <button
            type="button"
            class="btn btn-outline-primary mx-2"
            v-on:click="openStep('create')"
          >Thêm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['trackId'],
  data() {
    return {
      steps: [],
    }
  },
  mounted: async function () {
    this.steps = await this.getSteps(this.trackId);
  },
  methods: {
    async openStep(type, id = 0) {
      if (type === "create") {
        this.$emit('create');
      } else if (type === "edit") {
        this.$emit('edit', id);
      }
    },
    async removeItem(index) {
      this.steps.splice(index, 1);
    },
    async deleteStep(index) {
      try {
        let id = this.steps[index].id;
        let result = await this.$axios.delete(`/api/step/${id}`);
        if (result.status === 200) {
          this.removeItem(index);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getSteps(trackId) {
      try {
        let result = await this.$axios.get(`/api/track/${trackId}/steps`);
        if (result.status === 200) {
          return result.data;
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
