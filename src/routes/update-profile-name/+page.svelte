<script lang="ts">
    import { userStore } from "$lib/stores/User";
    import { _ } from "svelte-i18n";

    import UpdatePageHeader from "$lib/components/UpdatePageHeader.svelte";

    let name: string = $userStore.name;

    function updateName() {}
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
    <UpdatePageHeader title={$_("name")} helpMessage="" />

    <div class="flex items-center justify-center w-full h-[60%]">
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body">
                <div class="form-control">
                    <label class="label" for="name">
                        <span class="label-text">{$_("name")}</span>
                    </label>
                    <input
                        bind:value={name}
                        type="name"
                        class="input input-bordered"
                        required
                    />
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" on:click={updateName}>
                        {$_("save")}
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>
