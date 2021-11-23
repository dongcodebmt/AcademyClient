<template>
  <nav class="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
    <div class="container-fluid px-0">
      <div class="d-flex justify-content-between w-100" id="navbarSupportedContent">
        <div class="d-flex align-items-center">
          <!-- Search form -->
          <form
            class="navbar-search form-inline"
            id="navbar-search-main"
            v-on:submit.prevent="$router.push({path:'/search', query:{query:query}})"
          >
            <div class="input-group input-group-merge search-bar">
              <span class="input-group-text" id="topbar-addon">
                <fa-icon icon="search" />
              </span>
              <input
                type="text"
                class="form-control"
                id="topbarInputIconLeft"
                placeholder="Tìm kiếm..."
                aria-label="Tìm kiếm..."
                aria-describedby="topbar-addon"
                v-model="query"
              />
            </div>
          </form>
          <!-- / Search form -->
        </div>
        <!-- Navbar links -->
        <ul class="navbar-nav align-items-center" v-if="this.$auth.loggedIn">
          <!-- <Notification /> -->
          <li class="nav-item dropdown ms-lg-3">
            <a
              class="nav-link dropdown-toggle pt-1 px-0"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div class="media d-flex align-items-center">
                <img
                  class="avatar rounded-circle"
                  style="object-fit: cover;"
                  :src="[ this.$auth.user && this.$auth.user.picture !== '/' ? this.$auth.user.picture :  require('@/assets/img/team/blank-profile.png') ]"
                />
                <div class="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                  <span
                    class="mb-0 font-small fw-bold text-gray-900"
                  >{{ this.$auth.user.firstName + " " + this.$auth.user.lastName }}</span>
                </div>
              </div>
            </a>
            <div class="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
              <nuxt-link class="dropdown-item d-flex align-items-center" to="/profile/settings">
                <fa-icon icon="cog" class="dropdown-icon text-gray-400 me-2" />Thông tin cá nhân
              </nuxt-link>
              <nuxt-link class="dropdown-item d-flex align-items-center" to="/profile/courses">
                <fa-icon icon="info-circle" class="dropdown-icon text-gray-400 me-2" />Thông tin khóa học
              </nuxt-link>
              <nuxt-link class="dropdown-item d-flex align-items-center" to="/profile/password">
                <fa-icon icon="key" class="dropdown-icon text-gray-400 me-2" />Đổi mật khẩu
              </nuxt-link>
              <nuxt-link
                class="dropdown-item d-flex align-items-center"
                to="/admin"
                v-if="this.$auth.hasScope('Admin') || this.$auth.hasScope('Lecturer')"
              >
                <fa-icon icon="user-shield" class="dropdown-icon text-gray-400 me-2" />Quản trị
              </nuxt-link>
              <div role="separator" class="dropdown-divider my-1"></div>
              <a class="dropdown-item d-flex align-items-center" v-on:click="signOut()">
                <fa-icon icon="sign-out-alt" class="dropdown-icon text-danger me-2" />Đăng xuất
              </a>
            </div>
          </li>
        </ul>
        <ul v-else>
          <nuxt-link class="btn btn-secondary btn-sm" to="/auth/signin" role="button">Đăng nhập</nuxt-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      query: null,
    };
  },
  mounted: async function () { },
  methods: {
    async signOut() {
      this.$auth.logout();
      this.$router.push("/auth/signin");
    }
  }
};
</script>
