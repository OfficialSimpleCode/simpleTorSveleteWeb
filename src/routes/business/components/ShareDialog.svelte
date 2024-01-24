<script lang="ts">
    import { page } from "$app/stores";
    import { pushState } from "$app/navigation";

    import { _ } from "svelte-i18n";
    import { business } from "$lib/stores/Business.js";
    import {
        Icon,
        Link,
        XCircle,
        CheckCircle,
        Clipboard,
    } from "svelte-hero-icons";

    import NavigationDialog from "$lib/components/NavigationDialog.svelte";
    import Avatar from "$lib/components/Avatar.svelte";

    export let dialog: HTMLDialogElement;
    export let name: string;
    export let address: string;

    let navigationDialog: HTMLDialogElement;
    let copied: Boolean = false;

    function copy() {
        copied = true;
        // TODO: copy to clipboard
        setTimeout(() => (copied = false), 1500);
    }

    function openNavigationDialog() {
        pushState("", {
            showModal: true,
        });
        setTimeout(() => navigationDialog.showModal(), 100);
    }
</script>

{#if $page.state.showModal}
    <NavigationDialog bind:dialog={navigationDialog} />
{/if}

<dialog
    bind:this={dialog}
    class="modal modal-bottom sm:modal-middle"
    on:close={() => history.back()}
>
    <div class="modal-box bg-base-200">
        <div class="flex justify-between items-center mb-[4rem]">
            <button
                class="btn btn-ghost"
                class:text-success={copied}
                on:click={copy}
            >
                <Icon src={copied ? CheckCircle : Link} size="24px" />
            </button>
            <h3 class="font-bold text-lg">{$_("Share")}</h3>
            <button class="btn btn-ghost" on:click={() => dialog.close()}>
                <Icon src={XCircle} size="24px" />
            </button>
        </div>

        <!-- QR card -->
        <div class="h-[60%] w-[80%] bg-base-100 rounded-lg mx-auto">
            <div
                class="relative rtl:right-[calc(50%-3rem)] ltr:left-[calc(50%-3rem)] top-[-2.5rem] w-min"
            >
                <Avatar
                    small={true}
                    ring={false}
                    img={$business.design.shopIconUrl}
                />
                <h3 class="w-full text-center text-lg font-semibold">{name}</h3>
                <button
                    class="block w-full text-center link link-neutral text-gray-500"
                    on:click={openNavigationDialog}
                >
                    {address}
                </button>
            </div>
            <img
                class="w-[80%] mx-auto pb-12"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fqr_code%2Fqr_code_PNG4.png&f=1&nofb=1&ipt=2976bf9cd3f598cf1f8ef49eabca13fcc580abd4bcdd11fc1436bb8c9a2c0db9&ipo=images"
                alt="qr"
            />
        </div>

        <p class="text-gray-500 mt-4 text-sm text-center">
            {$_("featureExplianShareBusiness")}
        </p>

        <button
            class="btn btn-primary flex items-center gap-2 mx-auto mt-8"
            on:click={copy}
        >
            {#if copied}
                {$_("Copied")}
            {:else}
                {$_("CopyLink")}
            {/if}
            <Icon src={copied ? CheckCircle : Clipboard} size="28px" />
        </button>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
