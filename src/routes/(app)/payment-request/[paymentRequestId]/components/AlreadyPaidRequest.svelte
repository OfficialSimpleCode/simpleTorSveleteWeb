<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import LogoAndName from "$lib/components/custom_components/LogoAndName.svelte";
  import { translate } from "$lib/utils/translate";
  import WatchPaymentsButton from "./WatchPaymentsButton.svelte";
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10">
  <h1 class="text-xl">{translate("alreadyPaidRequest")}</h1>
  <h2 class="text-md">
    {translate("alreadyPaidRequestExplain")}
  </h2>
  <WatchPaymentsButton />
  <GeneralIcon icon="material-symbols:error-outline" size={300} />
  <LogoAndName />
</main>
