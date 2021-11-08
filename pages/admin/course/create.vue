<template>
  <div id="createCourse">
    <div class="row py-4">
      <div class="col-lg-9">
        <div class="card card-body border-0 shadow mb-4">
          <!-- Title -->
          <div class="mb-3">
            <label for="title" class="form-label">Tên khóa học</label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="Khóa học"
              v-model="title"
            />
          </div>
          <!-- End title -->
          <!-- Course content -->
          <div class="mb-3">
            <label class="form-label">Tóm tắt nội dung khóa học</label>
            <tinymce v-model="content" :init="$store.state.tinymce" />
          </div>
          <!-- End course content -->
        </div>
      </div>
      <div class="col-lg-3">
        <div class="row">
          <!-- Categories -->
          <div class="col-12">
            <div class="card card-body border-0 shadow mb-4">
              <h2 class="h5 mb-4">Chọn danh mục</h2>
              <select class="form-select" aria-label="Danh mục" v-model="categories.selected">
                <option value="0" selected>Vui lòng chọn danh mục</option>
                <option
                  v-for="item in categories.list"
                  :value="item.id"
                  v-bind:key="item.id"
                >{{ item.name }}</option>
              </select>
            </div>
          </div>
          <!-- End categories -->
          <!-- Course image -->
          <div class="col-12">
            <div class="card card-body border-0 shadow mb-4">
              <h2 class="h5 mb-4">Chọn ảnh đại diện</h2>
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <img
                    class="rounded avatar-xl"
                    alt="change avatar"
                    style="object-fit: cover;"
                    src="@/assets/img/team/blank-profile.png"
                  />
                </div>
                <div class="file-field">
                  <div class="d-flex justify-content-xl-center ms-xl-3">
                    <div class="d-flex">
                      <input type="file" @change="handleFileUpload( $event )" />
                      <fa-icon icon="paperclip" class="icon text-gray-500 me-2" />
                      <div class="d-md-block text-left">
                        <div class="fw-normal text-dark mb-1">Chọn ảnh</div>
                        <div class="text-gray small">JPG, GIF hoặc PNG</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end mt-3">
                <button
                  class="btn btn-gray-800 mt-2 animate-up-2"
                  type="submit"
                  v-on:click="postCourse()"
                >Lưu</button>
              </div>
            </div>
          </div>
          <!-- End course image -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      pictureId: null,
      categories: {
        selected: 0,
        list: [{
          id: null,
          name: null
        }]
      },
      title: null,
      content: null
    }
  },
  mounted: async function () {
    this.categories.list = await this.getCategories();
  },
  methods: {
    async postCourse() {
      let data = {
        lecturerId: this.$auth.user.id,
        categoryId: this.categories.selected,
        pictureId: this.pictureId,
        title: this.title,
        description: this.content
      }
      try {
        let result = await this.$axios.post("/api/course", data);
        if (result.status === 200) {
          this.id = result.data.id;
          this.$router.push({path: "/admin/course/edit", query: {id: this.id}});
        }
      } catch(e) {
        console.log(e);
      }
    },
    async getCategories() {
      try {
        let result = await this.$axios.get("/api/category");
        if (result.status === 200) {
          return result.data.categories;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>