<script>
  import { businessStore } from "$lib/stores/Business";
  import { getDownloadingAppLink } from "$lib/utils/links_utils";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import { QRCodeImage } from "svelte-qrcode-image";
  let downloadLink = "";
  // After the ui is loaded
  onMount(() => {
    downloadLink = getDownloadingAppLink($businessStore?.dynamicLink ?? "");
  });
</script>

<div class=" flex-col gap-1 hidden sm:flex">
  <div class="border-4 border-spacing-5 border-primary rounded-[2rem]">
    <QRCodeImage
      text={downloadLink}
      displayType={"canvas"}
      displayWidth={150}
      displayHeight={150}
    />
  </div>

  <p class="text-center text-sm opacity-60 pt-1">
    {translate("forDownload", $_)}
  </p>
</div>
