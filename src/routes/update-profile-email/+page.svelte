<script lang="ts">
    import { _ } from "svelte-i18n";
    import { user } from "$lib/stores/User";

    import UpdatePageHeader from "$lib/components/UpdatePageHeader.svelte";

    let email: string = $user.userPublicData.email;
    console.log($user);

    function updateEmail() {}
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
    <UpdatePageHeader
        title={$_("emailUpdate")}
        helpMessage={$_("emailUpdateExplain")}
    />

    <div class="flex items-center justify-center w-full h-[60%]">
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body">
                <div class="form-control">
                    <label class="label" for="name">
                        <span class="label-text">{$_("email")}</span>
                    </label>
                    <input
                        bind:value={email}
                        type="email"
                        class="input input-bordered"
                        required
                    />
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" on:click={updateEmail}>
                        {$_("emailUpdate")}
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>
