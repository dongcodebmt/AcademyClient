<template>
  <div id="categories">
    <div class="row py-4">
      <div class="col-lg-12">
        <div class="card card-body border-0 shadow mb-4">
          <div class="mb-3">
            <label class="form-label">Danh sách các danh mục</label>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-0 rounded table-borderless">
                <thead class="thead-light">
                  <tr>
                    <th class="border-0 rounded-start">#</th>
                    <th class="border-0">Tên danh mục</th>
                    <th class="border-0 rounded-end">Thao tác</th>
                  </tr>
                </thead>
                <draggable v-model="categories" tag="tbody">
                  <tr v-for="(item, index) in categories" :key="index">
                    <td class="col-1">{{ item.id }}</td>
                    <td class="col-9">
                      <input
                        type="text"
                        class="form-control"
                        v-model="item.name"
                        v-on:click="item.edit = true"
                      />
                    </td>
                    <td class="col-2">
                      <!-- Delete local -->
                      <button
                        class="btn btn-outline-danger btn-sm"
                        v-if="!item.id"
                        v-on:click="removeItem(index)"
                      >
                        <fa-icon icon="trash-alt" />
                      </button>
                      <!-- Request delete method -->
                      <button
                        class="btn btn-outline-danger btn-sm"
                        v-on:click="deleteCategory(index)"
                        v-if="item.id"
                      >
                        <fa-icon icon="trash-alt" />
                      </button>
                      <!-- Post request -->
                      <button
                        class="btn btn-outline-primary btn-sm"
                        v-if="!item.id"
                        v-on:click="postCategory(index)"
                      >
                        <fa-icon icon="save" />
                      </button>
                      <!-- Put request -->
                      <button
                        class="btn btn-outline-primary btn-sm"
                        v-if="item.id && item.edit === true"
                        v-on:click="putCategory(index)"
                      >
                        <fa-icon icon="save" />
                      </button>
                    </td>
                  </tr>
                </draggable>
              </table>
            </div>
            <div class="d-flex justify-content-end mt-4">
              <button type="button" class="btn btn-outline-primary mx-2" v-on:click="insertItem()">
                <fa-icon icon="plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['role'],
  meta: {
    auth: { authority: 1 }
  },
  layout: "admin",
  head() {
    return {
      title: "Quản lý danh mục | Academy"
    };
  },
  data() {
    return {
      categories: [{
        id: 0,
        name: null,
        edit: false
      }]
    }
  },
  mounted: async function () {
    this.categories = await this.getCategories();
  },
  methods: {
    async removeItem(index) {
      this.categories.splice(index, 1);
    },
    async insertItem() {
      this.categories.push({ name: null });
    },
    async deleteCategory(index) {
      try {
        let id = this.categories[index].id;
        let result = await this.$axios.delete(`/api/category/${id}`);
        if (result.status === 200) {
          this.removeItem(index);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async putCategory(index) {
      try {
        let id = this.categories[index].id;
        let result = await this.$axios.put(`/api/category/${id}`, this.categories[index]);
        if (result.status === 200) {
          this.categories[index].edit = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async postCategory(index) {
      try {
        let result = await this.$axios.post("/api/category", this.categories[index]);
        if (result.status === 200) {
          this.removeItem(index);
          result.data.edit = false;
          this.categories.push(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCategories() {
      try {
        let result = await this.$axios.get("/api/category");
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