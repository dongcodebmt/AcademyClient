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
              v-model="course.title"
            />
          </div>
          <!-- End title -->
          <!-- Course content -->
          <div class="mb-3">
            <label class="form-label">Tóm tắt nội dung khóa học</label>
            <tinymce v-model="course.description" :init="$store.state.tinymce" />
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
              <select class="form-select" aria-label="Danh mục" v-model="course.categoryId">
                <option value="0" selected>Vui lòng chọn danh mục</option>
                <option
                  v-for="item in categories"
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
                    class="rounded"
                    height="120"
                    style="object-fit: cover; max-height: 120px;"
                    :src="[ course.picturePath && course.picturePath !== '/' ? course.picturePath : require('@/assets/img/empty.png') ]"
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
  middleware: ['role'],
  meta: {
    auth: { authority: 3 }
  },
  layout: "admin",
  head() {
    return {
      title: "Tạo khóa học | Academy"
    };
  },
  data() {
    return {
      id: null,
      categories: [{
        id: null,
        name: null
      }],
      course: {
        lecturerId: this.$auth.user.id,
        categoryId: 0,
        pictureId: null,
        title: null,
        description: null,
        picturePath: null
      },
      file: null,
    }
  },
  mounted: async function () {
    this.categories = await this.getCategories();
  },
  methods: {
    async postCourse() {
      try {
        if (this.course.categoryId == 0) {
          this.$toast.error("Vui lòng chọn danh mục!", {
            duration: 5000
          });
          return;
        }
        if (!this.course.title) {
          this.$toast.error("Vui lòng nhập tiêu đề!", {
            duration: 5000
          });
          return;
        }
        if (!this.course.description || this.course.description.length < 10) {
          this.$toast.error("Mô tả quá ngắn!", {
            duration: 5000
          });
          return;
        }

        if (this.course.picturePath) {
          let picture = await this.uploadFile();
          this.course.pictureId = picture.id;
        }
        let result = await this.$axios.post("/api/course", this.course);
        if (result.status === 200) {
          this.id = result.data.id;
          this.$toast.success("Tạo khóa học thành công!", {
            duration: 5000
          });
          this.$router.push({ path: "/admin/course/edit", query: { id: this.id } });
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
    },
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
      this.course.picturePath = URL.createObjectURL(this.file);
    },
  }
}
</script>