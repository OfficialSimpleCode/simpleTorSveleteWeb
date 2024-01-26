<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import TreatmentContainer from "./TreatmentContainer.svelte";

  export let booking: Booking;
</script>

{#each booking.treatments as [key, treatment]}
  <TreatmentContainer {treatment}></TreatmentContainer>
{/each}
