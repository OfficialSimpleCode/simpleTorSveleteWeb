<script lang="ts">
    import {
        Icon,
        InformationCircle,
        XCircle,
        ChevronRight,
        HandThumbUp,
        PaperClip,
        CreditCard,
        ReceiptRefund,
        Key,
    } from "svelte-hero-icons";
    import InfoCircle from "$lib/components/InfoCircle.svelte";

    export let dialog: HTMLDialogElement;
</script>

<dialog
    bind:this={dialog}
    class="modal modal-bottom sm:modal-middle"
    on:close={() => history.back()}
>
    <div class="modal-box bg-base-200 pb-10">
        <div class="flex justify-between items-center mb-[1rem]">
            <button
                class="tooltip tooltip-right btn btn-ghost"
                data-tip="Here you can edit your personal information, watch your profile information, businesses you manage or work at and more."
            >
                <!-- TODO: fix for mobile devices -->
                <Icon src={InformationCircle} size="24px" />
            </button>
            <h3 class="font-bold text-lg">Purcheses</h3>
            <button class="btn btn-ghost" on:click={() => dialog.close()}>
                <Icon src={XCircle} size="24px" />
            </button>
        </div>
        <div class="flex flex-col justify-start items-center gap-6">
            <!-- Payments Information -->
            <section class="join join-vertical w-[90%] rounded-lg bg-base-100">
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                >
                    <div class="flex items-center gap-2">
                        <Icon src={PaperClip} size="26px" />
                        Reacites
                    </div>
                    <div class="flex items-center text-gray-500">
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                >
                    <div class="flex items-center gap-2">
                        <Icon src={CreditCard} size="26px" />
                        Payments
                    </div>
                    <div class="flex items-center text-gray-500">
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                >
                    <div class="flex items-center gap-2">
                        <Icon src={ReceiptRefund} size="26px" />
                        Payment Requests
                    </div>
                    <div class="flex items-center text-gray-500">
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
            </section>

            <!-- Cards -->
            <section
                class="relative rounded-lg bg-base-100 p-6 flex items-center justify-center gap-10 w-[90%]"
            >
                <InfoCircle
                    message="hello this is a test message for the info circle"
                />
                <button id="male" class="flex flex-col items-center">
                    <Icon src={HandThumbUp} size="35px" />
                    <div>Credit Card</div>
                </button>
            </section>

            <!-- Actions -->
            <section class="join join-vertical w-[90%] rounded-lg bg-base-100">
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                >
                    <div class="flex items-center gap-2">
                        <Icon src={Key} size="26px" />
                        Password - Credit Cards
                    </div>
                    <div class="flex items-center text-gray-500">
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
            </section>
        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
