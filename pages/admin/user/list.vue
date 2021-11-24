<template>
  <div id="courses">
    <div class="row py-4">
      <div class="col-lg-12">
        <div class="card card-body border-0 shadow mb-4">
          <div class="mb-3">
            <label class="form-label">Danh sách các tài khoản người dùng</label>
            <div class="table-responsive">
              <vue-good-table
                :columns="columns"
                :rows="users"
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
                  <span v-if="props.column.field == 'picturePath'">
                    <img
                      class="rounded avatar-md"
                      style="object-fit: cover;"
                      :src="[ props.row.picture && props.row.picture !== '/' ? props.row.picture : require('@/assets/img/team/blank-profile.png') ]"
                    />
                  </span>
                  <span v-if="props.column.field == 'actions'">
                    <nuxt-link
                      class="btn btn-outline-primary btn-sm"
                      :to="`/admin/user/edit?id=${props.row.id}`"
                    >
                      <fa-icon icon="edit" />
                    </nuxt-link>
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
    auth: { authority: 2 }
  },
  layout: "admin",
  head() {
    return {
      title: "Quản lý người dùng | Academy"
    };
  },
  data() {
    return {
      columns: [
        { label: '#', field: 'id' },
        { label: 'Ảnh đại diện', field: 'picturePath' },
        { label: 'Email', field: 'email' },
        { label: 'Họ', field: 'firstName' },
        { label: 'Tên', field: 'lastName' },
        {
          label: 'Quyền', field: 'scope', formatFn: function (value) {
            return value ? value.join(', ') : null;
          }
        },
        { label: 'Thao tác', field: 'actions', sortable: false, }
      ],
      users: [{
        id: 0,
        email: null,
        firstName: null,
        lastName: null,
        picture: null,
        scope: []
      }],
    }
  },
  mounted: async function () {
    this.users = await this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        let result = await this.$axios.get("/api/user");
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