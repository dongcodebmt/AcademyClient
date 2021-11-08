<template>
  <div id="course">
    <div class="py-4">
      <div class="card card-body border-0 shadow mb-4">
        <div class="row">
          <div class="col-lg-8">
            <h4 class="card-title">{{ title }}</h4>
            <p class="card-text">{{ content }}</p>
            <h5 class="card-title">Bạn sẽ học được những gì?</h5>
            <ul class="row card-text list-unstyled">
              <li class="col-lg-6">Row1</li>
              <li class="col-lg-6">Row2</li>
              <li class="col-lg-6">Row3</li>
              <li class="col-lg-6">Row4</li>
              <li class="col-lg-6">Row5</li>
            </ul>
            <h5 class="card-title">Nội dung khóa học</h5>
            <div class="accordion" id="curriculum">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse1"
                  >Accordion Item #1</button>
                </h2>
                <div id="collapse1" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <ul class="card-text list-unstyled">
                      <li>1. Mô hình Client - Server</li>
                      <li>1. Mô hình Client - Server</li>
                      <li>1. Mô hình Client - Server</li>
                      <li>1. Mô hình Client - Server</li>
                      <li>1. Mô hình Client - Server</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                  >Accordion Item #2</button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <li>1. Mô hình Client - Server</li>
                    <li>1. Mô hình Client - Server</li>
                    <li>1. Mô hình Client - Server</li>
                    <li>1. Mô hình Client - Server</li>
                    <li>1. Mô hình Client - Server</li>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                  >Accordion Item #2</button>
                </h2>
                <div id="collapse3" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <li>1. Mô hình Client - Server</li>
                    <li>1. Mô hình Client - Server</li>
                    <li>1. Mô hình Client - Server</li>
                    <li>1. Mô hình Client - Server</li>
                    <li>1. Mô hình Client - Server</li>
                  </div>
                </div>
              </div>
            </div>
            <h5 class="card-title">Những yêu cầu cần để tham gia khóa học</h5>
            <ul class="row card-text list-unstyled">
              <li class="col-lg-6">Row1</li>
              <li class="col-lg-6">Row2</li>
              <li class="col-lg-6">Row3</li>
              <li class="col-lg-6">Row4</li>
              <li class="col-lg-6">Row5</li>
            </ul>
          </div>

          <div class="col-lg-4 position-relative">
            <div class="position-absolute top-50 start-50 translate-middle">
              <p>
                <fa-icon icon="layer-group" />&nbsp;Trình độ cơ bản
              </p>
              <p>
                <fa-icon icon="plus-square" />&nbsp;Tổng số 8 bài học
              </p>
              <p>
                <fa-icon icon="clock" />&nbsp;Thời lượng 02 giờ 15 phút
              </p>
              <a class="btn btn-outline-danger" href="#" role="button">Đăng ký khóa học</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Javascript cơ bản',
      content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    }
  }
}
</script>