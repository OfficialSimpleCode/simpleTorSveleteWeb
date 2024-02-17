<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import { isNotEmpty } from "$lib/utils/core_utils";
  import { translate } from "$lib/utils/translate";
  import { paymentRequestStore } from "../payment_request_controller";

  let loading = false;
  function handleClick() {}
</script>

{#if $paymentRequestStore.user != null && isNotEmpty($paymentRequestStore.user.payments)}
  <div class="w-full">
    <button class="btn sm:text-xl btn-primary w-full" on:click={handleClick}>
      {#if loading}
        <div class="loading loading-spinner" />
      {:else}
        <div class="flex flex-row">
          <GeneralIcon icon="ic:baseline-payment" />
          {translate("watchPayment")}
        </div>
      {/if}
    </button>
  </div>
{/if}
