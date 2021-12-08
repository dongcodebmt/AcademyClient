<template>
  <div id="footer" class="mt-auto">
    <footer class="bg-white rounded shadow p-4 mb-4 mt-4">
      <div class="row">
        <div class="col-12 col-md-4 col-xl-6 mb-4 mb-md-0">
          <p class="mb-0 text-center text-lg-start">
            © {{ new Date().getFullYear() }} -
            <span class="current-year"></span>
            <a
              class="text-primary fw-normal"
              href="https://dongdev.com"
              target="_blank"
            >Academy</a>
          </p>
        </div>
        <div class="col-12 col-md-8 col-xl-6 text-center text-lg-start">
          <!-- List -->
          <ul class="list-inline list-group-flush list-group-borderless text-md-end mb-0">
            <li class="list-inline-item px-0 px-sm-2">
              <nuxt-link to="/terms-of-service">Điều khoản dịch vụ</nuxt-link>
            </li>
            <li class="list-inline-item px-0 px-sm-2">
              <nuxt-link to="/privacy-policy">Chính sách quyền riêng tư</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>