<script lang="ts">
  import Booking from "$lib/models/booking/booking_model";
  import { dateToDateStr, dateToTimeStr } from "$lib/utils/times_utils";
  import { translate, _ } from "$lib/utils/translate";

  export let booking: Booking;
  const keyWord: string = translate(
    booking.isMultiRef ? "signAt" : "createdAt",
    $_,
  );
  const createdAt: Date = booking.createdAt;
</script>

<p class="opacity-90">
  {keyWord + dateToDateStr(createdAt) + " / " + dateToTimeStr(createdAt)}
</p>
