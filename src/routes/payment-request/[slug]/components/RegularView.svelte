<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import { translate } from "$lib/utils/translate";
  import { paymentRequestStore } from "../payment_request_controller";

  let loading: boolean = false;

  async function handlePayment() {
    if (loading) {
      return;
    }
    loading = true;
    try {
    } finally {
      loading = false;
    }
  }

  async function handleDecline() {
    if (loading) {
      return;
    }
    loading = true;
    try {
    } finally {
      loading = false;
    }
  }
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10">
  <h3 class="text-xl">{translate("paymentRequest")}</h3>
  <h3 class="text-md">
    {translate("paymentRequestExplain").replaceAll(
      "NAME",
      $paymentRequestStore.preview?.workerName ?? ""
    )}
  </h3>
  <h3 class="text-2xl">
    {$paymentRequestStore.preview?.price.toString()}
  </h3>
  <div class="w-full">
    <button
      class="btn sm:text-xl btn-primary w-full {loading ? 'opacity-55' : ''}"
      on:click={handlePayment}
    >
      {#if loading}
        <div class="loading loading-spinner" />
      {:else}
        <div class="flex flex-row">
          <GeneralIcon icon="ic:baseline-payment" />
          {translate("pay")}
        </div>
      {/if}
    </button>
  </div>
  <h3 class="text-sm">
    {translate("declineRequest")}
  </h3>
</main>
