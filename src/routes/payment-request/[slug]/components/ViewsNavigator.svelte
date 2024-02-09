<script lang="ts">
  import UserInitializer from "$lib/initializers/user_initializer";
  import { paymentRequestStore } from "../payment_request_controller";
  import DeclinedView from "./DeclinedView.svelte";
  import NotBelongView from "./NotBelongView.svelte";
  import NotFoundView from "./NotFoundView.svelte";
  import RegularView from "./RegularView.svelte";
</script>

{#if $paymentRequestStore.preview?.id == null}
  <NotFoundView />
{:else if $paymentRequestStore.user != null && $paymentRequestStore.user.userDecline == $paymentRequestStore.user.count}
  <DeclinedView />
{:else if $paymentRequestStore.user == null && $paymentRequestStore.preview.closeForAll && $paymentRequestStore.preview.workerId != UserInitializer.GI().user.id}
  <NotBelongView />
{:else}
  <RegularView />
{/if}
