<script>
  import { iosLink } from "$lib/consts/app_external_links";
  import { businessStore } from "$lib/stores/Business";
  import { getDownloadingAppLink } from "$lib/utils/links_utils";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import { QRCodeImage } from "svelte-qrcode-image";
  let downloadLink = iosLink;
  // After the ui is loaded
  onMount(() => {
    businessStore.subscribe((value) => {
      downloadLink = getDownloadingAppLink(value?.dynamicLink ?? "");
    });
  });
</script>

<div class=" flex-col hidden sm:flex">
  <div class="border-4 p-[6px] border-primary rounded-[1.6rem] bg-white">
    <QRCodeImage
      text={downloadLink}
      displayType={"canvas"}
      width={120}
      displayWidth={60}
      displayHeight={60}
    />
  </div>

  <p class="text-center text-xs opacity-60 pt-[2px]">
    {translate("forDownload", $_)}
  </p>
</div>
