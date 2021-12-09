<template>
  <div class="overlay">
    <div class="spinner-border" role="status" style="width: 5rem; height: 5rem;">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style>
.overlay {
  position: fixed;
  z-index: 1000;
  top: 40%;
  right: calc(50% - 130px);
  opacity: 0.5;
  filter: alpha(opacity=50);
}
</style>