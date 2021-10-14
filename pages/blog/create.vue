<template>
  <div id="createPost">
<div class="form-group">
  <label for="exampleFormControlTextarea2">Tiêu Đề</label>
  <textarea class="form-control rounded-0" id="exampleFormControlTextarea2" rows="3"></textarea>
</div>
<div class="form-group">
  <label for="exampleFormControlTextarea1">Nội dung</label>
  <textarea class="form-control rounded-0" id="exampleFormControlTextarea1" rows="10"></textarea>
</div>
<br>
<div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <button class="btn btn-primary me-md-2" type="button">Save</button>
</div>
<div id="summernote"><p>Hello Summernote</p></div>
  <script>
    $(document).ready(function() {
        $('#summernote').summernote();
    });
  </script>
  </div>
  
</template>