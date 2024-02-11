<script>
  import { _ } from "$lib/utils/translate";

  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import { bookingMakerStore } from "$lib/controllers/booking_controller";

  function handleTuggleClick() {
    if (!$bookingMakerStore.pickMultipleServices) {
      $bookingMakerStore.pickMultipleServices = true;
    } else {
      // need to remove all the selected services
      $bookingMakerStore.services = {};
      // update the ui
      $bookingMakerStore.pickMultipleServices = false;
    }
  }
</script>

<button
  on:click={handleTuggleClick}
  class="w-full flex flex-row gap-2 items-center max-w-[90%]"
  class:opacity-50={!$bookingMakerStore.pickMultipleServices}
>
  <GeneralIcon icon="mdi:checkbox-multiple-blank"></GeneralIcon>
  {$_("chooseMulti")}
</button>
