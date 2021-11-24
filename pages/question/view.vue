<template>
  <div id="questionPost">
    <div class="row d-flex justify-content-center py-4">
      <div class="col-lg-8 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ question.title }}</h5>

            <div class="row">
              <div class="col-6">
                <div class="media d-flex align-items-center mb-4">
                  <img
                    class="avatar rounded-circle"
                    style="object-fit: cover;"
                    :src="[user.picture && user.picture !== '/' ? user.picture :  require('@/assets/img/team/blank-profile.png') ]"
                  />
                  <div class="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <nuxt-link :to="`/profile/view?id=${user.id}`">
                      <span
                        class="mb-0 font-small fw-bold text-gray-900"
                      >{{ user.firstName + " " + user.lastName }}</span>
                    </nuxt-link>
                  </div>
                </div>
              </div>
              <div
                class="col-6 d-flex justify-content-end"
                v-if="isHasRole(question.userId) > 0"
              >
                <div class="dropdown ms-2">
                  <a class="dropdown-toggle" role="button" id="baction" data-bs-toggle="dropdown">
                    <fa-icon icon="ellipsis-h" />
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="baction">
                    <li>
                      <nuxt-link class="dropdown-item" :to="`/question/edit?id=${id}`">Sửa</nuxt-link>
                    </li>
                    <li>
                      <a class="dropdown-item" v-on:click="deleteQuestion(id)">Xóa</a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        v-on:click="banUser(question.userId)"
                        v-if="isHasRole(question.userId) > 1 && user.id !== $auth.user.id"
                      >Cấm người dùng</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="container">
              <p class="card-text" v-html="question.content"></p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-8" id="commentEditor" v-if="!$auth.hasScope('Banned') && $auth.loggedIn">
        <div class="card mb-4">
          <div class="card-body">
            <h6 class="card-title">Hãy để lại bình luận của bạn</h6>
            <client-only>
              <tinymce v-model="comment.content" :init="tinymce" />
            </client-only>
            <div class="d-flex justify-content-end mt-3">
              <button
                class="btn btn-gray-800 mt-2 animate-up-2"
                type="submit"
                v-on:click="postComment()"
                v-if="!cmtEdit"
              >Đăng</button>
              <button
                class="btn btn-gray-800 mt-2 animate-up-2 me-2"
                type="submit"
                v-on:click="putComment()"
                v-if="cmtEdit"
              >Lưu</button>
              <button
                class="btn btn-gray-800 mt-2 animate-up-2"
                type="submit"
                v-on:click="cancelComment()"
                v-if="cmtEdit"
              >Hủy</button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <h6 class="card-title">Bình luận ({{ comments.length }})</h6>
        <div class="card mb-4" v-for="item in comments" :key="item.id">
          <div class="card-body">
            <!-- User info and time since -->
            <div class="row">
              <div class="col-6">
                <div class="media d-flex align-items-center mb-4">
                  <img
                    class="avatar rounded-circle"
                    style="object-fit: cover;"
                    :src="[ item.user.picture && item.user.picture !== '/' ? item.user.picture :  require('@/assets/img/team/blank-profile.png') ]"
                  />
                  <div class="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <nuxt-link :to="`/profile/view?id='${user.id}`">
                      <span
                        class="mb-0 font-small fw-bold text-gray-900"
                      >{{ item.user.firstName + " " + item.user.lastName }}</span>
                    </nuxt-link>
                  </div>
                </div>
              </div>
              <div class="col-6 d-flex justify-content-end">
                <p class="card-text">
                  <TimeSince :date="item.updatedAt" />
                </p>
                <div class="dropdown ms-2" v-if="isHasRole(item.userId) > 0">
                  <a class="dropdown-toggle" role="button" id="action" data-bs-toggle="dropdown">
                    <fa-icon icon="ellipsis-h" />
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="action">
                    <li>
                      <a class="dropdown-item" v-on:click="editComment(item.id)">Sửa</a>
                    </li>
                    <li>
                      <a class="dropdown-item" v-on:click="deleteComment(item.id)">Xóa</a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        v-on:click="banUser(item.user.id)"
                        v-if="isHasRole(item.user.id) > 1 && item.user.id !== $auth.user.id"
                      >Cấm người dùng</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- comment content -->
            <div id="cmtContent">
              <p class="card-text" v-html="item.content"></p>
            </div>
          </div>
        </div>

        <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
import TimeSince from "~/components/TimeSince.vue";

export default {
  auth: false,
  head() {
    return {
      title: this.question.title + " | Academy"
    };
  },
  components: { TimeSince },
  data() {
    return {
      id: this.$route.query.id,
      page: 0,
      infiniteId: +new Date(),
      question: {
        id: null,
        userId: null,
        categoryId: 0,
        title: null,
        content: null,
        createAt: null,
        isDeleted: true,
        pictureId: 0,
        picturePath: 0
      },
      user: {
        id: 0,
        firstName: null,
        lastName: null,
        pictureId: 1,
        picture: "/"
      },
      comments: [],
      tinymce: this.getTinyMCEConfig(),
      comment: {
        id: 0,
        questionId: this.$route.query.id,
        userId: this.$auth.loggedIn ? this.$auth.user.id : 0,
        content: null,
      },
      cmtEdit: false
    }
  },
  mounted: async function () {
    if (this.id) {
      this.question = await this.getQuestion(this.id);
      this.user = await this.getUser(this.question.userId);
      // High light code
      setTimeout(() => {
        Prism.manual = true;
        Prism.highlightAll();
      }, 1000);
    }
  },
  methods: {
    async banUser(userId) {
      try {
        let roles = [5];
        let result = await this.$axios.post(`/api/user/${userId}/roles`, roles);
        if (result.status === 200) {
          this.$toast.success("Cấm người dùng thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    isHasRole(userId) {
      let check = 0;
      if (!this.$auth.loggedIn) {
        return check;
      }
      if (userId === this.$auth.user.id && !this.$auth.hasScope("Banned")) {
        check = 1;
      }
      if (this.$auth.hasScope("Moderators")) {
        check = 2;
      }
      if (this.$auth.hasScope("Administrators")) {
        check = 3;
      }
      return check;
    },
    async infiniteHandler($state) {
      let data = await this.getComments(this.id, this.page * 10);
      if (data.length > 0) {
        this.page += 1;
        this.comments.push(...data);
        $state.loaded();
        // High light code
        setTimeout(() => {
          Prism.manual = true;
          Prism.highlightAll();
        }, 1000);
      } else {
        $state.complete();
      }
    },
    async deleteQuestion(id) {
      try {
        let result = await this.$axios.delete(`/api/question/${id}`);
        if (result.status === 200) {
          this.$toast.success("Xóa bài viết thành công!", {
            duration: 5000
          });
          this.$router.push("/question");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async deleteComment(id) {
      try {
        let result = await this.$axios.delete(`/api/answer/${id}`);
        if (result.status === 200) {
          this.$toast.success("Xóa bình luận thành công!", {
            duration: 5000
          });
          let index = this.comments.findIndex(x => x.id === id);
          this.comments.splice(index, 1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async putComment() {
      try {
        let result = await this.$axios.put(`/api/answer/${this.comment.id}`, this.comment);
        if (result.status === 200) {
          this.$toast.success("Sửa bình luận thành công!", {
            duration: 5000
          });
          let temp = this.comments.find(x => x.id === this.comment.id);
          temp.content = result.data.content;
          temp.updatedAt = result.data.updatedAt;
          await this.cancelComment();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async cancelComment() {
      this.comment = {
        questionId: this.$route.query.id,
        userId: this.$auth.user.id,
        content: ""
      };
      this.cmtEdit = false;
    },
    async editComment(id) {
      this.comment = this.comments.find(x => x.id === id);
      this.cmtEdit = true;
      let element = this.$el.querySelector("#commentEditor");
      element.scrollIntoView();
    },
    async postComment() {
      try {
        let result = await this.$axios.post("/api/answer", this.comment);
        if (result.status === 200) {
          this.comments.unshift(result.data);
          this.comment.content = null;
          await this.cancelComment();
          this.$toast.success("Bình luận thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    getTinyMCEConfig() {
      let config = JSON.parse(JSON.stringify(this.$store.state.tinymce));
      config.height = 250;
      return config;
    },
    async getComments(id, skip = 0, take = 10) {
      try {
        let result = await this.$axios.get(`/api/question/${id}/comments?skip=${skip}&take=${take}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getUser(id) {
      try {
        let result = await this.$axios.get(`/api/User/Public/${id}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getQuestion(id) {
      try {
        let result = await this.$axios.get(`/api/question/${id}`);
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