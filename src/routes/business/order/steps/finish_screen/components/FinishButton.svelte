<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
  import { addBooking } from "../helpers/add_booking";
</script>

<!-- xs:px-10 px-3 -->
<div class="w-full">
  <button
    class="btn sm:text-xl btn-primary w-full"
    on:click={() => addBooking({ clientNote: "" })}
    >{translate("setBooking", $_)}</button
  >
</div>
