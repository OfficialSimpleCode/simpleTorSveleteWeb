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

  import { businessTypeToStr } from "$lib/consts/business_types";
  import { computeLuminance } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import ChangingImages from "./sections/ChangingImages.svelte";
  import Footer from "./sections/Footer.svelte";
  import IconAndTopButtons from "./sections/IconAndTopButtons.svelte";
  import ProductsSection from "./sections/ProductsSection.svelte";
  import StoryImages from "./sections/StoryImages.svelte";
  import Updates from "./sections/Updates.svelte";
  export let data;

  onMount(() => {
    let themeKey: string = $businessStore.design.pickedThemeKey;
    let themes = $businessStore.design.businessThemes;
    let theme = getTheme(themeKey, themes);
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

    // Load theme font
    let head: HTMLHeadElement = document.getElementsByTagName("head")[0];
    let fontLinkElement: HTMLLinkElement = document.createElement("link");
    fontLinkElement.setAttribute("rel", "stylesheet");
    fontLinkElement.setAttribute(
      "href",
      `https://fonts.googleapis.com/css?family=${theme.fontName}`
    );
    head.appendChild(fontLinkElement);
  });
</script>

<svelte:head>
  <title>
    {$businessStore.shopName} | {translate(
      businessTypeToStr[$businessStore.businesseType],
      $_
    )}
  </title>
  <meta
    name="description"
    content={translate(businessTypeToStr[$businessStore.businesseType], $_)}
  />
  <link
    rel="icon"
    href={$businessStore.design.shopIconUrl}
    type="image/x-icon"
  />
  <meta name="author" content={$businessStore.ownersName} />
  <meta
    property="og:title"
    content="{$businessStore.shopName} | {translate(
      businessTypeToStr[$businessStore.businesseType],
      $_
    )}"
  />
  <meta property="og:image" content={$businessStore.design.shopIconUrl} />
  <meta
    property="og:description"
    content={translate(businessTypeToStr[$businessStore.businesseType], $_)}
  />
</svelte:head>

<main class="w-full h-full">
  <Navbar />

  <!-- background image -->
  <ChangingImages />

  <!-- define the whole page below the top images -->
  <div class="bg-base-100 min-h-1/2 w-full z-10">
    <!-- this is effects the entire layout (top margin is -3 to be above the images)-->
    <div class=" ">
      <!-- the business icon, name, address, order & share buttons -->
      <IconAndTopButtons />
    </div>
    <!-- business icons links -->
    <SocialLinks />

    <!-- business updates -->
    <Updates />

    <!-- Display images -->
    <StoryImages></StoryImages>

    <ProductsSection></ProductsSection>
  </div>
  <Footer />
</main>
