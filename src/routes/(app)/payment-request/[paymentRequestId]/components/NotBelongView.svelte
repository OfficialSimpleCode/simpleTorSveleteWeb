<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import LogoAndName from "$lib/components/custom_components/LogoAndName.svelte";
  import { translate } from "$lib/utils/translate";
</script>

<div
  class="flex flex-col items-center sm:h-[90%] h-[85%] pt-10 justify-between"
>
  <!-- page title -->
  <h1 class="text-2xl">{translate("notBelongRequest")}</h1>

  <!-- content -->
  <div class="flex flex-col justify-center items-center">
    <h2 class="text-md">
      {translate("notBelongRequestExplain")}
    </h2>
    <GeneralIcon icon="material-symbols:error-outline" size={300} />
  </div>

  <!-- botton logo and name -->
  <LogoAndName />
</div>
