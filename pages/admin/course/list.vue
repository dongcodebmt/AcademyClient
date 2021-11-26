<template>
  <div id="courses">
    <div class="row py-4">
      <div class="col-lg-12">
        <div class="card card-body border-0 shadow mb-4">
          <div class="mb-3">
            <h5 class="form-label">Danh sách các khóa học</h5>
            <button
              type="button"
              class="btn btn-outline-primary mb-2"
              v-on:click="$router.push('/admin/course/create')"
            >
              <fa-icon icon="plus" class="me-2" />Thêm khóa học
            </button>
            <div class="table-responsive">
              <vue-good-table
                :columns="columns"
                :rows="courses"
                :search-options="{
                  enabled: true,
                  placeholder: 'Tìm kiếm',
                }"
                :pagination-options="{
                  enabled: true,
                  rowsPerPageLabel: 'Số hàng trên trang',
                  allLabel: 'Tất cả',
                  ofLabel: 'của',
                  firstLabel : 'Trang đầu tiên',
                  lastLabel : 'Trang cuối cùng',
                  nextLabel: 'Sau',
                  prevLabel: 'Trước',
                }"
              >
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'actions'">
                    <nuxt-link
                      class="btn btn-outline-primary btn-sm"
                      :to="`/admin/course/edit?id=${props.row.id}`"
                    >
                      <fa-icon icon="edit" />
                    </nuxt-link>
                    <button
                      class="btn btn-outline-danger btn-sm"
                      v-on:click="deleteCourse(props.row.id)"
                    >
                      <fa-icon icon="trash-alt" />
                    </button>
                  </span>
                  <span v-else>{{props.formattedRow[props.column.field]}}</span>
                </template>
              </vue-good-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['role'],
  meta: {
    auth: { authority: 3 }
  },
  layout: "admin",
  head() {
    return {
      title: "Quản lý khóa học | Academy"
    };
  },
  data() {
    return {
      columns: [
        { label: '#', field: 'id' },
        { label: 'Tên khóa học', field: 'title' },
        {
          label: 'Tên danh mục', field: 'categoryId', formatFn: (value) => {
            return value != null ? this.getCategoryName(value) : null;
          }
        },
        {
          label: 'Ngày tạo', field: 'createdAt', formatFn: function (value) {
            return value != null ? new Date(value.replace(/\Z$/, "") + "Z").toLocaleString() : null
          }
        },
        { label: 'Thao tác', field: 'actions', sortable: false, }
      ],
      courses: [{
        id: 0,
        lecturerId: 0,
        categoryId: 0,
        pictureId: 0,
        createdAt: null,
        title: null,
        description: null,
        isDeleted: false,
        picturePath: null
      }],
      categories: [{
        id: 0,
        name: null
      }]
    }
  },
  mounted: async function () {
    [this.categories, this.courses] = await Promise.all([this.getCategories(), this.getCourse(0, 9999)]);
  },
  methods: {
    getCategoryName(id) {
      let cate = this.categories.find(x => x.id === id);
      return cate ? cate.name : id;
    },
    async deleteCourse(id) {
      try {
        let result = await this.$axios.delete(`/api/Course/${id}`);
        if (result.status === 200) {
          let index = this.courses.findIndex(x => x.id === id);
          this.courses.splice(index, 1);
          this.$toast.success("Xóa khóa học thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCategories() {
      try {
        let result = await this.$axios.get("/api/Category");
        if (result.status === 200) {
          return result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCourse(skip = 0, take = 10) {
      try {
        let result = await this.$axios.get(`/api/Course?skip=${skip}&take=${take}`);
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