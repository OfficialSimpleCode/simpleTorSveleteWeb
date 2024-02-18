<script lang="ts">
  import {
    appInstagram,
    cuntactPhone,
    simpleCodeWebUrl,
    simpleTorHomePage,
  } from "$lib/consts/app_external_links";
  import { contactUsAnimation } from "$lib/consts/resources";
  import { translate } from "$lib/utils/translate";
  import CustomCircleIcon from "../custom_components/CustomCircleIcon.svelte";
  import LottieAnimation from "../custom_components/LottieAnimation.svelte";

  export let dialog: HTMLDialogElement;

  function openLink(link: string) {
    window.open(link, "_blank");
  }
</script>

<dialog
  bind:this={dialog}
  on:close={() => history.back()}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box bg-base-200 items-center">
    <div class="flex flex-col gap-3 items-center h-full">
      <!-- title and top buttons -->
      <div class="flex flex-row justify-between items-center relative gap-2">
        <!-- close button -->
        <CustomCircleIcon
          icon="mdi:whatsapp"
          size="md"
          href={`whatsapp://send?phone=${cuntactPhone}`}
        />
        <CustomCircleIcon icon="mdi:instagram" href={appInstagram} size="md" />
        <CustomCircleIcon icon="ph:globe" size="md" href={simpleTorHomePage} />

        <CustomCircleIcon
          icon="iconoir:message"
          size="md"
          href={simpleCodeWebUrl}
        />
      </div>

      <div class="divider h-[0.5px]" />

      <LottieAnimation
        animationFile={contactUsAnimation}
        loop={true}
        size="xl4"
      />

      <!-- conatct us description -->
      <h3 class="text-sm text-center mx-6 mb-8">
        {translate("SupportDscription")}
      </h3>
    </div>
  </div>
  <!-- backdrop close dialog -->
  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
