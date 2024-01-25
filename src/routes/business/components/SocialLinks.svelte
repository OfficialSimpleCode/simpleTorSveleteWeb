<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/stores";

  import { businessStore } from "$lib/stores/Business";
  import { ShowToast } from "$lib/stores/ToastManager";
  import type { IconSource } from "svelte-hero-icons";
  import { DocumentText, Icon, MapPin, Phone } from "svelte-hero-icons";
  import { _ } from "svelte-i18n";

  import NavigationDialog from "$lib/components/NavigationDialog.svelte";

  // Assets
  import InsagramLogo from "$lib/images/instagram.svg";
  import WhatsappLogo from "$lib/images/whatsapp.svg";

  let navigationDialog: HTMLDialogElement;

  function openNavigationDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => navigationDialog.showModal(), 100);
  }

  let socialLinks: Object = {
    call: `tel:${$businessStore.shopPhone}`,
    instagram: $businessStore.instagramAccount,
    whatsapp: `whatsapp://send?phone=${$businessStore.shopPhone}`,
    navigate: openNavigationDialog,
    term: $businessStore.previewDoc,
  };

  let socialIcons: { [key: string]: string } = {
    whatsapp: WhatsappLogo,
    instagram: InsagramLogo,
  };
  let socialHeroIcons: { [key: string]: IconSource } = {
    call: Phone,
    navigate: MapPin,
    term: DocumentText,
  };

  function activateLink(link: string | CallableFunction, name: string) {
    if (typeof link === "function") {
      link();
      return;
    }

    if (!link || link.length == 0) {
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

<!-- Social Links -->
<ul class="flex items-center gap-6 sm:gap-8">
  {#each Object.entries(socialLinks) as [name, link]}
    <div class="flex flex-col items-center">
      <button
        on:click={() => activateLink(link, name)}
        class="btn btn-ghost btn-square w-6 h-6 sm:w-10 sm:h-10"
      >
        {#if socialIcons[name]}
          <img src={socialIcons[name]} alt={name} />
        {:else}
          <Icon src={socialHeroIcons[name]} size="100%" />
        {/if}
      </button>
      <h5 class="text-sm text-gray-500 select-none">{$_(name)}</h5>
    </div>
  {/each}
</ul>
