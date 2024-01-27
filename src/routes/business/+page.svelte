<script lang="ts">
  import { onMount } from "svelte";
  // Models
  // Components
  import SocialLinks from "./sections/SocialLinks.svelte";

  // other (utils / stores)
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { businessStore } from "$lib/stores/Business.js";
  import { getOklachValues, loadColorFromTheme } from "$lib/utils/colors";

  import Footer from "./sections/Footer.svelte";
  import IconAndTopButtons from "./sections/IconAndTopButtons.svelte";
  import ProductsSection from "./sections/ProductsSection.svelte";
  import StoryImages from "./sections/StoryImages.svelte";

  const changingImagesRatioX = 5;
  const changingImagesRatioY = 4;
  const changingImagesHeight =
    window.innerHeight * (changingImagesRatioY / changingImagesRatioX);

  onMount(() => {
    let themeKey: string = $businessStore.design.pickedThemeKey;
    let themes = $businessStore.design.businessThemes;
    document.documentElement.style.setProperty(
      "--p",
      getOklachValues(loadColorFromTheme("primary", themeKey, themes))
    );
    document.documentElement.style.setProperty(
      "--b1",
      getOklachValues(loadColorFromTheme("background", themeKey, themes))
    );
    document.documentElement.style.setProperty(
      "--b2",
      getOklachValues(loadColorFromTheme("surface", themeKey, themes))
    );
    document.documentElement.style.setProperty(
      "--b3",
      getOklachValues(loadColorFromTheme("tertiary", themeKey, themes))
    );
  });

  // Dialogs
  let screenHeight = window.innerHeight;
  const storyImagesRatioX = 9;
  const storyImagesRatioY = 16;

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

<main class="w-full h-full" style="">
  <Navbar />

  <!-- background image -->
  <img
    class="md:h-1/2 w-full object-cover h-[{changingImagesHeight}px] min-h-[270px]"
    src={$businessStore.design.changingImages[0]}
    alt="backgroud"
  />

  <!-- define the whole page below the top images -->
  <div class="bg-base-100 min-h-1/2 w-full z-10">
    <!-- this is effects the entire layout (top margin is -3 to be above the images)-->
    <div class=" ">
      <!-- the business icon, name, address, order & share buttons -->
      <IconAndTopButtons></IconAndTopButtons>
    </div>
    <!-- business icons links -->
    <SocialLinks />

    <!-- Display images -->
    <StoryImages></StoryImages>

    <ProductsSection></ProductsSection>
  </div>
  <Footer />
</main>
