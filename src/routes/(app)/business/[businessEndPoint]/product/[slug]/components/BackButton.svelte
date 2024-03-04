<script>
  import { _, translate } from "$lib/utils/translate";
</script>

<!-- back button -->
<button
  class="btn btn-outline min-w-[200px] mt-10 mb-4 md:hidden"
  on:click={() => history.back()}
>
  {translate("back", $_)}
</button>
