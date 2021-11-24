<template>
  <div id="preview">
    <div class="py-4">
      <div class="card card-body border-0 shadow mb-4">
        <div class="row">
          <div class="col-lg-8">
            <h3 class="card-title">{{ course.title }}</h3>
            <div class="card-text" v-html="course.description"></div>
            <h5 class="card-title">Bạn sẽ học được những gì?</h5>
            <ul class="row card-text">
              <li class="col-lg-6" v-for="item in willLearns" :key="item.id">{{ item.content }}</li>
            </ul>
            <h5 class="card-title">Những yêu cầu trước khi tham gia khóa học</h5>
            <ul class="row card-text">
              <li class="col-lg-6" v-for="item in requirements" :key="item.id">{{ item.content }}</li>
            </ul>
            <h5 class="card-title">Nội dung khóa học</h5>
            <div class="accordion" id="curriculum">
              <div class="accordion-item" v-for="item in trackSteps" :key="item.id">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapse' + item.id"
                  >{{ item.title + ' - ' + item.steps.length + ' bài học' }}</button>
                </h2>
                <div :id="'collapse' + item.id" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <ul class="row card-text">
                      <li
                        class="col-lg-12"
                        v-for="i in item.steps"
                        :key="i.id"
                      >{{ i.title + ' - Thời lượng: ' + secToMin(i.duration) }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 position-relative">
            <div class="mb-4">
              <img
                :src="[ course.picturePath && course.picturePath !== '/' ? course.picturePath : require('@/assets/img/empty.png') ]"
                class="card-img"
              />
            </div>
            <div class="d-flex justify-content-center" id="info">
              <ul class="list-group">
                <a
                  class="btn btn-outline-danger mb-4"
                  role="button"
                  v-on:click="courseRegister(id)"
                >Đăng ký khóa học</a>
                <!-- <li class="list-group-item">
                  <fa-icon icon="layer-group" />&nbsp;Trình độ cơ bản
                </li>-->
                <li class="list-group-item">
                  <fa-icon icon="plus-square" />
                  &nbsp;Tổng số {{ totalStep }} bài học
                </li>
                <li class="list-group-item">
                  <fa-icon icon="clock" />
                  &nbsp;Thời lượng {{ secToMin(totalDuration) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      totalStep: 0,
      totalDuration: 0,
      course: {
        id: 0,
        lecturerId: 0,
        categoryId: 0,
        pictureId: 0,
        createAt: null,
        title: null,
        description: null,
        isDeleted: false,
        picturePath: '/'
      },
      willLearns: [],
      requirements: [],
      trackSteps: []
    }
  },
  mounted: async function () {
    if (this.id) {
      [this.course, this.trackSteps, this.willLearns, this.requirements] = await Promise.all(
        [this.getCourse(this.id),
        this.getTrackSteps(this.id),
        this.getWillLearns(this.id),
        this.getRequirements(this.id)
        ]);
      this.handleTotal();
    } else {
      this.$router.push("/courses");
    }
  },
  methods: {
    async handleTotal() {
      this.trackSteps.forEach((el) => {
        this.totalStep += el.steps.length;
        el.steps.forEach((e) => {
          this.totalDuration += e.duration;
        });
      });
    },
    secToMin(seconds) {
      let format = val => `0${Math.floor(val)}`.slice(-2);
      let hours = seconds / 3600;
      let minutes = (seconds % 3600) / 60;

      return [hours, minutes, seconds % 60].map(format).join(':');
    },
    async getTrackSteps(courseId) {
      try {
        let result = await this.$axios.get(`api/course/${courseId}/tracksteps`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getRequirements(courseId) {
      try {
        let result = await this.$axios.get(`/api/course/${courseId}/requirements`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getWillLearns(courseId) {
      try {
        let result = await this.$axios.get(`/api/Course/${courseId}/WillLearns`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCourse(id) {
      try {
        let result = await this.$axios.get(`/api/Course/${id}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async courseRegister(id) {
      try {
        let result = await this.$axios.post(`/api/Course/${id}/Register`);
        if (result.status === 200) {
          this.$toast.success("Đăng ký khóa học thành công!", {
            duration: 5000
          });
          this.$emit('learning');
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>