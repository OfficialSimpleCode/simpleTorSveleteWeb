<script lang="ts">
  import DateString from "$lib/components/DateString.svelte";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { _ } from "$lib/utils/translate";
  import TipDialog from "../../components/TipDialog.svelte";
  import AddNote from "./components/AddNote.svelte";
  import FinishButton from "./components/FinishButton.svelte";
  import ServicesPreview from "./components/ServicesPreview.svelte";

  let paymentDialog: HTMLDialogElement;
  let amount: number;
</script>

<!-- Dialogs -->
<TipDialog bind:dialog={paymentDialog} bind:amount />

<section class="flex flex-col items-center gap-8 w-[90%] sm:w-[70%]">
  <!-- the worker name indicator -->
  <h1 class="text-3xl text-center">
    {$_("bookAnOrder")}
    {$_("to")}
    <span class="font-bold text-primary">{BookingController.worker.name}</span>
  </h1>

  <div class="text-lg xs:text-2xl">
    <DateString
      date={$bookingMakerStore.date ?? new Date()}
      showTodayAndTommrow={true}
    ></DateString>
  </div>

  <!-- serivces preview and option to edit the service -->
  <ServicesPreview></ServicesPreview>

  <!-- the user note  -->
  <AddNote></AddNote>

  <!-- finish button (could be pay or deposin) -->
  <FinishButton></FinishButton>
</section>
