<script lang="ts">
  import ViewsNavigator from "./components/ViewsNavigator.svelte";
  import { paymentRequestStore } from "./payment_request_controller";
</script>

<main class="w-full h-full text-center">
  {#if $paymentRequestStore.preview}
    <ViewsNavigator />
  {:else}
    <div class="loading loading-spinner" />
  {/if}
</main>
