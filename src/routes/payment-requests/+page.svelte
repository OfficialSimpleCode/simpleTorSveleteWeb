<script lang="ts">
    import { Icon, ArchiveBox } from "svelte-hero-icons";
    import BackButton from "$lib/components/BackButton.svelte";
    import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10">
    <div class="flex items-center justify-between w-full pt-4">
        <InfoTooltipButton message="Placeholder TODO" />
        <div>
            <h1 class="text-2xl">Payment Requests</h1>
        </div>
        <BackButton />
    </div>

    <section class="flex flex-col items-center gap-8">
        <div class="text-center">
            <h2 class="text-4xl">No available payment requests.</h2>
            <p class="text-xl opacity-50">
                Here you will see all of the payment requests you have paied or
                that was registred to you.
            </p>
        </div>
        <div>
            <Icon src={ArchiveBox} size="100px" />
        </div>
    </section>
</main>
