<script>
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { _, translate } from "$lib/utils/translate";
</script>

{#if Object.keys($bookingMakerStore.services).length > 0 && $bookingMakerStore.pickMultipleServices}
  <div class="flex flex-col items-center gap-4 w-full">
    <button class="btn btn-primary max-w-[90%] sm:max-w-sm w-full"
      >{translate("continue", $_)}
    </button>
  </div>
{/if}
