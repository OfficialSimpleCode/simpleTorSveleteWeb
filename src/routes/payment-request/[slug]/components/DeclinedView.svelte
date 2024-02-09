<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import LogoAndName from "$lib/components/custom_components/LogoAndName.svelte";
  import { translate } from "$lib/utils/translate";
  import WatchPaymentsButton from "./WatchPaymentsButton.svelte";
</script>

<div
  class="flex flex-col items-center sm:h-[90%] h-[85%] pt-10 justify-between"
>
  <!-- page title -->
  <h3 class="text-2xl">{translate("requestDeclined")}</h3>

  <!-- content -->
  <div class="flex flex-col justify-center items-center">
    <h3 class="text-md">
      {translate("requestDeclinedExplain")}
    </h3>
    <WatchPaymentsButton />
    <GeneralIcon icon="material-symbols:error-outline" size={300} />
  </div>

  <!-- botton logo and name -->
  <LogoAndName />
</div>
