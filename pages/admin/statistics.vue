<template>
  <div id="courses">
    <div class="d-flex justify-content-end py-4">
      <client-only>
        <date-picker v-model="dateRange" type="date" range placeholder="Chọn khoảng thời gian" v-on:change="getData()"></date-picker>
      </client-only>
    </div>
    <div class="row">
      <div class="col-12 col-sm-6 col-xl-4 mb-4" v-for="item in overview" :key="item.label">
        <div class="card border-0 shadow">
          <div class="card-body">
            <div class="row d-block d-xl-flex align-items-center">
              <div
                class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center"
              >
                <div class="icon-shape icon-shape-tertiary rounded me-4 me-sm-0">
                  <client-only>
                    <fa-icon :icon="item.icon" class="icon icon-md" style="font-size: 30px;" />
                  </client-only>
                </div>
              </div>
              <div class="col-12 col-xl-7 px-xl-0">
                <div class="d-none d-sm-block">
                  <h2 class="h5">{{ item.label }}</h2>
                  <h3 class="fw-extrabold mb-1">{{ item.total }}</h3>
                </div>
                <small class="d-flex align-items-center">{{ month() }}</small>
                <div
                  class="small d-flex mt-1"
                  :set="temp = getPercent(item.lastTime, item.thisTime)"
                >
                  <fa-icon icon="angle-up" class="icon icon-xs text-success" v-if="temp > 0" />
                  <fa-icon icon="angle-down" class="icon icon-xs text-danger" v-if="temp < 0" />
                  <fa-icon icon="minus" class="icon icon-xs text-primary" v-if="temp == 0" />
                  <div>
                    <span class="text-success fw-bolder me-1" v-if="temp > 0">&nbsp;{{ temp }}%</span>
                    <span
                      class="text-danger fw-bolder me-1"
                      v-if="temp < 0"
                    >&nbsp;{{ Math.abs(temp) }}%</span>
                    <span class="text-primary fw-bolder me-1" v-if="temp == 0">&nbsp;0%</span>
                    So với khoảng thời gian trước
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card border-0 shadow mb-4">
          <div class="card-body">
            <h5 class="card-title">Tổng quan điểm</h5>
            <div class="row">
              <p class="col-lg-6">Điểm cao nhất: {{ mark.highestMark.toFixed(2) }}</p>
              <p class="col-lg-6">Điểm thấp nhất: {{ mark.lowestMark.toFixed(2) }}</p>
              <p class="col-lg-6">Điểm trung bình: {{ mark.averageMark.toFixed(2) }}</p>
              <p class="col-lg-6">Độ lệch chuẩn {{ mark.standardDeviation.toFixed(2) }}</p>
              <p class="col-lg-6">Thời gian làm bài trung bình: {{ secToMin(mark.averageTime) }}</p>
            </div>
            <div class="table-responsive">
              <client-only>
                <chartist ratio="ct-chart" type="Line" :data="chartViews" :options="options"></chartist>
              </client-only>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card border-0 shadow mb-4">
          <div class="card-body">
            <h5 class="card-title">Top khoá học đăng ký nhiều nhất</h5>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-4 rounded table-borderless">
                <thead class="thead-light">
                  <tr>
                    <th class="border-0 rounded-start">#</th>
                    <th class="border-0">Tên khoá học</th>
                    <th class="border-0 rounded-end">Số người đăng ký</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tops" :key="item.courseId">
                    <td>{{ item.courseId }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.count }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  middleware: ['role'],
  meta: {
    auth: { authority: 1 }
  },
  layout: "admin",
  components: { DatePicker },
  head() {
    return {
      title: "Thống kê | Academy"
    };
  },
  data() {
    return {
      dateRange: [
        new Date(new Date().setMonth(new Date().getMonth() - 1)),
        new Date()
      ],
      overview: [
        {
          label: null,
          icon: 'book',
          total: 0,
          thisTime: 0,
          lastTime: 0
        }
      ],
      tops: [
        {
          courseId: 0,
          title: null,
          count: 0
        }
      ],
      mark: {
        averageMark: 0,
        lowestMark: 0,
        highestMark: 0,
        standardDeviation: 0,
        averageTime: 0,
        charts: [
          {
            mark: 0,
            count: 0
          }
        ]
      },
      chartViews: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        series: [[]]
      },
      options: {
        fullWidth: true,
        lineSmooth: false,
        chartPadding: {
          right: 40
        }
      }
    }
  },
  mounted: async function () {
    await this.getData();
  },
  methods: {
    async getData() {
      let start = this.dateRange[0];
      let end = new Date(this.dateRange[1].setDate(this.dateRange[1].getDate() + 1));
      start = start.toISOString();
      end = end.toISOString();
      [this.overview, this.tops, this.mark] = await Promise.all([this.getOverview(start, end), this.getTopCourse(start, end), this.getMarkChart(start, end)]);
      if (this.mark) {
        this.setMarkToChart(this.mark.charts);
      }
    },
    async setMarkToChart(marks) {
      try {
        this.chartViews.series[0].splice(0, this.chartViews.series[0].length)
        for (let i = 0; i < 11; i++) {
          let markObj = marks.find(x => x.mark == i);
          let mark = markObj ? markObj.count : 0;
          this.chartViews.series[0].push(mark);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getMarkChart(start, end) {
      try {
        let result = await this.$axios.get(`/api/Stat/Mark/${start}/${end}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
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
    async getOverview(start, end) {
      try {
        let result = await this.$axios.get(`/api/Stat/Overview/${start}/${end}`);
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    getPercent(lastTime, thisTime) {
      let result = 0;
      if (lastTime > thisTime) {
        result = 100 - (thisTime / lastTime * 100);
        result = -result;
      }
      if (thisTime > lastTime) {
        result = 100 - (lastTime / thisTime * 100);
      }
      return result.toFixed(2);
    },
    month() {
      let start = this.dateRange[0];
      let end = this.dateRange[1];
      let result = start.toLocaleDateString() + " - " + end.toLocaleDateString();
      return result;
    }
  }
}
</script>