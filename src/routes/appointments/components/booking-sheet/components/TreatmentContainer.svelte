<script lang="ts">
  import { Icon, Star, Trash } from "svelte-hero-icons";

  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import { Duration } from "$lib/models/core/duration";
  import type Treatment from "$lib/models/general/treatment_model";
  import { durationToString } from "$lib/utils/string_utils";
  import { translate } from "$lib/utils/translate";

  export let treatment: Treatment;
</script>

<div
  class="flex flex-row w-full justify-between items-center bg-base-300 rounded-lg py-2 px-2 gap-2"
>
  <div class="flex flex-row items-center gap-2">
    <Icon src={Star} size="26px" />
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
    icon={Trash}
    translateKey=""
    size="16px"
    bgColor={"bg-base-200"}
  ></CustomCircleIcon>
</div>
