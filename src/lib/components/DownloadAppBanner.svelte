<script>
  import { downloadAppBanner } from "$lib/controllers/screens_controller";
  import { businessStore } from "$lib/stores/Business";
  import { getDownloadingAppLink } from "$lib/utils/links_utils";
  import { onMount } from "svelte";
  import { QRCodeImage } from "svelte-qrcode-image";
  import { fly } from "svelte/transition";
  import CustomCircleIcon from "./custom_components/CustomCircleIcon.svelte";

  let downloadLink = "";
  // After the ui is loaded
  onMount(() => {
    downloadLink = getDownloadingAppLink($businessStore?.dynamicLink ?? "");
  });

  function closeBanner() {
    downloadAppBanner.set(false);
  }
</script>

{#if $downloadAppBanner}
  <div
    class="fixed bottom-4 sm:left-4 mx-4 z-40"
    transition:fly={{ y: "100%", duration: 600 }}
  >
    <div
      class="bg-opacity-70 backdrop-blur-lg bg-base-300 rounded-[2.5rem] py-6 px-4 flex-row gap-7 border-[2px] border-base-200 flex invisible xs:visible"
    >
      <div class="flex flex-col h-[140px]">
        <div class="flex flex-col h-full">
          <h2 class="text-start text-lg text-primary">
            עדיין אין לך את אפליקציית Simple Tor ?
          </h2>
          <p class="text-start text-sm opacity-90">
            הורד עכשיו ותהנה מהזמנת תורים בפשטות
          </p>
        </div>
        <div class="flex flex-row gap-2">
          <a
            class="btn btn-primary rounded-[2rem]"
            href={downloadLink}
            target="_blank"
          >
            הורד את האפליקציה
          </a>

          <button class="btn btn-outline rounded-[2rem]" on:click={closeBanner}>
            לא, תודה
          </button>
        </div>
      </div>

      <div class=" flex-col gap-2">
        <div class="border-4 border-spacing-5 border-primary rounded-[2rem]">
          <QRCodeImage
            text={downloadLink}
            displayType={"canvas"}
            displayWidth={150}
            displayHeight={150}
          />
        </div>

        <p class="text-center text-sm opacity-60 pt-1">להורדת האפליקציה</p>
      </div>
    </div>

    <div
      class="relative bg-opacity-80 backdrop-blur-lg bg-base-300 rounded-[1.9rem] py-6 px-4 flex-row gap-7 border-[2px] border-base-200 xs:w-max xs:hidden"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-col h-full min-w-[40px]">
          <h2 class="text-center text-md text-primary">
            עדיין אין לך את האפליקציה?
          </h2>
          <p class="text-center text-sm">
            הורד עכשיו ותהנה מהזמנת תורים בפשטות
          </p>
        </div>

        <div class="flex flex-row justify-center w-full">
          <a
            class="btn btn-primary btn-md rounded-[2rem] min-w-[300px]"
            href={downloadLink}
            target="_blank"
          >
            הורד את Simple Tor
          </a>
        </div>
      </div>

      <div class="absolute top-4 right-4 text-base-content text-opacity-45">
        <CustomCircleIcon
          size={"xs"}
          handleClick={closeBanner}
          icon="material-symbols:close"
          bgColor="bg-base-content bg-opacity-20 backdrop-blur-lg"
        />
      </div>
    </div>
  </div>
{/if}
