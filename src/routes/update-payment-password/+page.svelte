<script lang="ts">
    import BackButton from "$lib/components/BackButton.svelte";
    import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";

    let password1: string = "";
    let password2: string = "";

    function updatePassword() {}
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
    <div class="flex items-center justify-between w-full pt-4">
        <InfoTooltipButton message="Placeholder TODO" />
        <div>
            <h1 class="text-2xl text-center">Update Payment Password</h1>
        </div>
        <BackButton />
    </div>

    <div class="flex items-center justify-center w-full h-[60%]">
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body">
                <div class="form-control">
                    <label class="label" for="password1">
                        <span class="label-text">New Password</span>
                    </label>
                    <input
                        bind:value={password1}
                        name="password1"
                        type="password"
                        placeholder="*******"
                        class="input input-bordered"
                        required
                    />
                </div>
                <div class="form-control">
                    <label class="label" for="password2">
                        <span class="label-text">Password Again</span>
                    </label>
                    <input
                        bind:value={password2}
                        name="password2"
                        type="password"
                        placeholder="*******"
                        class="input input-bordered"
                        required
                    />
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" on:click={updatePassword}>
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>
