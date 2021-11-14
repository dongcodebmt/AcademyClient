<template>
  <div id="createPost">
    <div class="row py-4">
      <div class="col-lg-9">
        <div class="card card-body border-0 shadow mb-4">
          <div class="mb-3">
            <label for="title" class="form-label">Tiêu đề</label>
            <input type="text" class="form-control" id="title" placeholder="Title" v-model="title" />
          </div>
          <div class="mb-3">
            <label class="form-label">Bạn muốn hỏi gì?</label>
            <client-only>
              <tinymce v-model="content" :init="$store.state.tinymce" />
            </client-only>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="row">
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
          <div class="col-12">
            <div class="card card-body border-0 shadow mb-4">
              <h2 class="h5 mb-4">Chọn ảnh đại diện</h2>
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <!-- Avatar -->
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
                  v-on:click="postBlog()"
                >Lưu</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    async test() {
      Prism.manual = true;
      Prism.highlightAll();
    },
    async postBlog() {
      try {
        let data = {
          userId: this.$auth.user.id,
          categoryId: this.categories.selected,
          title: this.title,
          content: this.content
        }
        let result = await this.$axios.post("/api/blog", data);
        if (result.status === 200) {
          this.$toast.success("Viết blog thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCategories() {
      try {
        let result = await this.$axios.get("/api/category");
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