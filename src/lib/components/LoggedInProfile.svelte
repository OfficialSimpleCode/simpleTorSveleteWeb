<script lang="ts">
    import { pushState } from "$app/navigation";
    import { page } from "$app/stores";
    import ProfileDialog from "./ProfileDialog.svelte";

    export let profile: Record<string, string>;

    let dialog: HTMLDialogElement;

    function openProfileDialog() {
        pushState("", {
            showModal: true,
        });
        setTimeout(() => dialog.showModal(), 100);
    }
</script>

<!-- Dialog -->
{#if $page.state.showModal}
    <ProfileDialog bind:dialog bind:profile />
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
            <a href="purchases" class="justify-between">
                Purchases
                <span class="badge">New</span>
            </a>
        </li>
        <li><a href="orders">My Orders</a></li>
    </ul>
</div>
