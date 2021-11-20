<template>
  <div id="courses">
    <div class="row py-4">
      <!-- Total users -->
      <div class="col-12 col-sm-6 col-xl-4 mb-4" v-for="item in overview" :key="item.label">
        <div class="card border-0 shadow">
          <div class="card-body">
            <div class="row d-block d-xl-flex align-items-center">
              <div
                class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center"
              >
                <div class="icon-shape icon-shape-success rounded me-4 me-sm-0">
                  <fa-icon :icon="item.icon" class="icon icon-md" />
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
                  :set="temp = getPercent(item.lastMonth, item.thisMonth)"
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
                    So với tháng trước
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
            <h5 class="card-title">Top khoá học đăng ký nhiều nhất</h5>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-4 rounded table-borderless">
                <thead class="thead-light">
                  <tr>
                    <th class="border-0 rounded-start">#</th>
                    <th class="border-0">Tên khoá học</th>
                    <th class="border-0 rounded-end">Chi tiết</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card border-0 shadow mb-4">
          <div class="card-body">
            <h5 class="card-title">Điểm phổ biến nhất</h5>
            <p>Điểm trung bình</p>
            <p>Điểm cao</p>
            <p>Điểm thấp</p>
            <p>Độ lệch chuẩn</p>
            <p>Thời gian làm bài</p>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-4 rounded table-borderless">
                <thead class="thead-light">
                  <tr>
                    <th class="border-0 rounded-start">#</th>
                    <th class="border-0">Tên khoá học</th>
                    <th class="border-0 rounded-end">Điểm</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  layout: "admin",
  data() {
    return {
      overview: [
        {
          label: null,
          icon: null,
          total: 0,
          thisMonth: 0,
          lastMonth: 0
        }
      ]
    }
  },
  mounted: async function () {
    this.overview = await this.getOverview();
  },
  methods: {
    async getOverview() {
      try {
        let result = await this.$axios.get("/api/Stat/Overview");
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    getPercent(lastMonth, thisMonth) {
      let result = 0;
      if (lastMonth > thisMonth) {
        result = 100 - (thisMonth / lastMonth * 100);
        result = -result;
      }
      if (thisMonth > lastMonth) {
        result = 100 - (lastMonth / thisMonth * 100);
      }
      return result.toFixed(2);
    },
    month() {
      let result = " - ";
      let today = new Date();
      result = result + today.toLocaleDateString();
      today.setMonth(today.getMonth() - 1);
      result = today.toLocaleDateString() + result;
      return result;
    }
  }
}
</script>