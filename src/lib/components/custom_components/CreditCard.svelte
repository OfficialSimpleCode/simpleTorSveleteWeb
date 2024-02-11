<script lang="ts">
  import PaymentCard from "$lib/models/payment_hyp/payment_card";
  import { createEventDispatcher, type EventDispatcher } from "svelte";

  export let card: PaymentCard;

  export let dispatch: EventDispatcher<any> = createEventDispatcher();

  function onTapCard() {
    return dispatch("onTap", card);
  }
</script>

<button on:click={onTapCard}>
  <section>
    <h3>**** **** **** {card.l4Digits}</h3>
    <h3>{card.name}</h3>
  </section>
</button>
