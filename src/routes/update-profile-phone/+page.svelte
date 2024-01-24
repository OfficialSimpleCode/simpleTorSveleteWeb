<script lang="ts">
    import { base } from "$app/paths";
    import { userStore } from "$lib/stores/User";
    import { _ } from "svelte-i18n";

    import { goto } from "$app/navigation";
    import UpdatePageHeader from "$lib/components/UpdatePageHeader.svelte";

    let phoneNumber: string = $userStore.phoneNumber;

    function updatePhoneNumber() {
        goto(`${base}/verify-phone-number`);
    }

    function capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
    <UpdatePageHeader
        title={capitalizeFirstLetter($_("phoneUpdate"))}
        helpMessage={$_("phoneUpdateExplain")}
    />

    <div class="flex items-center justify-center w-full h-[60%]">
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body">
                <div class="form-control">
                    <label class="label" for="phone-number">
                        <span class="label-text"
                            >{capitalizeFirstLetter($_("businessPhone"))}</span
                        >
                    </label>
                    <input
                        bind:value={phoneNumber}
                        type="text"
                        class="input input-bordered"
                        required
                    />
                </div>
                <div class="form-control mt-6">
                    <button
                        class="btn btn-primary"
                        on:click={updatePhoneNumber}
                    >
                        {$_("pressToVerify")}
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>
