<script lang="ts">
</script>

<dialog
  id="recaptchaDialog"
  on:close={() => history.back()}
  class="modal modal-middle"
>
  <!-- backdrop close dialog -->
  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
