<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import LogoAndName from "$lib/components/custom_components/LogoAndName.svelte";
  import { translate } from "$lib/utils/translate";
</script>

<div
  class="flex flex-col items-center sm:h-[90%] h-[85%] pt-10 justify-between"
>
  <!-- page title -->
  <h3 class="text-2xl">{translate("requestNotFound")}</h3>

  <!-- content -->
  <div class="flex flex-col justify-center items-center">
    <h3 class="text-md">
      {translate("requestNotFoundExplain")}
    </h3>
    <GeneralIcon icon="material-symbols:error-outline-rounded" size={70} />
  </div>

  <!-- botton logo and name -->
  <LogoAndName />
</div>
