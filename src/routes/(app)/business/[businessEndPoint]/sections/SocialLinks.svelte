<script lang="ts">
  import { page } from "$app/stores";

  import { businessStore } from "$lib/stores/Business";
  import { ShowToast } from "$lib/stores/ToastManager";
  import type { IconSource } from "svelte-hero-icons";

  import NavigationDialog from "$lib/components/dialogs/NavigationDialog.svelte";

  // Assets
  import { base } from "$app/paths";
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";

  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  export let termDialog: HTMLDialogElement;
  let navigationDialog: HTMLDialogElement;

  const noNeedGenderTrnaslate: string[] = ["whatsapp"];

  function openNavigationDialog() {
    if (!$businessStore.adress) {
      ShowToast({
        text: translate("noAdress"),
        status: "fail",
      });
      return;
    }
    pushDialog(
      navigationDialog,
      `${base}/business/${
        $businessStore != null ? $businessStore.urlEndPoint : ""
      }/navigate`
    );
  }
  function openTermDialog() {
    pushDialog(
      termDialog,
      `${base}/business/${
        $businessStore != null ? $businessStore.urlEndPoint : ""
      }/term`
    );
  }

  let socialLinks: Object = {
    call: `tel:${$businessStore.shopPhone}`,
    instagram: $businessStore.instagramAccount,
    whatsapp: `whatsapp://send?phone=${$businessStore.shopPhone}`,
    navigate: openNavigationDialog,
    term: openTermDialog,
  };

  let socialIcons: { [key: string]: IconSource } = {
    call: "mdi:phone",
    navigate: "mdi:map-marker-outline",
    term: "mdi:file-document",
    whatsapp: "mdi:whatsapp",
    instagram: "mdi:instagram",
  };

  function activateLink(link: string | CallableFunction, name: string) {
    if (typeof link === "function") {
      link();
      return;
    }

    if (!link || link.length === 0) {
      ShowToast({
        text: `${name} link was not configured`,
        status: "fail",
      });
      return;
    }

    window.open(link, "_blank");
  }
</script>

{#if $page.state.showModal}
  <NavigationDialog bind:dialog={navigationDialog} />
{/if}

<section class="flex justify-center relative xs:top-[-1rem] top-[-32px]">
  <!-- Social Links -->
  <ul
    class="flex items-center gap-6 sm:gap-8 bg-base-200 py-2 px-5 rounded-xl mx-6 sm:mx-16"
  >
    {#each Object.entries(socialLinks) as [name, link]}
      <div class="flex flex-col items-center">
        <button
          on:click={() => activateLink(link, name)}
          class="btn btn-ghost btn-square w-6 h-6 sm:w-10 sm:h-10"
        >
          <GeneralIcon icon={socialIcons[name]} size={26} />
        </button>
        <h5 class="xs:text-sm text-xs text-gray-500 select-none">
          {translate(name, $_, !noNeedGenderTrnaslate.includes(name))}
        </h5>
      </div>
    {/each}
  </ul>
</section>
