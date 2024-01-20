<script lang="ts">
    import PaymentPasswordDialog from "./PaymentPasswordDialog.svelte";

    export let dialog: HTMLDialogElement;
    export let amount: number;

    let paymentPasswordDialog: HTMLDialogElement;

    function onPay() {}
</script>

<!-- Dialogs -->
<PaymentPasswordDialog bind:dialog={paymentPasswordDialog} bind:amount />

<dialog
    bind:this={dialog}
    class="modal modal-bottom sm:modal-middle"
    on:close={() => {
        // history.back();
    }}
>
    <div class="modal-box bg-base-200 flex flex-col gap-4">
        <h1 class="text-xl text-center">Choose Payment Option</h1>

        <div
            class="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box"
        >
            <div class="carousel-item">
                <img
                    src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                    class="rounded-box"
                />
            </div>
            <div class="carousel-item">
                <img
                    src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                    class="rounded-box"
                />
            </div>
            <div class="carousel-item">
                <img
                    src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                    class="rounded-box"
                />
            </div>
            <div class="carousel-item">
                <img
                    src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                    class="rounded-box"
                />
            </div>
            <div class="carousel-item">
                <img
                    src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                    class="rounded-box"
                />
            </div>
            <div class="carousel-item">
                <img
                    src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                    class="rounded-box"
                />
            </div>
            <div class="carousel-item">
                <img
                    src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                    class="rounded-box"
                />
            </div>
        </div>

        <div class="modal-action">
            <button class="btn btn-outline" on:click={() => dialog.close()}>
                Back
            </button>
            <button
                class="btn btn-primary"
                on:click={() => {
                    dialog.close();
                    paymentPasswordDialog.showModal();
                }}
            >
                Pay
            </button>
        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
