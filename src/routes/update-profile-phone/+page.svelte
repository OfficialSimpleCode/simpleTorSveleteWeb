<script lang="ts">
    import BackButton from "$lib/components/BackButton.svelte";
    import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";

    let phoneNumber: string = "";

    function updatePhoneNumber() {}
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
    <div class="flex items-center justify-between w-full pt-4">
        <InfoTooltipButton message="Placeholder TODO" />
        <div>
            <h1 class="text-xl text-center">Update Phone Number</h1>
        </div>
        <BackButton />
    </div>

    <div class="flex items-center justify-center w-full h-[60%]">
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body">
                <div class="form-control">
                    <label class="label" for="phone-number">
                        <span class="label-text">New Phone Number</span>
                    </label>
                    <input
                        bind:value={phoneNumber}
                        name="phone-number"
                        type="text"
                        placeholder="phone number"
                        class="input input-bordered"
                        required
                    />
                </div>
                <div class="form-control mt-6">
                    <button
                        class="btn btn-primary"
                        on:click={updatePhoneNumber}
                    >
                        Update Phone Number
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>
