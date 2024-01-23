<script lang="ts">
    import { _ } from "svelte-i18n";
    import UpdatePageHeader from "$lib/components/UpdatePageHeader.svelte";

    const MIN_PASSWORD_LENGTH: number = 7;

    let password1: string = "";
    let password2: string = "";
    let error: string = "";

    function validatePassword(): boolean {
        if (password1.length < 7) {
            error = $_("thePasswordNeedToHave").replace(
                "COUNT",
                MIN_PASSWORD_LENGTH.toString(),
            );
            return false;
        } else if (password1 != password2) {
            error = $_("passwordsDontMatch");
            return false;
        }

        return true;
    }

    function updatePassword() {
        error = "";
        if (!validatePassword()) {
            return;
        }

        // Do the update
    }
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
    <UpdatePageHeader
        title={$_("creditCardPassowrd")}
        helpMessage={$_("creditCardPasswordExplain")}
    />

    <div class="flex items-center justify-center w-full h-[60%]">
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body">
                <div class="form-control">
                    <label class="label" for="password1">
                        <span class="label-text"
                            >{$_("enterTheCardPassword")}</span
                        >
                    </label>
                    <input
                        bind:value={password1}
                        type="password"
                        placeholder="*******"
                        class="input input-bordered"
                        required
                    />
                </div>
                <div class="form-control">
                    <label class="label" for="password2">
                        <span class="label-text">{$_("repeatPassword")}</span>
                    </label>
                    <input
                        bind:value={password2}
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
                    {#if error.length > 0}
                        <label class="label" for="btn">
                            <span class="label-text text-error">
                                {error}
                            </span>
                        </label>
                    {/if}
                </div>
            </form>
        </div>
    </div>
</main>
