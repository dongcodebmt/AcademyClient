<template>
  <div id="blog">
    <div class="row d-flex justify-content-center py-4">
      <div class="col-lg-8 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ blog.title }}</h5>
            <div class="media d-flex align-items-center mb-4">
              <img
                class="avatar rounded-circle"
                alt="Image placeholder"
                :src="[ this.$auth.user && this.$auth.user.picture !== '/' ? this.$auth.user.picture :  require('@/assets/img/team/blank-profile.png') ]"
              />
              <div class="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                <span
                  class="mb-0 font-small fw-bold text-gray-900"
                >{{ this.$auth.user.firstName + " " + this.$auth.user.lastName }}</span>
              </div>
            </div>
            <p class="card-text" v-html="blog.content"></p>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <h5 class="card-title">Bình luận (25)</h5>
        <div class="card mb-4">
          <div class="card-body">
            <div class="media d-flex align-items-center mb-4">
              <img
                class="avatar rounded-circle"
                alt="Image placeholder"
                :src="[ this.$auth.user && this.$auth.user.picture !== '/' ? this.$auth.user.picture :  require('@/assets/img/team/blank-profile.png') ]"
              />
              <div class="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                <span
                  class="mb-0 font-small fw-bold text-gray-900"
                >{{ this.$auth.user.firstName + " " + this.$auth.user.lastName }}</span>
              </div>
            </div>
            <div id="cmtContent">
              <p class="card-text">
                Below is an example of a basic card with mixed content and a fixed width. Cards have no fixed width to start, so they’ll naturally fill the full width of its parent element. This is easily customized with our various sizing options. 
              </p>
            </div>
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-body">
            <div class="media d-flex align-items-center mb-4">
              <img
                class="avatar rounded-circle"
                alt="Image placeholder"
                :src="[ this.$auth.user && this.$auth.user.picture !== '/' ? this.$auth.user.picture :  require('@/assets/img/team/blank-profile.png') ]"
              />
              <div class="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                <span
                  class="mb-0 font-small fw-bold text-gray-900"
                >{{ this.$auth.user.firstName + " " + this.$auth.user.lastName }}</span>
              </div>
            </div>
            <div id="cmtContent">
              <p class="card-text">
                Below is an example of a basic card with mixed content and a fixed width. Cards have no fixed width to start, so they’ll naturally fill the full width of its parent element. This is easily customized with our various sizing options. 
              </p>
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
      id: this.$route.query.id,
      blog: {
        id: 0,
        userId: 0,
        categoryId: 0,
        title: null,
        content: null,
        createAt: null,
        isDeleted: true,
        pictureId: 0,
        picturePath: 0
      }
    }
  },
  mounted: async function () {
    this.blog = await this.getBlog(this.id);
  },
  methods: {
    async getBlog(id) {
      try {
        let result = await this.$axios.get("/api/blog/" + id);
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