<template>
  <div id="ranking">
    <div class="row py-4 d-flex justify-content-center">
      <div class="col-lg-10">
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
              <li class="nav-item">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                >Xếp hạng</button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  id="course-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#course"
                >Khóa học</button>
              </li>
            </ul>
          </div>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" aria-labelledby="home-tab">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-10 d-flex justify-content-start">
                    <h5
                      class="card-title"
                    >Bảng xếp hạng những người hoàn thành nhiều khóa học nhất {{ typeText }}</h5>
                  </div>
                  <div class="col-md-2 d-flex justify-content-end">
                    <select
                      class="form-select"
                      id="slc"
                      v-model="selected"
                      v-on:change="selectRange(selected)"
                    >
                      <option value="1" selected>Tuần</option>
                      <option value="2">Tháng</option>
                    </select>
                  </div>
                </div>
                <div class="table-responsive mt-2">
                  <table class="table table-centered table-nowrap mb-4 rounded table-borderless">
                    <thead class="thead-light">
                      <tr>
                        <th class="border-0 rounded-start">#</th>
                        <th class="border-0">Họ và tên</th>
                        <th class="border-0 rounded-end">Số khóa học</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in tops" :key="item.top">
                        <td>{{ item.top }}</td>
                        <td>
                          <div class="media d-flex align-items-center">
                            <img
                              class="avatar rounded-circle"
                              style="object-fit: cover;"
                              :src="[item.user.picture && item.user.picture !== '/' ? item.user.picture :  require('@/assets/img/team/blank-profile.png') ]"
                            />
                            <div
                              class="media-body ms-2 text-dark align-items-center d-none d-lg-block"
                            >
                              <nuxt-link :to="`/profile/view?id=${item.user.id}`">
                                <span
                                  class="mb-0 font-small fw-bold text-gray-900"
                                >{{ item.user.firstName + " " + item.user.lastName }}</span>
                              </nuxt-link>
                            </div>
                          </div>
                        </td>
                        <td>{{ item.noOfCourse }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="course" aria-labelledby="course-tab">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-10 d-flex justify-content-start">
                    <h5 class="card-title">Top khóa học đăng ký nhiều nhất {{ typeText }}</h5>
                  </div>
                  <div class="col-md-2 d-flex justify-content-end">
                    <select
                      class="form-select"
                      id="slc"
                      v-model="selected"
                      v-on:change="selectRange(selected)"
                    >
                      <option value="1" selected>Tuần</option>
                      <option value="2">Tháng</option>
                    </select>
                  </div>
                </div>
                <div class="table-responsive mt-2">
                  <table class="table table-centered table-nowrap mb-4 rounded table-borderless">
                    <thead class="thead-light">
                      <tr>
                        <th class="border-0 rounded-start">#</th>
                        <th class="border-0">Tên khóa học</th>
                        <th class="border-0">Số lượng đăng ký</th>
                        <th class="border-0 rounded-end">Xem xếp hang</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in courses" :key="item.id">
                        <td>{{ index+1 }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.count }}</td>
                        <td>
                          <!-- Button trigger modal -->
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#listRank"
                            v-on:click="showModal(item.courseId)"
                          >Xem bảng xếp hạng</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="listRank"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Bảng xếp hạng điểm khóa học theo {{ typeText }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="table-responsive mt-2">
                  <table class="table table-centered table-nowrap mb-4 rounded table-borderless">
                    <thead class="thead-light">
                      <tr>
                        <th class="border-0 rounded-start">#</th>
                        <th class="border-0">Họ và tên</th>
                        <th class="border-0 rounded-end">Điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in courseRanks" :key="item.top">
                        <td>{{ item.top }}</td>
                        <td>
                          <div class="media d-flex align-items-center">
                            <img
                              class="avatar rounded-circle"
                              style="object-fit: cover;"
                              :src="[item.user.picture && item.user.picture !== '/' ? item.user.picture :  require('@/assets/img/team/blank-profile.png') ]"
                            />
                            <div
                              class="media-body ms-2 text-dark align-items-center d-none d-lg-block"
                            >
                              <nuxt-link :to="`/profile/view?id=${item.user.id}`">
                                <span
                                  class="mb-0 font-small fw-bold text-gray-900"
                                >{{ item.user.firstName + " " + item.user.lastName }}</span>
                              </nuxt-link>
                            </div>
                          </div>
                        </td>
                        <td>{{ item.mark.toFixed(2) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
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
  auth: false,
  head() {
    return {
      title: "Xếp hạng | Academy"
    };
  },
  data() {
    return {
      start: new Date(new Date().setDate(new Date().getDate() - 7)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
      selected: 1,
      typeText: "tuần",
      tops: [{
        top: 0,
        noOfCourse: 0,
        user: {
          id: 0,
          firstName: null,
          lastName: null,
          pictureId: 0,
          picture: "/"
        }
      }],
      courses: [],
      courseRanks: []
    }
  },
  mounted: async function () {
    let start = this.start.toISOString();
    let end = this.end.toISOString();
    this.tops = await this.getRank(start, end);
    this.courses = await this.getTopCourse(start, end);
  },
  methods: {
    async showModal(courseId) {
      this.courseRanks = [];
      let start = this.start.toISOString();
      let end = this.end.toISOString();
      this.courseRanks = await this.getRankByCourse(courseId, start, end);
    },
    // Get rank by course
    async getRankByCourse(courseId, start, end) {
      try {
        let result = await this.$axios.get(`/api/Stat/Rank/${courseId}/${start}/${end}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Get courses
    async getTopCourse(start, end) {
      try {
        let result = await this.$axios.get(`/api/Stat/TopCourses/${start}/${end}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Default rank
    async selectRange(type) {
      if (type == 1) {
        this.typeText = "tuần";
        this.start = new Date(new Date().setDate(new Date().getDate() - 7));
      } else {
        this.typeText = "tháng";
        this.start = new Date(new Date().setMonth(new Date().getMonth() - 1));
      }
      let start = this.start.toISOString();
      let end = this.end.toISOString();
      [this.tops, this.courses] = await Promise.all([this.getRank(start, end), this.getTopCourse(start, end)]);
    },
    async getRank(start, end) {
      try {
        let result = await this.$axios.get(`/api/Stat/Rank/${start}/${end}`);
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