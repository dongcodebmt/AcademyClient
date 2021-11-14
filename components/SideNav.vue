<template>
  <nav id="sidebarMenu" class="sidebar d-lg-block bg-gray-800 text-white collapse" data-simplebar>
    <div class="sidebar-inner px-4 pt-3">
      <!-- Mobile User Card -->
      <div
        class="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4"
      >
        <div class="d-flex align-items-center">
          <div class="avatar-lg me-4">
            <img
              :src="[ this.$auth.user && this.$auth.user.picture !== '/' ? this.$auth.user.picture : require('@/assets/img/team/blank-profile.png') ]"
              class="card-img-top rounded-circle border-white"
              alt="Bonnie Green"
            />
          </div>
          <div class="d-block">
            <div id="not-logged" v-if="!this.$auth.loggedIn">
              <h2 class="h5 mb-3">Hi, Guest</h2>
              <nuxt-link
                to="/auth/signin"
                class="btn btn-secondary btn-sm d-inline-flex align-items-center"
              >
                <fa-icon icon="sign-in-alt" class="icon icon-xxs me-1" />Sign In
              </nuxt-link>
            </div>

            <div id="not-logged" v-else>
              <h2
                class="h5 mb-3"
              >Hi, {{ this.$auth.user.firstName + " " + this.$auth.user.lastName }}</h2>
              <a
                v-on:click="signOut()"
                v-if="this.$auth.loggedIn"
                href
                class="btn btn-secondary btn-sm d-inline-flex align-items-center"
              >
                <fa-icon icon="sign-out-alt" class="icon icon-xxs me-1" />Sign Out
              </a>
            </div>
          </div>
        </div>
        <div class="collapse-close d-md-none">
          <a
            href="#sidebarMenu"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <fa-icon icon="times" />
          </a>
        </div>
      </div>
      <!-- End Mobile User Card -->

      <ul class="nav flex-column pt-3 pt-md-0">
        <li class="nav-item">
          <a href="/" class="nav-link d-flex justify-content-center">
            <span class="sidebar-icon">
              <fa-icon icon="graduation-cap" alt="Academy Logo" class="text-warning" />
              <!-- <img src="~assets/img/brand/light.svg" height="20" width="20" alt="Volt Logo" /> -->
            </span>
            <span class="mt-1 ms-1 sidebar-text">Academy</span>
          </a>
        </li>

        <!-- <li role="separator" class="dropdown-divider mt-4 mb-3 border-gray-700"></li> -->

        <!-- Items -->
        <template v-for="item in $store.state.sideNavItems">
          <li class="nav-item" :class="{ active: isActive(item.url) }" :key="item.key">
            <nuxt-link
              :to="item.url"
              class="nav-link"
              v-if="!isHasSub(item)"
              @click.native="closeSideNav()"
            >
              <span class="sidebar-icon">
                <fa-icon :icon="item.icon" class="icon icon-xs me-2" />
              </span>
              <span class="sidebar-text">{{ item.name }}</span>
            </nuxt-link>
            <template v-else>
              <span
                class="nav-link d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse"
                :data-bs-target="`#${item.id}`"
                aria-expanded="false"
                :aria-controls="`#${item.id}`"
              >
                <span>
                  <span class="sidebar-icon">
                    <fa-icon :icon="item.icon" class="icon icon-xs me-2" />
                  </span>
                  <span class="sidebar-text">{{ item.name }}</span>
                </span>
                <span class="link-arrow">
                  <fa-icon icon="chevron-right" />
                </span>
              </span>
              <div class="multi-level collapse" role="list" :id="item.id">
                <ul class="flex-column nav" v-for="sub in item.submenu" :key="sub.key">
                  <li class="nav-item" :class="{ active: isActive(sub.url) }">
                    <nuxt-link class="nav-link" :to="sub.url" @click.native="closeSideNav()">
                      <span class="sidebar-text">{{ sub.name }}</span>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </template>
          </li>
        </template>
        <!-- End items -->
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted: async function () {
  },
  methods: {
    isActive(url) {
      if (this.$route.path === url) {
        return true;
      }
      return false;
    },
    isHasSub(item) {
      if (item.hasOwnProperty("submenu") && item.submenu.length > 0) {
        return true;
      }
      return false;
    },
    closeSideNav() {
      let el = document.getElementById("sidebarMenu");
      if (el && el.classList.contains("show")) {
        el.classList.remove("show");
      }
    },
    async signOut() {
      this.$auth.logout();
      this.$router.push("/auth/signin");
    }
  }
};
</script>
