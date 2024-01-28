<script lang="ts">
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import Booking from "$lib/models/booking/booking_model";

  export let booking: Booking;
  booking.bookingDate;
</script>

<div class="flex flex-row gap-4 justify-start w-full">
  <CustomCircleIcon icon="mdi:trash-can-outline" translateKey="delete"
  ></CustomCircleIcon>
  <CustomCircleIcon icon="mdi:edit-outline" translateKey="edit"
  ></CustomCircleIcon>
  <CustomCircleIcon icon="mdi:map-marker-outline" translateKey="navigate"
  ></CustomCircleIcon>
</div>
