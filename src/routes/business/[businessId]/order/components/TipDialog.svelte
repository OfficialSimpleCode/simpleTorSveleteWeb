<script lang="ts">
    import { businessStore } from "$lib/stores/Business.js";
    import ChoosePaymentCardDialog from "./ChoosePaymentCardDialog.svelte";

    export let dialog: HTMLDialogElement;
    export let amount: number;

    let tip: number = 0;
    let tipOptions: number[] = [0, 5, 10, 17];

    let totalAmount: number = amount;
    $: totalAmount = amount + amount * (tip / 100);

    let choosePaymentDialog: HTMLDialogElement;
</script>

<!-- Dialogs -->
<ChoosePaymentCardDialog
    bind:dialog={choosePaymentDialog}
    bind:amount={totalAmount}
/>

<dialog
    bind:this={dialog}
    class="modal modal-bottom sm:modal-middle"
    style="direction: ltr;"
    on:close={() => {
        // history.back();
    }}
>
    <div class="modal-box bg-base-200 flex flex-col gap-4">
        <h1 class="text-xl text-center">
            Pay - {totalAmount.toFixed(2)}{$businessStore.currency.symbol}
        </h1>
        <div
            class="bg-base-300 rounded-lg w-full p-3 flex flex-col items-center gap-4"
        >
            <h2 class="text-lg">Tip (calculated on full amount)</h2>
            <div class="flex items-center justify-around w-full">
                {#each tipOptions as tipOption}
                    <button
                        class="btn btn-outline"
                        class:btn-secondary={tip == tipOption}
                        on:click={() => (tip = tipOption)}
                    >
                        {tipOption}%
                    </button>
                {/each}
            </div>
            <!-- <div class="text-lg font-bold">{tip}%</div> -->
            <input
                type="range"
                min="0"
                max="100"
                bind:value={tip}
                class="range"
            />
        </div>
        <div class="modal-action">
            <button class="btn btn-outline" on:click={() => dialog.close()}>
                Cancel
            </button>
            <button
                class="btn btn-primary"
                on:click={() => choosePaymentDialog.showModal()}
            >
                Continue
            </button>
        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
