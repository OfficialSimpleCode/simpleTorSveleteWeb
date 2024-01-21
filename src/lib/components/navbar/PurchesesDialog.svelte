<script lang="ts">
    import { _ } from "svelte-i18n";
    import {
        Icon,
        XCircle,
        ChevronRight,
        PaperClip,
        CreditCard,
        ReceiptRefund,
        Key,
    } from "svelte-hero-icons";
    import InfoCircle from "$lib/components/InfoCircle.svelte";
    import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";
    import { goto } from "$app/navigation";

    export let dialog: HTMLDialogElement;
</script>

<dialog
    bind:this={dialog}
    class="modal modal-bottom sm:modal-middle"
    on:close={() => history.back()}
>
    <div class="modal-box bg-base-200 pb-10">
        <div class="flex justify-between items-center mb-[1rem]">
            <InfoTooltipButton message="Placeholder TODO" />
            <h3 class="font-bold text-lg">{$_("purchases")}</h3>
            <button class="btn btn-ghost" on:click={() => dialog.close()}>
                <Icon src={XCircle} size="24px" />
            </button>
        </div>
        <div class="flex flex-col justify-start items-center gap-6">
            <!-- Payments Information -->
            <section class="join join-vertical w-[90%] rounded-lg bg-base-100">
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                    on:click={() => goto("invoices")}
                >
                    <div class="flex items-center gap-2">
                        <Icon src={PaperClip} size="26px" />
                        {$_("invoices")}
                    </div>
                    <div class="flex items-center text-gray-500">
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                    on:click={() => goto("payments")}
                >
                    <div class="flex items-center gap-2">
                        <Icon src={CreditCard} size="26px" />
                        {$_("payments")}
                    </div>
                    <div class="flex items-center text-gray-500">
                        <Icon src={ChevronRight} size="18px" />
                    </div>
                </button>
                <div class="divider h-[1px]" />
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                    on:click={() => goto("payment-requests")}
                >
                    <div class="flex items-center gap-2">
                        <Icon src={ReceiptRefund} size="26px" />
                        {$_("paymentRequests")}
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
                    message="After making a purchase you will be able to save the payment details"
                />
                <button class="flex flex-col items-center">
                    <Icon src={CreditCard} size="120px" />
                </button>
            </section>

            <!-- Actions -->
            <section class="join join-vertical w-[90%] rounded-lg bg-base-100">
                <button
                    class="btn btn-ghost join-item flex justify-between items-center"
                    on:click={() => goto("update-payment-password")}
                >
                    <div class="flex items-center gap-2">
                        <Icon src={Key} size="26px" />
                        {$_("creditCardPassowrd")}
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
