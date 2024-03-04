<script>
  import { containerRadius } from "$lib/consts/sizes";
  import { getDownloadingAppLink } from "$lib/utils/links_utils";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";

  let downloadLink = "";
  // After the ui is loaded
  onMount(() => {
    downloadLink = getDownloadingAppLink();
  });
</script>

<section class="flex justify-center">
  <div
    class="max-w-full mx-5 py-24 bg-base-300 rounded-lg text-center md:px-24 xs:px-10 px-5"
  >
    <h2 class="md:text-5xl text-3xl">{translate("readyToGoForwords", $_)}</h2>
    <p class="mt-3 md:text-xl opacity-70">
      {translate("workLikePro", $_)}
    </p>
    <a
      href={downloadLink}
      class="btn btn-primary px-6 sm:px-20 text-lg bg-primary {containerRadius} mt-8"
      >{translate("getStarted", $_)}
    </a>
  </div>
</section>
