<script lang="ts">
  import defaultBannerImageDark from "$lib/images/default_photo.webp";
  import defaultBannerImageLight from "$lib/images/default_photo_light.webp";
  import { businessStore } from "$lib/stores/Business";
  import { computeLuminance } from "$lib/utils/general_utils";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let changingImagesHeight: number = 150;
  let currentIndex: number = 0;

  const changingImagesRatioX = 5;
  const changingImagesRatioY = 4;

  let useDefault: boolean = false;
  let defaultImage: string = "";
  useDefault = $businessStore.design.changingImages.length === 0;
  defaultImage =
    computeLuminance($businessStore.design.pickedTheme.background) > 0.5
      ? defaultBannerImageLight
      : defaultBannerImageDark;
  // After the ui is loaded
  onMount(() => {
    // calculating the size for the ratio
    changingImagesHeight =
      window != null
        ? window.innerHeight * (changingImagesRatioY / changingImagesRatioX)
        : 150;

    // starting the changin images animation
    if ($businessStore.design.changingImages.length > 1) {
      setInterval(() => {
        currentIndex =
          (currentIndex + 1) % $businessStore.design.changingImages.length;
      }, $businessStore.design.changingImagesSwapSeconds * 1000);
    }
  });
</script>

{#key currentIndex}
  <!-- wide screens -->
  <img
    class="md:h-1/2 w-full object-cover h-[{changingImagesHeight}px] min-h-[270px] hidden xs:block transition-opacity"
    src={useDefault
      ? defaultImage
      : $businessStore.design.changingImages[currentIndex]}
    alt={"business image"}
    style="animation: 1s ease-out"
    in:fade={{ duration: 1000 }}
  />

  <!-- small screens -->
  <div class="relative xs:hidden">
    <img
      class="md:h-1/2 min-h-[40vh] h-[40vh] w-full object-cover transition-opacity"
      src={useDefault
        ? defaultImage
        : $businessStore.design.changingImages[currentIndex]}
      alt={"business image"}
      style="animation: 1s ease-out;"
      in:fade={{ duration: 1000 }}
    />
    <div
      class="h-[50px] bg-gradient-to-b from-transparent via-base-100 to-base-100 absolute bottom-[-2px] w-full"
    ></div>
  </div>
{/key}
