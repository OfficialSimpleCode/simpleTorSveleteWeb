<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import ViewsNavigator from "./components/ViewsNavigator.svelte";
  import { paymentRequestStore } from "./payment_request_controller";

  //export let data;
  // //get the data loaded from the load func in the +page.server
  // paymentRequestStore.set({
  //   bookingId: data.bookingId,
  //   paymentRequest:
  //     data.paymentRequest != null
  //       ? PaymentRequest.fromJson(data.paymentRequest, data.preview?.id ?? "")
  //       : undefined,
  //   preview:
  //     data.preview != null
  //       ? PaymentRequestPreview.fromJson(data.preview, data.preview?.id ?? "")
  //       : undefined,
  //   user:
  //     data.user != null
  //       ? PaymentRequestUser.fromJson(data.user, data.user.id)
  //       : undefined,
  // });
</script>

<main class="w-full h-full text-center">
  <Navbar />
  {#if $paymentRequestStore.preview}
    <ViewsNavigator />
  {:else}
    <div class="loading loading-spinner" />
  {/if}
</main>
