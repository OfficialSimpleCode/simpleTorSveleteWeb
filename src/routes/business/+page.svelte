<script lang="ts">
  import { onMount } from "svelte";
  // Models
  // Components
  import SocialLinks from "./sections/SocialLinks.svelte";

  // other (utils / stores)
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { businessStore } from "$lib/stores/Business.js";
  import {
    getOklachValues,
    getTheme,
    loadColorFromTheme,
  } from "$lib/utils/colors";

  import { computeLuminance } from "$lib/utils/general_utils";
  import ChangingImages from "./sections/ChangingImages.svelte";
  import Footer from "./sections/Footer.svelte";
  import IconAndTopButtons from "./sections/IconAndTopButtons.svelte";
  import ProductsSection from "./sections/ProductsSection.svelte";
  import StoryImages from "./sections/StoryImages.svelte";

  let themeKey: string = $businessStore.design.pickedThemeKey;
  let themes = $businessStore.design.businessThemes;
  let theme = getTheme(themeKey, themes);

  onMount(() => {
    document.documentElement.style.setProperty(
      "--p",
      getOklachValues(loadColorFromTheme("primary", themeKey, themes))
    );
    document.documentElement.style.setProperty(
      "--b1",
      getOklachValues(loadColorFromTheme("background", themeKey, themes))
    );
    document.documentElement.style.setProperty(
      "--bc",
      getOklachValues(theme.brightness == 0 ? "#fff" : "#000")
    );
    document.documentElement.style.setProperty(
      "--pc",
      getOklachValues(computeLuminance(theme.primary) > 0.5 ? "#000" : "#fff")
    );
    document.documentElement.style.setProperty(
      "--b2",
      getOklachValues(loadColorFromTheme("surface", themeKey, themes))
    );
    document.documentElement.style.setProperty(
      "--b3",
      getOklachValues(loadColorFromTheme("tertiary", themeKey, themes))
    );

    let html: HTMLHtmlElement = document.getElementsByTagName("html")[0];
    html.setAttribute("data-theme", theme.brightness == 0 ? "dark" : "light");
    html.style.setProperty("font-family", theme.fontName);
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

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family={theme.fontName}"
    rel="stylesheet"
  />
</svelte:head>

<main class="w-full h-full" style="">
  <Navbar />

  <!-- background image -->
  <ChangingImages></ChangingImages>

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
