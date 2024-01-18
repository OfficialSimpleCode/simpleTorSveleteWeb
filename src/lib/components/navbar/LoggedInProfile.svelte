<script lang="ts">
    import { pushState } from "$app/navigation";
    import { page } from "$app/stores";
    import ProfileDialog from "./ProfileDialog.svelte";
    import PurchesesDialog from "./PurchesesDialog.svelte";

    export let profile: Record<string, string>;

    let profileDialog: HTMLDialogElement;

    function openProfileDialog() {
        pushState("", {
            showModal: true,
        });
        setTimeout(() => profileDialog.showModal(), 100);
    }

    function openPurchesesDialog() {
        pushState("", {
            showModal: true,
        });
        setTimeout(() => profileDialog.showModal(), 100);
    }
</script>

<!-- Dialog -->
{#if $page.state.showModal}
    <ProfileDialog bind:dialog={profileDialog} bind:profile />
{/if}
{#if $page.state.showModal}
    <PurchesesDialog bind:dialog={profileDialog} />
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
            <button on:click={openProfileDialog}> Profile </button>
        </li>
        <li>
            <button on:click={openPurchesesDialog}>
                Purchases
            </button>
        </li>
        <li><a href="appointments">My Appointments</a></li>
    </ul>
</div>
