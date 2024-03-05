<script>
  import { _, translate } from "$lib/utils/translate";
</script>

<!-- back button -->
<div class="w-full flex flex-row items-center justify-center md:hidden">
  <button
    class="btn btn-outline min-w-[200px] mt-10 mb-4"
    on:click={() => history.back()}
  >
    {translate("back", $_)}
  </button>
</div>
