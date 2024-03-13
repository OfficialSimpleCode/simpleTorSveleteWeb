<script lang="ts">
  import { base } from "$app/paths";
  import {
    appInstagram,
    cuntactPhone,
    simpleTorHomePage,
  } from "$lib/consts/app_external_links";
  import { contactUsAnimation } from "$lib/consts/resources";
  import { _, translate } from "$lib/utils/translate";
  import CustomCircleIcon from "../custom_components/CustomCircleIcon.svelte";
  import LottieAnimation from "../custom_components/LottieAnimation.svelte";
  import DialogStrucher from "./DialogStrucher.svelte";

  export let dialog: HTMLDialogElement;
</script>

<DialogStrucher bind:dialog>
  <div class="modal-box bg-base-200 items-center">
    <div class="flex flex-col gap-3 items-center h-full">
      <!-- title and top buttons -->
      <div class="flex flex-row justify-between items-center relative gap-2">
        <!-- close button -->
        <CustomCircleIcon
          icon="mdi:whatsapp"
          size="md"
          href={`whatsapp://send?phone=${cuntactPhone
            .replaceAll("+", "")
            .replaceAll("-", "")}`}
        />
        <CustomCircleIcon
          icon="mdi:instagram"
          href={appInstagram}
          size="md"
          target="_blank"
        />
        <CustomCircleIcon
          icon="ph:globe"
          size="md"
          href={simpleTorHomePage}
          target="_blank"
        />

        <CustomCircleIcon
          icon="iconoir:message"
          size="md"
          target="_blank"
          href={`${base}/contact-us`}
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
        {translate("SupportDscription", $_)}
      </h3>
    </div>
  </div>
</DialogStrucher>
