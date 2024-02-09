<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import ViewsNavigator from "./components/ViewsNavigator.svelte";

  import {
    initialPaymentRequestStore,
    paymentRequestStore,
  } from "./payment_request_controller";

  const paymentRequestId = $page.url.pathname.replaceAll(
    `${base}/payment-request/`,
    ""
  );
  console.log("3333333333333333333333", paymentRequestId);
  initialPaymentRequestStore(paymentRequestId);
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10">
  <Navbar />
  {#if $paymentRequestStore.preview}
    <ViewsNavigator />
  {:else}
    <div class="loading loading-spinner" />
  {/if}
</main>
