<script lang="ts">
  import { page } from "$app/stores";

  import { businessStore } from "$lib/stores/Business";
  import { ShowToast } from "$lib/stores/ToastManager";

  import NavigationDialog from "$lib/components/dialogs/NavigationDialog.svelte";

  // Assets
  import { base } from "$app/paths";

  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  export let shrinkedDisplay: boolean = false;
  export let termDialog: HTMLDialogElement;
  let navigationDialog: HTMLDialogElement;

  type SocialLink = {
    name: string;
    func?: () => void;
    href?: string;
    icon: string;
    errorMsg: string;
  };

  const noNeedGenderTrnaslate: string[] = ["whatsapp"];

  function openNavigationDialog() {
    if (!$businessStore.adress) {
      ShowToast({
        text: translate("noAdress", $_),
        status: "fail",
      });
      return;
    }
    pushDialog(
      navigationDialog,
      `${base}/business/${$businessStore.businessId}/navigate`
    );
  }
  function openTermDialog() {
    if (!$businessStore.design.term) {
      ShowToast({
        text: translate("noTerms", $_),
        status: "fail",
      });
      return;
    }
    pushDialog(termDialog, `${base}/business/${$businessStore.url}/term`);
  }

  //define the icon link and hrefs
  let socialLinks: SocialLink[] = [
    {
      name: "navigate",
      func: openNavigationDialog,
      icon: "mdi:map-marker-outline",
      errorMsg: "noAdress",
    },
    {
      name: "instagram",
      href:
        $businessStore.instagramAccount !== ""
          ? `https://www.instagram.com/${$businessStore.instagramAccount}`
          : undefined,
      func:
        $businessStore.instagramAccount === ""
          ? () => error("noInstagram")
          : undefined,
      icon: "mdi:instagram",
      errorMsg: "noInstagram",
    },
    {
      name: "call",
      href:
        $businessStore.shopPhone !== ""
          ? `tel:${$businessStore.shopPhone}`
          : undefined,
      icon: "mdi:phone",
      func:
        $businessStore.shopPhone === ""
          ? () => error("noShopPhoneNumber")
          : undefined,
      errorMsg: "noShopPhoneNumber",
    },
    {
      name: "term",
      func: openTermDialog,
      icon: "mdi:file-document",
      errorMsg: "noTerms",
    },
    {
      name: "whatsapp",
      href:
        $businessStore.shopPhone !== ""
          ? `whatsapp://send?phone=${$businessStore.shopPhone}`
          : undefined,
      icon: "mdi:whatsapp",
      func:
        $businessStore.shopPhone === ""
          ? () => error("noShopPhoneNumber")
          : undefined,
      errorMsg: "noShopPhoneNumber",
    },
  ];

  function error(errorMsg: string) {
    ShowToast({
      text: translate(errorMsg, $_),
      status: "fail",
    });
    return;
  }
</script>

{#if $page.state.showModal}
  <NavigationDialog bind:dialog={navigationDialog} />
{/if}

<section class="flex justify-center relative md:top-2.5 top-[-32px]">
  <!-- Social Links -->
  <div
    class="flex items-center gap-6 sm:gap-8 {shrinkedDisplay
      ? ''
      : 'md:hidden bg-base-200'}  py-2 px-5 rounded-xl mx-6 sm:mx-16"
  >
    {#each socialLinks as socialLink}
      <div
        class="flex flex-col items-center justify-center w-[40px] xs:w-[55px] gap-[2px] py-1"
      >
        <!-- show a tag if the icon is with href -->

        <CustomCircleIcon
          icon={socialLink.icon}
          href={socialLink.href}
          size="md"
          handleClick={socialLink.func}
          translateKey={socialLink.name}
        />
      </div>
    {/each}
  </div>
</section>
