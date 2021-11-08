<template>
  <div class="learning">
    <div class="py-4">
      <div class="row">
        <div class="col-lg-8">
          <div class="card bg-primary">
            <div id="player">
              <iframe
                src="https://dongdev.com"
                style="min-height: 570px"
                width="95%"
                class="mx-4 my-4"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card card-body border-0 shadow mb-4">
            <div class="row align-items-center mb-3">
              <div class="col-auto">
                <fa-icon icon="book-open"/>
              </div>
              <div class="col">
                <div class="progress-wrapper">
                  <div class="progress-info">
                    <div class="h6 mb-0">Tiến độ khóa học</div>
                    <div class="small fw-bold text-gray-500">
                      <span>75 %</span>
                    </div>
                  </div>
                  <div class="progress mb-0">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style="width: 75%;"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card card-body border-0 shadow mb-4">
            <div class="accordion" id="tracksteps">
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
                    data-bs-target="#collapse2"
                  >Accordion Item #2</button>
                </h2>
                <div id="collapse2" class="accordion-collapse collapse">
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
                    data-bs-target="#collapse3"
                  >Accordion Item #3</button>
                </h2>
                <div id="collapse3" class="accordion-collapse collapse">
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
                    data-bs-target="#collapse4"
                  >Accordion Item #4</button>
                </h2>
                <div id="collapse4" class="accordion-collapse collapse">
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
                    data-bs-target="#collapse5"
                  >Accordion Item #5</button>
                </h2>
                <div id="collapse5" class="accordion-collapse collapse">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>