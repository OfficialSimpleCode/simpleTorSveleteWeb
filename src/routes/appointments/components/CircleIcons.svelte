<script lang="ts">
  import Booking from "$lib/models/booking/booking_model";
  import WorkerModel from "$lib/models/worker/worker_model";
  import { businessStore } from "$lib/stores/Business";

  export let booking: Booking;

  let currentWorker: WorkerModel | undefined;

  if (
    $businessStore.workersIds.get(booking.workerId) != null &&
    booking.buisnessId == $businessStore.businessId
  ) {
    currentWorker = new WorkerModel({}); //$businessStore.workersIds.get(booking.workerId)!;
  }

  function getShopIconPath(): string {
    return `https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2Fproduction%2F${booking.buisnessId}%2Fimages%2Flogos%2FSHOPICON${booking.shopIcon.id}?alt=media&token=${booking.shopIcon.token}`;
  }
</script>

<div class="flex flex-row">
  <div class="avatar">
    <div class="mask mask-squircle w-[70px] h-[70px] rounded-full">
      <img src={getShopIconPath()} alt="business profile" />
    </div>
  </div>

  <div class="avatar relative top-[42px] end-[26px]">
    <div class="mask mask-squircle w-[30px] h-[30px] rounded-full">
      <img src={getShopIconPath()} alt="business profile" />
    </div>
  </div>
</div>
