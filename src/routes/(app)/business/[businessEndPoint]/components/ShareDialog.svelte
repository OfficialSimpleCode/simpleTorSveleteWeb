<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/stores";

  import { businessStore } from "$lib/stores/Business.js";
  import {
    CheckCircle,
    Clipboard,
    Icon,
    Link,
    XCircle,
  } from "svelte-hero-icons";

  import Avatar from "$lib/components/Avatar.svelte";
  import DialogStrucher from "$lib/components/dialogs/DialogStrucher.svelte";
  import NavigationDialog from "$lib/components/dialogs/NavigationDialog.svelte";
  import { _, translate } from "$lib/utils/translate";
  import clipboard from "clipboardy";
  import { QRCodeImage } from "svelte-qrcode-image";

  export let dialog: HTMLDialogElement;
  export let name: string;
  export let address: string;

  let navigationDialog: HTMLDialogElement;
  let copied: Boolean = false;
  let businessLink = $businessStore?.dynamicLink ?? "";
  if (businessLink === "") {
    businessLink = `${$page.url.origin}/business/${$businessStore?.url}`;
  }
  function copyToClipboard() {
    console.log("businessLink --> ", businessLink);

    clipboard.write(businessLink);
    copied = true;
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

<DialogStrucher bind:dialog onlyMiddle={true}>
  <div class="modal-box bg-base-200 max-h-[570px] sm:max-h-full">
    <div class="flex justify-between items-center mb-[4rem]">
      <button class="hover:opacity-70" on:click={() => dialog.close()}>
        <Icon src={XCircle} size="24px" />
      </button>
      <h3 class="font-bold text-lg">{translate("Share")}</h3>
      <button
        class="hover:opacity-70"
        class:text-success={copied}
        on:click={copyToClipboard}
      >
        <Icon src={copied ? CheckCircle : Link} size="24px" />
      </button>
    </div>

    <!-- QR card -->
    <div class="h-[60%] w-[100%] xs:w-[80%] bg-base-100 rounded-lg mx-auto">
      <div class="relative top-[-2.5rem]">
        <div
          class="flex flex-col items-center rtl:right-[calc(50%-3rem)] ltr:left-[calc(50%-3rem)]"
        >
          <Avatar
            small={true}
            ring={false}
            img={$businessStore?.design.shopIconUrl ?? ""}
          />
          <h3 class="w-full text-center text-lg font-semibold">{name}</h3>
          <button
            class="block w-full text-center link link-neutral text-gray-500"
            on:click={openNavigationDialog}
          >
            {address}
          </button>
        </div>
        <!-- <QrCode value="https://github.com/" /> -->
        <div class="flex justify-center pb-6 mt-10">
          <div class=" p-[6px] bg-white rounded-[1rem]">
            <QRCodeImage
              text={businessLink}
              displayType="canvas"
              displayStyle="border-style: dotted;"
              width={220}
            />
          </div>
        </div>
      </div>
    </div>

    <p class="text-gray-500 mt-4 text-sm text-center">
      {translate("theBusinessWillOpenDierctlyInApp")}
    </p>

    <button
      class="btn btn-primary flex items-center gap-2 mx-auto mt-8"
      on:click={copyToClipboard}
    >
      {#if copied}
        {translate("Copied", $_)}
      {:else}
        {translate("CopyLink", $_)}
      {/if}
      <Icon src={copied ? CheckCircle : Clipboard} size="28px" />
    </button>
  </div>
</DialogStrucher>
