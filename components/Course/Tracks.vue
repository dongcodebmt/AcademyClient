<template>
  <div id="tracks">
    <div class="card card-body border-0 shadow mb-4">
      <div class="mb-3">
        <label class="form-label">Danh sách các phần học</label>
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0 rounded table-borderless">
            <thead class="thead-light">
              <tr>
                <th class="border-0 rounded-start">#</th>
                <th class="border-0">Phần học</th>
                <th class="border-0 rounded-end">Thao tác</th>
              </tr>
            </thead>
            <draggable v-model="tracks" tag="tbody">
              <tr v-for="(item, index) in tracks" :key="index">
                <td class="col-1">{{ item.id }}</td>
                <td class="col-9">
                  <input
                    type="text"
                    class="form-control"
                    v-model="item.title"
                    v-on:click="item.edit = true"
                  />
                </td>
                <td class="col-2">
                  <!-- Delete local -->
                  <button
                    class="btn btn-outline-danger btn-sm"
                    v-if="!item.id"
                    v-on:click="removeItem(index)"
                  >Xóa</button>
                  <!-- Request delete method -->
                  <button
                    class="btn btn-outline-danger btn-sm"
                    v-on:click="deleteTrack(index)"
                    v-if="item.id"
                  >Xóa</button>
                  <!-- Open list step with trackId -->
                  <button
                    class="btn btn-outline-primary btn-sm"
                    v-if="item.id"
                    v-on:click="selectTrack(item.id)"
                  >Quản lý</button>
                  <!-- Post request -->
                  <button
                    class="btn btn-outline-primary btn-sm"
                    v-if="!item.id"
                    v-on:click="postTrack(index)"
                  >Lưu</button>
                  <!-- Put request -->
                  <button
                    class="btn btn-outline-primary btn-sm"
                    v-if="item.id && item.edit === true"
                    v-on:click="putTrack(index)"
                  >Lưu</button>
                </td>
              </tr>
            </draggable>
          </table>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <button type="button" class="btn btn-outline-primary mx-2" v-on:click="insertItem()">Thêm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['courseId'],
  data() {
    return {
      tracks: [],
    }
  },
  mounted: async function () {
    this.tracks = await this.getTracks(this.courseId);
  },
  methods: {
    async selectTrack(id) {
      this.$emit('open', id);
    },
    async removeItem(index) {
      this.tracks.splice(index, 1);
    },
    async insertItem() {
      this.tracks.push({ courseId: this.courseId, title: null });
    },
    async checkData(index) {
      try {
        if (!this.tracks[index].title) {
          this.$toast.error("Vui lòng nhập nội dung!", {
            duration: 5000
          });
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
      return true;
    },
    async deleteTrack(index) {
      try {
        let id = this.tracks[index].id;
        let result = await this.$axios.delete(`/api/track/${id}`);
        if (result.status === 200) {
          this.removeItem(index);
          this.$toast.success("Xoá phần học thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async putTrack(index) {
      if (!await this.checkData(index)) {
        return;
      }
      try {
        let id = this.tracks[index].id;
        let result = await this.$axios.put(`/api/track/${id}`, this.tracks[index]);
        if (result.status === 200) {
          this.tracks[index].edit = false;
          this.$toast.success("Sửa phần học thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async postTrack(index) {
      if (!await this.checkData(index)) {
        return;
      }
      try {
        let result = await this.$axios.post("/api/track", this.tracks[index]);
        if (result.status === 200) {
          this.removeItem(index);
          result.data.edit = false;
          this.tracks.push(result.data);
          this.$toast.success("Tạo phần học thành công!", {
            duration: 5000
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getTracks(courseId) {
      try {
        let result = await this.$axios.get(`/api/course/${courseId}/tracks`);
        if (result.status === 200) {
          return await this.addFlag(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addFlag(data) {
      data = JSON.parse(JSON.stringify(data));
      data.forEach(element => element.edit = false);
      return data;
    }
  }
}
</script>