<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import type PaymentCard from "$lib/models/payment_hyp/payment_card";
  import { isConnectedStore } from "$lib/stores/User";
  import CardPicker from "./components/CardPicker.svelte";

  isConnectedStore.subscribe((value) => {
    //redirect to the login page if the user is not connected
    if (value === false) {
      goto(`${base}/login`);
    }
  });

  function onPickedCard(event: CustomEvent<PaymentCard>) {
    console.log(event.detail);
  }
</script>

{#if $isConnectedStore === undefined}
  <div class="loading loading-spinner" />
{:else if $isConnectedStore === true}
  <CardPicker on:onTap={onPickedCard} />
{/if}
