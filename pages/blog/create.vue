<template>
  <div id="createPost">
    <div class="row py-4">
      <div class="col-lg-9">
        <div class="card card-body border-0 shadow mb-4">
          <div class="mb-3">
            <label for="title" class="form-label">Tiêu đề</label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="Tiêu đề"
              v-model="blog.title"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Nội dung</label>
            <client-only>
              <tinymce v-model="blog.content" :init="$store.state.tinymce" />
            </client-only>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="row">
          <div class="col-12">
            <div class="card card-body border-0 shadow mb-4">
              <h2 class="h5 mb-4">Chọn danh mục</h2>
              <select class="form-select" aria-label="Danh mục" v-model="blog.categoryId">
                <option value="0" selected>Vui lòng chọn danh mục</option>
                <option
                  v-for="item in categories"
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
                    :src="[ blog.picturePath && blog.picturePath !== '/' ? blog.picturePath : require('@/assets/img/empty.png') ]"
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
                >Đăng</button>
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
  middleware: ['role'],
  meta: {
    auth: { authority: 4 }
  },
  head() {
    return {
      title: "Viết blog | Academy"
    };
  },
  data() {
    return {
      categories: [{
        id: null,
        name: null
      }],
      file: null,
      blog: {
        userId: this.$auth.user.id,
        categoryId: 0,
        title: null,
        content: null,
        pictureId: null,
        picturePath: null
      }
    }
  },
  mounted: async function () {
    this.categories = await this.getCategories();
  },
  methods: {
    async uploadFile() {
      // Initialize the form data
      let formData = new FormData();
      formData.append('file', this.file);
      try {
        let result = await this.$axios.post("/api/picture/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        this.$toast.error("Hình ảnh đã chọn không hợp lệ!", {
          duration: 5000
        });
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.blog.picturePath = URL.createObjectURL(this.file);
    },
    async postBlog() {
      try {
        if (this.blog.categoryId == 0) {
          this.$toast.error("Vui lòng chọn danh mục!", {
            duration: 5000
          });
          return;
        }

        if (!this.blog.title) {
          this.$toast.error("Vui lòng nhập tiêu đề!", {
            duration: 5000
          });
          return;
        }

        if (!this.blog.content || this.blog.content.length < 10) {
          this.$toast.error("Nội dung quá ngắn!", {
            duration: 5000
          });
          return;
        }

        if (this.blog.picturePath) {
          let picture = await this.uploadFile();
          this.blog.pictureId = picture.id;
        }
        let result = await this.$axios.post("/api/blog", this.blog);
        if (result.status === 200) {
          this.$toast.success("Đăng blog thành công!", {
            duration: 5000
          });
          this.$router.push(`/blog/view?id=${result.data.id}`);
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