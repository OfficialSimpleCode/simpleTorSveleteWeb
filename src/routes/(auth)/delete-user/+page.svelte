<script lang="ts">
  import { page } from "$app/stores";
  import { LoginReason } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import LoginContainer from "../components/login/LoginContainer.svelte";
  onMount(() => {
    VerificationHelper.GI().setupLoggin();
  });
</script>

<svelte:head>
  <!-- business title -->
  <title
    >{translate("simpleTorWebTitle", $_, false)} | {translate(
      "deleteUser",
      $_,
      false
    )}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/delete-user`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{translate('simpleTorWebTitle', $_, false)} | {translate(
      'deleteUser',
      $_,
      false
    )}"
  />
</svelte:head>

<LoginContainer loginReason={LoginReason.deleteUser} />
