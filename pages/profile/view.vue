<template>
  <div id="user">
    <div class="row py-4">
      <div class="col-12 col-xl-8">
        <div class="card card-body border-0 shadow mb-4">
          <h2 class="h5 mb-4">Các khóa học đang tham gia</h2>
        </div>
        <div class="card card-body border-0 shadow mb-4 mb-xl-0">
          <h2 class="h5 mb-4">Các khóa học đã hoàn thành</h2>
        </div>
      </div>
      <div class="col-12 col-xl-4">
        <div class="row">
          <div class="col-12 mb-4">
            <div class="card shadow border-0 text-center p-0">
              <div class="card-body pb-5 py-8">
                <img
                  :src="[user.picture !== '/' ? user.picture :  require('@/assets/img/team/blank-profile.png') ]"
                  class="avatar-xl rounded-circle mx-auto mt-n7 mb-4"
                  :alt="user.firstName + ' ' + user.lastName"
                />
                <h4 class="h3">{{ user.firstName + " " + user.lastName }}</h4>
                <h5 class="fw-normal">Senior Software Engineer</h5>
                <p class="text-gray mb-4">New York, USA</p>
                <a class="btn btn-sm btn-secondary" href="#">Send Message</a>
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
      id: this.$route.query.id,
      user: {
        id: 0,
        email: null,
        firstName: null,
        lastName: null,
        picture: null,
        pictureId: 0,
        scope: []
      },
    }
  },
  mounted: async function () {
    if (this.id) {
      this.user = await this.getUser(this.id);
    }
  },
  methods: {
    async getUser(id) {
      try {
        let result = await this.$axios.get("/api/User/Public/" + id);
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