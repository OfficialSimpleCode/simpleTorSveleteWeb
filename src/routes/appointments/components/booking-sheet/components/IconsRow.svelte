<script lang="ts">
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import Booking from "$lib/models/booking/booking_model";
  import { MapPin, Pencil, Trash } from "svelte-hero-icons";

  export let booking: Booking;
  booking.bookingDate;
</script>

<div class="flex flex-row gap-4 justify-start w-full">
  <CustomCircleIcon icon={Trash} translateKey="delete"></CustomCircleIcon>
  <CustomCircleIcon icon={Pencil} translateKey="edit"></CustomCircleIcon>
  <CustomCircleIcon icon={MapPin} translateKey="navigate"></CustomCircleIcon>
</div>
