<script lang="ts">
  import { Gender } from "$lib/consts/gender";
  import Booking from "$lib/models/booking/booking_model";
  import WorkerModel from "$lib/models/worker/worker_model";
  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers";
  import { imageByGender } from "$lib/utils/images_utils";
  import { _, translate } from "$lib/utils/translate";

  export let booking: Booking;

  let currentWorker: WorkerModel | undefined;

  if (
    $businessStore != null &&
    booking.buisnessId === $businessStore.businessId
  ) {
    currentWorker = $workersStore[booking.workerId]!;
  }
</script>

<div class="flex flex-row justify-center">
  <div class="avatar">
    <div class="mask mask-squircle w-[70px] h-[70px] rounded-full">
      <img
        src={booking.shopIcon.getShopIconPath(booking.buisnessId)}
        alt={translate("theProfileOfTemplate", $_).replace(
          "NAME",
          $businessStore?.shopName ?? ""
        )}
      />
    </div>
  </div>

  <div class="avatar relative top-[42px] end-[26px]">
    <div class="mask mask-squircle w-[30px] h-[30px] rounded-full">
      <img
        src={currentWorker?.profileImg ??
          imageByGender(currentWorker?.gender ?? Gender.male)}
        alt={translate("theProfileOfTemplate", $_).replace(
          "NAME",
          currentWorker?.name ?? ""
        )}
      />
    </div>
  </div>
</div>
