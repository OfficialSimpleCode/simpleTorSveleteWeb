<script>
  import { _ } from "$lib/utils/translate";

  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
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

<div class="flex flex-col justify-start w-[90%]">
  <button
    on:click={handleTuggleClick}
    class=" w-[70%] flex flex-row gap-2 items-center max-w-[80%] rounded-2xl"
    class:opacity-60={!$bookingMakerStore.pickMultipleServices}
  >
    <CustomCircleIcon
      icon="mdi:checkbox-multiple-blank"
      size="md"
      marked={$bookingMakerStore.pickMultipleServices}
    />
    {$_("chooseMulti")}
  </button>
</div>
