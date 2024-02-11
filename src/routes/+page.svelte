<script lang="ts">
  import SearchBusiness from "$lib/components/SearchBusiness.svelte";
  import { storyImagesRatioX, storyImagesRatioY } from "$lib/consts/sizes";

  let screenHeight = window.innerHeight;

  $: storyImagesHeigth = Math.floor(Math.max(screenHeight * 0.4, 320));
  $: storyImagesWidth = Math.floor(
    storyImagesHeigth * (storyImagesRatioX / storyImagesRatioY)
  );

  // Update screenWidth on window resize
  window.addEventListener("resize", () => {
    screenHeight = window.innerHeight;

    storyImagesHeigth = Math.floor(Math.max(screenHeight * 0.4, 320));
    storyImagesWidth = Math.floor(
      storyImagesHeigth * (storyImagesRatioX / storyImagesRatioY)
    );

    console.log("screenHeight", screenHeight);
    console.log("storyImagesHeigth", storyImagesHeigth);
    console.log(`h-[${storyImagesHeigth}px]`, `w-[${storyImagesWidth}px]`);
  });
</script>

<svelte:head>
  <title>SimpleTor</title>
  <meta name="description" content="SimpleTor Web Application" />
</svelte:head>

<SearchBusiness titleKey="businessSearchShowcase" />
