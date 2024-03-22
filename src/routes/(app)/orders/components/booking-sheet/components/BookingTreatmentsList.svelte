<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import TreatmentContainer from "./TreatmentContainer.svelte";

  export let booking: Booking;
</script>

{#each Object.entries(booking.treatments) as [index, treatment]}
  <TreatmentContainer {treatment} {booking} treatmentIndex={index} />
{/each}
