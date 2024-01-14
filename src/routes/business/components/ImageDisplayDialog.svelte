<script lang="ts">
    import { ShowToast } from "$lib/stores/ToastManager";
    import { Icon, ChevronLeft, ChevronRight, Heart } from "svelte-hero-icons";

    export let dialog: HTMLDialogElement;
    export let displayImages: Array<Record<string, any>>;
    export let index: number;

    function giveHeart() {
        ShowToast({ text: "Heart Added", status: "success" });
    }
</script>

<dialog
    bind:this={dialog}
    class="modal modal-bottom sm:modal-middle"
    on:close={() => history.back()}
>
    <div
        class="modal-box bg-base-200 p-0 h-[700px] sm:w-[520px] overflow-hidden"
    >
        <img
            class="object-cover h-full w-full rounded-xl"
            src={displayImages[index].link}
            alt="showcase"
        />
        {#if index > 0}
            <button
                id="left"
                class="absolute top-[50%] left-3 text-white"
                on:click={() => (index -= 1)}
            >
                <div class="h-4"></div>
                <Icon src={ChevronLeft} size="36px" />
                <div class="h-4"></div>
            </button>
        {/if}
        {#if index < displayImages.length - 1}
            <button
                id="right"
                class="absolute top-[50%] right-3 text-white"
                on:click={() => (index += 1)}
            >
                <div class="h-4"></div>
                <Icon src={ChevronRight} size="36px" />
                <div class="h-4"></div>
            </button>
        {/if}
        <button
            class="absolute bottom-4 right-4 h-8 w-16 rounded-3xl bg-base-200 flex justify-center items-center"
            on:click={giveHeart}
        >
            {displayImages[index].numberOfHearts}
            <Icon src={Heart} size="26px" />
        </button>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
