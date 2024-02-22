<script lang="ts">
  import defaultBannerImageDark from "$lib/images/default_photo.webp";
  import defaultBannerImageLight from "$lib/images/default_photo_light.webp";
  import { businessStore } from "$lib/stores/Business";
  import { computeLuminance } from "$lib/utils/general_utils";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let changingImagesHeight: number = 500;
  let currentIndex: number = 0;
  let screenWidth = 500;
  const changingImagesRatioX = 5;
  const changingImagesRatioY = 4;
  const a = "h-[500px]";
  let b = "h-[1000px]";
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
    // changingImagesHeight = Math.floor(
    //   screenWidth * (changingImagesRatioY / changingImagesRatioX)
    // );

    //changingImagesHeight = 200;

    const elem = document.querySelector("#shilo");
    console.log("element is ", elem);
    const a1 = `h-[${changingImagesHeight}px]`;
    console.log("a1 is  ", a1);
    elem?.classList.add("border-[20px]");
    elem?.classList.add("border-primary");
    elem?.classList.add(a1);
    // calculating the size for the ratio
    // changingImagesHeight =
    //   window != null
    //     ? window.innerWidth * (changingImagesRatioY / changingImagesRatioX)
    //     : 500;
    b = `h-[${changingImagesHeight}px]`;
    console.log("The b is -> ", b);

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

  function getHeigth() {
    return `h-[${changingImagesHeight}px]`;
  }
</script>

<!-- <svelte:window bind:innerWidth={screenWidth} /> -->
{#key currentIndex}
  <!-- wide screens -->

  <div class="md:h-[450px] w-full h-[370px] hidden xs:block">
    <img
      class="md:h-[450px] w-full object-cover h-[370px] hidden xs:block transition-opacity"
      src={useDefault ? defaultImage : changingImages[currentIndex]}
      alt={"business image"}
      style="animation: 1s ease-out"
      in:fade={{ duration: 1000 }}
    />
  </div>

  <!-- small screens -->
  <div class="relative xs:hidden block">
    <div class="aspect-[5/4]">
      <img
        class="aspect-[5/4] object-cover transition-opacity"
        src={useDefault ? defaultImage : changingImages[currentIndex]}
        alt={"business image"}
        style="animation: 1s ease-out;"
        in:fade={{ duration: 1000 }}
      />
    </div>

    <div
      class="h-[50px] bg-gradient-to-b from-transparent via-base-100 to-base-100 absolute bottom-[-2px] w-full bg-red"
    ></div>
  </div>
{/key}
