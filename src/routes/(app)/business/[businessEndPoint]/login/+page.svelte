<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { LoginReason } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { isConnectedStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import LoginContainer from "../../../../(auth)/components/login/LoginContainer.svelte";

  onMount(() => {
    VerificationHelper.GI().setupLoggin();
    isConnectedStore.subscribe((value) => {
      if (value === true) {
        goto(`${base}/profile`);
      }
    });
  });
</script>

<svelte:head>
  <!-- business title -->
  <title
    >{translate("simpleTorWebTitle", $_, false)} | {translate(
      "login",
      $_,
      false
    )}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/login`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{translate('simpleTorWebTitle', $_, false)} | {translate(
      'login',
      $_,
      false
    )}"
  />
</svelte:head>
<div class="h-screen w-full">
  <div class=" pt-10 h-full">
    <LoginContainer loginReason={LoginReason.login} />
  </div>
</div>
