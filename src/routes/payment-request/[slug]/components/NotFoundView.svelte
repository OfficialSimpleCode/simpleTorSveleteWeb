<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import LogoAndName from "$lib/components/custom_components/LogoAndName.svelte";
  import { translate } from "$lib/utils/translate";
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10">
  <h3 class="text-xl">{translate("requestNotFound")}</h3>
  <h3 class="text-md">
    {translate("requestNotFoundExplain")}
  </h3>
  <GeneralIcon icon="material-symbols:error-outline" size={70} />
  <LogoAndName />
</main>
