<script lang="ts">
  // Models
  // Components
  import TermDialog from "$lib/components/dialogs/TermDialog.svelte";
  // other (utils / stores)

  import { pushState } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import UpdatePopUpDialog from "$lib/components/dialogs/UpdatePopUpDialog.svelte";
  import UserHelper from "$lib/helpers/user/user_helper";
  import UserInitializer from "$lib/initializers/user_initializer";
  import type { Update } from "$lib/models/business/update_model";
  import { businessStore } from "$lib/stores/Business";
  import { isConnectedStore, userStore } from "$lib/stores/User";
  import Footer from "../../../../lib/components/Footer.svelte";
  import { popUpUpdate } from "./helpers/pop_up_update";
  import ChangingImages from "./sections/ChangingImages.svelte";
  import IconAndTopButtons from "./sections/IconAndTopButtons.svelte";
  import ProductsSection from "./sections/ProductsSection.svelte";
  import SocialLinks from "./sections/SocialLinks.svelte";
  import StoryImages from "./sections/StoryImages.svelte";
  import Updates from "./sections/Updates.svelte";
  let termDialog: HTMLDialogElement;
  let popUpUpdateDialog: HTMLDialogElement;
  let updateToPop: Update | undefined;
  //wake up when the user is connected
  isConnectedStore.subscribe((value) => {
    if (value !== true) {
      return;
    }
    if ($userStore == null) {
      return;
    }
    if (
      $businessStore != null &&
      $isConnectedStore &&
      UserInitializer.GI().user.firstEnterance($businessStore.businessId) &&
      $businessStore.design.term != "" &&
      $businessStore.design.popTermOnFirstEneter
    ) {
      //initial the var for no pop the sheet again
      UserInitializer.GI().isUserFirstEntrance = false;
      pushState(
        `${base}/business/${
          $businessStore != null ? $businessStore.url : ""
        }/term`,
        {
          showModal: true,
        }
      );
      setTimeout(() => termDialog.showModal(), 100);
    }

    updateToPop = popUpUpdate();
    if (updateToPop != null) {
      const newSeenUpdates = new Set(
        $userStore.seenUpdates[$businessStore?.businessId ?? ""] ?? new Set()
      );
      newSeenUpdates.add(updateToPop.id);
      UserHelper.GI().updateSeenUpdates(
        $businessStore?.businessId ?? "",
        newSeenUpdates
      );

      pushState(``, {
        showModal: true,
      });
      setTimeout(() => popUpUpdateDialog.showModal(), 100);
    }
  });

  // scheme.org json
  let jsonLdScript = `<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "LocalBusiness",
    "name": ${$businessStore?.shopName},
    "image": ${$businessStore?.design.shopIconUrl},
    "telephone": ${$businessStore?.shopPhone},
    "address": {
      "@type": "PostalAddress",
      "streetAddress": ${$businessStore?.adress}
    },
    "url": ${$page.url.origin}/business/${$businessStore?.url}
  }${"<"}/script>`;
</script>

<svelte:head>
  <!-- the scheme.org of the business -->
  {@html jsonLdScript}
</svelte:head>
<TermDialog bind:dialog={termDialog} />
<UpdatePopUpDialog update={updateToPop} bind:dialog={popUpUpdateDialog} />
<svelte:window />

<main class="w-full h-full">
  <!-- background image -->
  <ChangingImages />
  <!-- define the whole page below the top images -->
  <div class="bg-base-100 min-h-1/2 w-full z-10">
    <!-- this is effects the entire layout (top margin is -3 to be above the images)-->

    <div class="">
      <!-- the business icon, name, address, order & share buttons -->
      <IconAndTopButtons onImages={false} />
    </div>

    <!-- business icons links -->
    <SocialLinks {termDialog} />

    <!-- business updates -->
    <Updates />

    <!-- Display images -->
    <StoryImages />

    <ProductsSection />
  </div>
  <Footer />
</main>
