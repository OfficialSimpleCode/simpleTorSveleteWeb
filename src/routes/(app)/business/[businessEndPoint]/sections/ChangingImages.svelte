<script lang="ts">
  import TermDialog from "$lib/components/dialogs/TermDialog.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import defaultBannerImageDark from "$lib/images/default_photo.webp";
  import defaultBannerImageLight from "$lib/images/default_photo_light.webp";
  import { businessStore } from "$lib/stores/Business";
  import { computeLuminance } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import IconAndTopButtons from "./IconAndTopButtons.svelte";
  import SocialLinks from "./SocialLinks.svelte";
  let termDialog: HTMLDialogElement;
  let currentIndex: number = 0;

  let useDefault: boolean = false;
  let defaultImage: string = "";
  $: changingImages = $businessStore?.design.changingImages ?? [];
  $: useDefault = changingImages.length === 0;
  $: defaultImage =
    computeLuminance($businessStore?.design.pickedTheme.background ?? 0) > 0.5
      ? defaultBannerImageLight
      : defaultBannerImageDark;
  // After the ui is loaded
  onMount(() => {
    // starting the changin images animation
    if (changingImages.length > 1) {
      setInterval(
        () => {
          currentIndex = (currentIndex + 1) % changingImages.length;
        },
        ($businessStore?.design.changingImagesSwapSeconds ?? 6) * 1000
      );
    }
  });
</script>

<TermDialog bind:dialog={termDialog} />

<!-- <svelte:window bind:innerWidth={screenWidth} /> -->

<!-- wide screens -->
<div class=" md:h-[800px] w-full hidden md:block">
  {#key currentIndex}
    <div class="absolute w-full bg-base-300">
      <img
        class="relative top-0 h-[800px] w-full object-cover hidden md:block transition-opacity"
        src={useDefault ? defaultImage : changingImages[currentIndex]}
        alt={translate("bannerImage", $_)}
        transition:fade={{ delay: 0, duration: 1000 }}
      />
    </div>
  {/key}
  <div class="w-full h-full flex items-center justify-center">
    <div
      class="inline-block justify-center bg-opacity-40 backdrop-blur-lg bg-base-200 py-10 px-4 {containerRadius}"
    >
      <IconAndTopButtons shrinkedDisplay={true} onImages={true} />
      <SocialLinks {termDialog} shrinkedDisplay={true} />
    </div>
  </div>
</div>
<!-- small screens -->

<div class="relative md:hidden block">
  <div class="aspect-[5/4] w-full">
    {#key currentIndex}
      <img
        class="w-full aspect-[5/4] object-cover transition-opacity"
        src={useDefault ? defaultImage : changingImages[currentIndex]}
        alt={translate("bannerImage", $_)}
        in:fade={{ delay: 0, duration: 1000 }}
      />
    {/key}
  </div>
  <div
    class="h-[50px] bg-gradient-to-b from-transparent via-base-100 to-base-100 absolute bottom-[-2px] w-full bg-red"
  ></div>
</div>
