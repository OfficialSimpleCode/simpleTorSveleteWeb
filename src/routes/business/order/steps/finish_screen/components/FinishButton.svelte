<script lang="ts">
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { _, translate } from "$lib/utils/translate";
  import { onFinishNavigator } from "../helpers/on_finish_navigator";

  let isLoading: boolean = false;

  function handleClick() {
    if (isLoading) {
    } else {
      onFinishNavigator({ clientNote: "" });
      isLoading = true;
    }
  }
</script>

<!-- xs:px-10 px-3 -->
<div class="w-full">
  <button
    class="btn sm:text-xl btn-primary w-full {isLoading ? 'opacity-55' : ''}"
    on:click={handleClick}
    >{isLoading
      ? "Loading"
      : translate(
          $bookingMakerStore.isUpdate ? "update" : "setBooking",
          $_
        )}</button
  >
</div>
