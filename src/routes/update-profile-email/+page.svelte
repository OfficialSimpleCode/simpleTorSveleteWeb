<script lang="ts">
    import BackButton from "$lib/components/BackButton.svelte";
    import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";

    let email: string = "";

    function updateEmail() {}
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
    <div class="flex items-center justify-between w-full pt-4">
        <InfoTooltipButton message="Placeholder TODO" />
        <div>
            <h1 class="text-xl text-center">Update Profile Email</h1>
        </div>
        <BackButton />
    </div>

    <div class="flex items-center justify-center w-full h-[60%]">
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body">
                <div class="form-control">
                    <label class="label" for="name">
                        <span class="label-text">New Email</span>
                    </label>
                    <input
                        bind:value={email}
                        name="email"
                        type="email"
                        placeholder="profile email"
                        class="input input-bordered"
                        required
                    />
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" on:click={updateEmail}>
                        Update Email
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>
