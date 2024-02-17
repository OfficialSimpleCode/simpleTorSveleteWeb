<script lang="ts">
  import Chip from "$lib/images/chip.png";
  import PaymentCard from "$lib/models/payment_hyp/payment_card";
  import { createEventDispatcher, type EventDispatcher } from "svelte";
  import GeneralIcon from "./GeneralIcon.svelte";

  export let card: PaymentCard;

  export let dispatch: EventDispatcher<any> = createEventDispatcher();

  function onTapCard() {
    return dispatch("onTap", card);
  }
</script>

<html lang="en">
  <div class="container">
    <header>
      <span class="logo">
        <GeneralIcon icon="ic:outline-payment" />
        <div class="w-[10px]" />
        <h5>{card.bankName}</h5>
      </span>
      <img src={Chip} alt="" class="chip" />
    </header>
    <div class="card-details">
      <div class="name-number">
        <h6>Card Number</h6>
        <h5 class="number">{card.l4Digits} *** *** ***</h5>
        <h5 class="name">{card.name}</h5>
      </div>
      <div class="valid-date">
        <h6>Valid Thru</h6>
        <h5>****</h5>
      </div>
    </div>
  </div>
</html>

<style>
  /* Import Google Font - Poppins */
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e3f2fd;
  }
  .container {
    position: relative;
    background-image: url("$lib/images/bg.png");
    background-size: cover;
    padding: 25px;
    border-radius: 28px;
    max-width: 380px;
    width: 100%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
  header,
  .logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo img {
    width: 48px;
    margin-right: 10px;
  }
  h5 {
    font-size: 16px;
    font-weight: 400;
    color: #fff;
  }

  h6 {
    color: #fff;
    font-size: 10px;
    font-weight: 400;
  }
  h5.number {
    margin-top: 4px;
    font-size: 18px;
    letter-spacing: 1px;
  }
  h5.name {
    margin-top: 20px;
  }
  .chip {
    width: 40px;
    height: 30px;
  }
  .container .card-details {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
</style>
