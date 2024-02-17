<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import type Booking from "$lib/models/booking/booking_model";
  import RecurranceIndicator from "./RecurranceIndicator.svelte";

  export let isNow: Boolean;
  export let booking: Booking;
</script>

<!-- now indicator -->
<div class="absolute text-end w-full px-8 top-[3px] {isNow ? '' : 'hidden'}">
  <GeneralIcon icon="mdi:timer-pause-outline"></GeneralIcon>
</div>

<RecurranceIndicator {booking}></RecurranceIndicator>
