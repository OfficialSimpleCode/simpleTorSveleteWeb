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

<div
  class="flex flex-col items-center sm:h-[90%] h-[85%] pt-10 justify-between"
>
  <!-- page title -->
  <h3 class="text-2xl">{translate("paymentRequest")}</h3>

  <!-- content -->
  <div class="flex flex-col justify-center items-center">
    <!-- payment title -->
    <h3 class="text-md">
      {translate("paymentRequestExplain").replaceAll(
        "NAME",
        $paymentRequestStore.preview?.workerName ?? ""
      )}
    </h3>

    <!-- payment preview -->
    <h3 class="text-2xl">
      {$paymentRequestStore.preview?.price.toString()}
    </h3>

    <!-- pay for the request -->
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

  <!-- Decline request -->
  <h3 class="text-sm">
    {translate("declineRequest")}
  </h3>
</div>
