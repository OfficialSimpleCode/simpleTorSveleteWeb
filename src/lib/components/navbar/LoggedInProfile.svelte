<script lang="ts">
    import { base } from "$app/paths";
    import { goto, pushState } from "$app/navigation";
    import { page } from "$app/stores";

    import { _ } from "svelte-i18n";
    
    import ProfileDialog from "./ProfileDialog.svelte";
    import PurchesesDialog from "./PurchesesDialog.svelte";

    export let profile: Record<string, string>;

    let profileDialog: HTMLDialogElement;
    let purchasesDialog: HTMLDialogElement;

    function openProfileDialog() {
        pushState("", {
            showModal: true,
        });
        setTimeout(() => profileDialog.showModal(), 200);
    }

    function openPurchesesDialog() {
        pushState("", {
            showModal: true,
        });
        setTimeout(() => purchasesDialog.showModal(), 200);
    }
</script>

<!-- Dialog -->
{#if $page.state.showModal}
    <ProfileDialog bind:dialog={profileDialog} bind:profile />
    <PurchesesDialog bind:dialog={purchasesDialog} />
{/if}

<div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
            <img
                alt="profile"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
        </div>
    </div>
    <ul
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    >
        <li>
            <div
                role="button"
                tabindex="0"
                on:click={openProfileDialog}
                on:keypress={openProfileDialog}
            >
                {$_("profile")}
            </div>
        </li>
        <li>
            <div
                role="button"
                tabindex="0"
                on:click={openPurchesesDialog}
                on:keypress={openPurchesesDialog}
            >
                {$_("purchases")}
            </div>
        </li>
        <li>
            <div
                role="button"
                tabindex="0"
                on:click={() => goto(`${base}/appointments`)}
                on:keypress={() => goto(`${base}/appointments`)}
            >
                {$_("myBookings")}
            </div>
        </li>
    </ul>
</div>
