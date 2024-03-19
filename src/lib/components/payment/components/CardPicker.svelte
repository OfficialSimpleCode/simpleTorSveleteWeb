<script lang="ts">
  import CreditCard from "$lib/components/custom_components/CreditCard.svelte";
  import PaymentCard from "$lib/models/payment_hyp/payment_card";
  import type UserModel from "$lib/models/user/user_model";
  import { userStore } from "$lib/stores/User";
  import { createEventDispatcher } from "svelte";

  export let businessId: string | undefined = undefined;
  const dispatch = createEventDispatcher();

  function getAllBusinessCards(user: UserModel): Record<string, PaymentCard> {
    if (businessId) {
      return user.paymentCards[businessId];
    } else {
      const cards: Record<string, PaymentCard> = {};
      Object.entries(user.paymentCards).forEach(([_, businessCards]) => {
        Object.entries(businessCards).forEach(([cardId, card]) => {
          cards[cardId] = card;
        });
      });
      return cards;
    }
  }
  let cards: Record<string, PaymentCard> = getAllBusinessCards($userStore);
  userStore.subscribe((v) => {
    cards = getAllBusinessCards(v);
  });
</script>

{#each Object.entries(cards) as [cardId, card]}
  <CreditCard {card} {dispatch} />
{/each}
