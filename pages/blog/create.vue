<template>
  <div id="createPost">
    <div class="row py-4">
      <div class="col-lg-9">
        <div class="card card-body border-0 shadow mb-4">
          <div class="mb-3">
            <label for="title" class="form-label">Tiêu đề</label>
            <input type="text" class="form-control" id="title" placeholder="Title" />
          </div>
          <div class="mb-3">
            <label class="form-label">Bạn muốn hỏi gì?</label>
            <client-only>
              <tinymce
              v-model="content"
              :init="$store.state.tinymce"
            />
            </client-only>
          </div>
          <div class="mb-3" v-html="content">
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="row">
          <div class="col-12">
            <div class="card card-body border-0 shadow mb-4">
              <h2 class="h5 mb-4">Chọn danh mục</h2>
              <select class="form-select" aria-label="Danh mục">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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
                  v-on:click="test()"
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
      content: "Hello world!"
    }
  },
  mounted: async function() {
  },
  methods: {
    async test() {
      Prism.manual = true;
      Prism.highlightAll();
    }
  }
}
</script>