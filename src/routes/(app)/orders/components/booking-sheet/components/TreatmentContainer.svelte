<script lang="ts">
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import type Booking from "$lib/models/booking/booking_model";
  import { Duration } from "$lib/models/core/duration";
  import type Treatment from "$lib/models/general/treatment_model";
  import { durationToString } from "$lib/utils/string_utils";
  import { translate } from "$lib/utils/translate";
  import { deleteTreatment } from "../../../helpers/delete_treatement";

  export let treatment: Treatment;
  export let booking: Booking;
  export let treatmentIndex: string;

  async function onDeleteTreatment() {
    await deleteTreatment(booking, treatmentIndex);
  }
</script>

<div
  class="flex flex-row w-full justify-between items-center bg-base-300 rounded-lg py-2 px-2 gap-2"
>
  <div class="flex flex-row items-center gap-2">
    <GeneralIcon icon="icon-park-outline:asterisk" size={16} />
    <!-- like a listTile widget -->
    <div class="flex flex-col items-start">
      <!-- <title></title> -->
      <p>
        {treatment.name}
        {treatment.count === 1 ? "" : `x ${treatment.count}`}
      </p>

      <!-- subTitle -->
      <div class="text-sm flex flex-row gap-2">
        <p>
          {treatment.showPrice
            ? treatment.price?.toString()
            : translate("noPrice")}
        </p>
        <p>
          {treatment.showTime
            ? durationToString(
                new Duration({ minutes: treatment.totalMinutes })
              )
            : translate("noTime")}
        </p>
      </div>
    </div>
  </div>

  <CustomCircleIcon
    icon="ph:trash-bold"
    size={16}
    handleClick={onDeleteTreatment}
    bgColor={"bg-base-200"}
  />
</div>
