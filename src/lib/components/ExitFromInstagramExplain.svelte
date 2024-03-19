<script lang="ts">
  import { isAppleUser } from "$lib/consts/platform";
  import { containerRadius } from "$lib/consts/sizes";
  import androidImg from "$lib/images/exirFromInstagramAndroid.png";
  import appleImg from "$lib/images/exitFromInstagramIos.webp";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import GeneralIcon from "./custom_components/GeneralIcon.svelte";
  let imgSrc: string = appleImg;
  let moreIcon: string = "ri:more-fill";
  let externalBrowserText = "Open in external browser";
  onMount(() => {
    if (!isAppleUser) {
      imgSrc = androidImg;
      moreIcon = "ic:baseline-more-vert";
      externalBrowserText = translate("externalBrowserTextAndroid", $_);
    }
  });
</script>

<main>
  <div class="flex flex-col justify-center items-center py-4 px-2">
    <!-- Title -->
    <h1 class="text-xl text-center">{translate("inInstagramBrowser", $_)}</h1>
    <p class="text-md text-red-500 opacity-70 text-center max-w-[300px] pt-3">
      {translate("inInstagramBrowserDesc", $_)}
    </p>
    <!-- Explanation img -->
    <img
      class="w-[240px] object-cover pt-2"
      src={imgSrc}
      alt="Explain how to exit from instageam in app browser"
    />

    <!-- Explanations text -->
    <ul class="pt-2 text-lg">
      <li class="flex flex-row gap-x-2">
        {translate("howToExitInstagramExplain1", $_)}
        <div class="{containerRadius} bg-base-200 px-2">
          <GeneralIcon icon={moreIcon} />
        </div>
      </li>
      <li class="flex flex-row gap-x-2 pt-2 justify-start items-center">
        {translate("clickOpenIn", $_)}
        <div class="{containerRadius} bg-base-200 px-3 py-1">
          {externalBrowserText}
        </div>
      </li>
    </ul>
  </div>
</main>
