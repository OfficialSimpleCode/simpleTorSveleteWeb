<script lang="ts">
  import type { Gender } from "$lib/consts/gender";
  import { themeStore } from "$lib/controllers/theme_controller";
  import Booking from "$lib/models/booking/booking_model";
  import WorkerModel from "$lib/models/worker/worker_model";
  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers";
  import { getDefaultLogo, imageByGender } from "$lib/utils/images_utils";
  import { _, translate } from "$lib/utils/translate";

  export let booking: Booking;
  export let shimmerEffect: boolean = false;

  let currentWorker: WorkerModel | undefined;
  let workerGender: Gender = booking.workerGender;
  let workerProfile: string = "";
  $: if (
    $businessStore != null &&
    booking.buisnessId === $businessStore.businessId
  ) {
    currentWorker = $workersStore[booking.workerId];
    if (currentWorker != null) {
      workerProfile = currentWorker.profileImg;
      workerGender = currentWorker.gender;
    }
  }

  $: shopIcon = booking.shopIcon.getShopIconPath(booking.buisnessId);
</script>

<div class="flex flex-row justify-center">
  <div class="avatar">
    <div
      class="mask mask-squircle w-[70px] h-[70px] rounded-full {shimmerEffect
        ? 'me-1 bg-base-content opacity-10 '
        : ''} "
    >
      <img
        class={shimmerEffect ? "hidden" : ""}
        src={shopIcon ? shopIcon : getDefaultLogo($themeStore?.background)}
        alt={translate("theProfileOfTemplate", $_).replace(
          "NAME",
          $businessStore?.shopName ?? ""
        )}
      />
    </div>
  </div>

  <div
    class="avatar relative top-[42px] end-[20px] {shimmerEffect
      ? 'hidden'
      : ''} "
  >
    <div
      class="mask mask-squircle w-[30px] h-[30px] rounded-full border-[1px] border-opacity-70"
    >
      <img
        src={workerProfile != "" ? workerProfile : imageByGender(workerGender)}
        alt={translate("theProfileOfTemplate", $_).replace(
          "NAME",
          currentWorker?.name ?? ""
        )}
      />
    </div>
  </div>
</div>
