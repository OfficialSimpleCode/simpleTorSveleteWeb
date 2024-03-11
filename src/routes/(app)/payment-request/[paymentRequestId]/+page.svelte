<script lang="ts">
  import { page } from "$app/stores";
  import DownloadAppDialog from "$lib/components/dialogs/DownloadAppDialog.svelte";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import ViewsNavigator from "./components/ViewsNavigator.svelte";
  import { paymentRequestStore } from "./payment_request_controller";
  let downloadDialog: HTMLDialogElement;

  onMount(() => {
    setTimeout(() => {
      pushDialog(downloadDialog);
    }, 100);
  });
</script>

<svelte:head>
  <!-- business title -->
  <title
    >{translate("simpleTorWebTitle", $_, false)} | {translate(
      "paymentRequest",
      $_,
      false
    )}</title
  >

  <!-- the url for search to display for this site -->
  <link
    rel="canonical"
    href={`${$page.url.origin}/payment-request/${
      $paymentRequestStore.preview?.id ? $paymentRequestStore.preview?.id : ""
    }`}
  />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{translate('simpleTorWebTitle', $_, false)} | {translate(
      'paymentRequest',
      $_,
      false
    )}"
  />
</svelte:head>

<DownloadAppDialog bind:dialog={downloadDialog} />
<main class="w-full h-full text-center">
  {#if $paymentRequestStore.preview}
    <ViewsNavigator />
  {:else}
    <div class="loading loading-spinner" />
  {/if}
</main>
