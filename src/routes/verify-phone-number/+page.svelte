<script lang="ts">
    import { onMount } from "svelte";
    import { base } from "$app/paths";

    import { _ } from "svelte-i18n";
    import UpdatePageHeader from "$lib/components/UpdatePageHeader.svelte";
    import { goto } from "$app/navigation";

    let codeSent: boolean = false;
    let oneTimeCode: string = "";

    onMount(() => {
        // Send code
        setTimeout(() => (codeSent = true), 2000);
    });

    function verifyCode() {}

    function updatePhoneNumber() {
        goto(`${base}/update-profile-phone`, { replaceState: true });
    }
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
    <UpdatePageHeader
        title={$_("verifyPhoneMechanizem")}
        helpMessage={$_("phoneVerificationPageExplain")}
    />

    <div class="flex items-center justify-center w-full h-[60%]">
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body">
                <div class="form-control">
                    <label class="label" for="one-time-code">
                        <span class="label-text">{$_("pressOpt")}</span>
                        <span class="label-text-alt">
                            {#if codeSent}
                                <div class="badge badge-success">
                                    {$_("sendSuccess")}
                                </div>
                            {:else}
                                <div class="badge badge-warning">
                                    <div
                                        class="loading loading-spinner loading-xs"
                                    ></div>
                                </div>
                            {/if}
                        </span>
                    </label>
                    <input
                        bind:value={oneTimeCode}
                        type="text"
                        class="input input-bordered"
                        required
                    />
                </div>
                <div class="form-control mt-6 gap-1">
                    <button class="btn btn-primary" on:click={verifyCode}>
                        {$_("verifyPhone")}
                    </button>
                    <button
                        class="btn btn-outline"
                        on:click|preventDefault={updatePhoneNumber}
                    >
                        {$_("phoneUpdate")}
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>
