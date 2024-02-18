<script lang="ts">
  import { logger } from "$lib/consts/application_general";
  import { storyImagesRatioX, storyImagesRatioY } from "$lib/consts/sizes";
  import { onMount } from "svelte";
  import HomePage from "./(home_page)/HomePage.svelte";
  let screenHeight: number;
  onMount(() => {
    screenHeight = window.innerHeight;
    // Update screenWidth on window resize
    window.addEventListener("resize", () => {
      screenHeight = window.innerHeight;

      storyImagesHeigth = Math.floor(Math.max(screenHeight * 0.4, 320));
      storyImagesWidth = Math.floor(
        storyImagesHeigth * (storyImagesRatioX / storyImagesRatioY)
      );

      logger.debug("screenHeight", screenHeight);
      logger.debug("storyImagesHeigth", storyImagesHeigth);
      logger.debug(`h-[${storyImagesHeigth}px]`, `w-[${storyImagesWidth}px]`);
    });
  });

  $: storyImagesHeigth = Math.floor(Math.max(screenHeight * 0.4, 320));
  $: storyImagesWidth = Math.floor(
    storyImagesHeigth * (storyImagesRatioX / storyImagesRatioY)
  );
</script>

<svelte:head>
  <title>SimpleTor</title>
  <meta name="description" content="SimpleTor Web Application" />
</svelte:head>

<HomePage />
<!-- <SearchBusiness titleKey="businessSearchShowcase" /> -->
