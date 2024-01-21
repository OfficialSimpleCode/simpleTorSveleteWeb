<script lang="ts">
    import Animation from "./Animation.svelte";

    export let dialog: HTMLDialogElement;
    export let title: string;
    export let animation: string = "https://lottie.host/4e25a10f-2ecd-4721-a293-c8350f0a1b8c/IkKz9cEb2c.json";
    export let onSave: CallableFunction;
    export let onCancel: CallableFunction = () => {};
</script>

<dialog
    bind:this={dialog}
    class="modal modal-bottom sm:modal-middle"
    on:close={() => {
        history.back();
    }}
>
    <div class="modal-box bg-base-200 max-w-sm">
        <h1 class="text-lg text-center mb-4">{title}</h1>
        <div class="flex items-center justify-center">
            <Animation animationFile={animation} />
        </div>
        <div class="modal-action w-full flex mx-2 gap-2">
            <button
                class="btn btn-outline flex-[1]"
                on:click={() => {
                    onCancel();
                    dialog.close();
                }}
            >
                Cancel
            </button>
            <button
                class="btn btn-primary flex-[1]"
                on:click={() => {
                    onSave();
                    dialog.close();
                }}
            >
                Save
            </button>
        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
