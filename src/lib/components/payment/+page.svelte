<script lang="ts">
  import { goto, pushState } from "$app/navigation";
  import { base } from "$app/paths";
  import type PaymentCard from "$lib/models/payment_hyp/payment_card";
  import { isConnectedStore } from "$lib/stores/User";

  let verifiedCardPasswordDialog: HTMLDialogElement;

  let pickedCard: PaymentCard;

  isConnectedStore.subscribe((value) => {
    //redirect to the login page if the user is not connected
    if (value === false) {
      goto(`${base}/login`);
    }
  });

  function onPickedCard(event: CustomEvent<PaymentCard>) {
    pickedCard = event.detail;
    pushState(``, {
      showModal: true,
    });

    setTimeout(() => verifiedCardPasswordDialog.showModal(), 200);
  }

  function onFinishCardVerification() {
    verifiedCardPasswordDialog.close();
  }
</script>

<!-- {#if $page.state.showModal}
  <VerifiedCardPassword
    on:onFinishVerifiedCardPassword={() =>{}}
    bind:dialog={verifiedCardPasswordDialog}
  />
{/if}
{#if $isConnectedStore === undefined}
  <div class="loading loading-spinner" />
{:else if $isConnectedStore === true}
  <CardPicker on:onTap={onPickedCard} />
{/if} -->
