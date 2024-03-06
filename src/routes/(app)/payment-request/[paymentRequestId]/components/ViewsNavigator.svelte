<script lang="ts">
</script>

<!-- 
{#if $paymentRequestStore.preview?.id == null}
  <NotFoundView />
{:else if $paymentRequestStore.user != null && $paymentRequestStore.user.userDecline === $paymentRequestStore.user.count}
  <DeclinedView />
{:else if $paymentRequestStore.user == null && $paymentRequestStore.preview.closeForAll && $paymentRequestStore.preview.workerId != UserInitializer.GI().user.id}
  <NotBelongView />
{:else}
  <RegularView />
{/if} -->
