<script lang="ts">
    import BackButton from "$lib/components/BackButton.svelte";
    import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";
    import { onMount } from "svelte";

    let codeSent: boolean = false;
    let oneTimeCode: string = "";

    onMount(() => {
        // Send code
        setTimeout(() => (codeSent = true), 2000);
    });

    function verifyCode() {}
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
    <div class="flex items-center justify-between w-full pt-4">
        <InfoTooltipButton message="Placeholder TODO" />
        <div>
            <h1 class="text-xl text-center">Verify Phone Number</h1>
        </div>
        <BackButton />
    </div>

    <div class="flex items-center justify-center w-full h-[60%]">
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body">
                <div class="form-control">
                    <label class="label" for="one-time-code">
                        <span class="label-text">One Time Code</span>
                        <span class="label-text-alt">
                            {#if codeSent}
                                <div class="badge badge-success">Sent</div>
                                {:else}
                                <div class="badge badge-warning">Sending</div>
                            {/if}
                        </span>
                    </label>
                    <input
                        bind:value={oneTimeCode}
                        name="one-time-code"
                        type="text"
                        placeholder="verfication code"
                        class="input input-bordered"
                        required
                    />
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" on:click={verifyCode}>
                        Verify Phone Number
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>
