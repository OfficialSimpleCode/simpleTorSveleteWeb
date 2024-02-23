<script>
  import { containerRadius } from "$lib/consts/sizes";
  import { getDownloadingAppLink } from "$lib/utils/links_utils";
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
    <h3 class="md:text-5xl text-3xl">מוכן לקחת את העסק צעד אחד קדימה?</h3>
    <p class="mt-3 md:text-xl opacity-70">
      הגיע הזמן לעבוד כמו מקצוען ולהשאיר את כאבי הראש למתחרים
    </p>
    <p class="mt-8">
      <a
        href={downloadLink}
        class="btn lg:btn-md btn-primary px-16 text-lg bg-primary {containerRadius}"
        >התחל עכשיו
      </a>
    </p>
  </div>
</section>
