<script>
  import { _ } from "$lib/utils/translate";

  import { bookingMakerStore } from "$lib/controllers/booking_controller";
</script>

<div class="w-full flex flex-row items-center justify-between max-w-[90%]">
  {$_("chooseMulti")}
  <input
    bind:checked={$bookingMakerStore.pickMultipleServices}
    type="checkbox"
    class="toggle toggle-accent"
  />
</div>
