<script lang="ts">
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { _, translate } from "$lib/utils/translate";

  export let continueFunc: () => void;
</script>

{#if Object.keys($bookingMakerStore.services).length > 0 && $bookingMakerStore.pickMultipleServices}
  <div class="flex flex-col items-center max-w-[360px] w-[300px] pt-10">
    <button class="btn btn-primary sm:max-w-sm w-full" on:click={continueFunc}
      >{translate("continue", $_)}
    </button>
  </div>
{/if}
