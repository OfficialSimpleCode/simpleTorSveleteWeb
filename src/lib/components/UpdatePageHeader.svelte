<script lang="ts">
    import BackButton from "./BackButton.svelte";
    import InfoTooltipButton from "./InfoTooltipButton.svelte";

    export let title: string;
    export let helpMessage: string;
    export let onBack: CallableFunction = () => {};
</script>

<div
    class="flex items-center justify-between w-full pt-4"
    style="direction: ltr;"
>
    <InfoTooltipButton message={helpMessage} />
    <div>
        <h1 class="text-xl text-center">{title}</h1>
    </div>
    <BackButton {onBack} />
</div>
