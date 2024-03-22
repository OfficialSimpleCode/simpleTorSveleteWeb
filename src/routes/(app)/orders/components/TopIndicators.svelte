<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import type Booking from "$lib/models/booking/booking_model";
  import { _, translate } from "$lib/utils/translate";
  import RecurranceIndicator from "./RecurranceIndicator.svelte";

  export let isNow: Boolean;
  export let booking: Booking;
</script>

<!-- now indicator -->
{#if isNow}
  <div class="flex flex-row w-full px-8 top-[3px] mb-1 justify-center gap-2">
    <p>{translate("happedNow", $_)}</p>
    <GeneralIcon icon="material-symbols:timer" />
  </div>
{/if}

<RecurranceIndicator {booking}></RecurranceIndicator>
