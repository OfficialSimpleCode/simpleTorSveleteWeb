<script lang="ts">
  import { businessTypeToStr } from "$lib/consts/business_types";
  import { businessStore } from "$lib/stores/Business";
  import {
    getOklachValues,
    getTheme,
    loadColorFromTheme,
  } from "$lib/utils/colors";
  import { _, translate } from "$lib/utils/translate";

  import { computeLuminance } from "$lib/utils/general_utils";
  import { onMount } from "svelte";

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

<slot />
