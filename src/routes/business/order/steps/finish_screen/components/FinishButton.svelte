<script lang="ts">
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { _, translate } from "$lib/utils/translate";
  import { onFinishNavigator } from "../helpers/on_finish_navigator";
</script>

<!-- xs:px-10 px-3 -->
<div class="w-full">
  <button
    class="btn sm:text-xl btn-primary w-full"
    on:click={() => onFinishNavigator({ clientNote: "" })}
    >{translate(
      $bookingMakerStore.isUpdate ? "update" : "setBooking",
      $_
    )}</button
  >
</div>
