<script>
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import bannerImage from "$lib/images/bannerImage.webp";
  import { _, translate } from "$lib/utils/translate";
</script>

<section class="bg-base-100">
  <div
    class="flex lg:flex-row flex-col items-center gap-y-16 text-center lg:text-start lg:justify-between px-5 max-w-[1620px] mx-auto lg:py-20 py-10"
  >
    <!-- title  -->
    <div>
      <h1
        class="max-w-2xl mb-4 font-extrabold sm:min-w-[500px] tracking-tight leading-none text-3xl md:text-4xl xl:text-5xl"
      >
        {translate("mainWebTitle", $_, false)}
      </h1>

      <!-- sub title -->
      <p
        class="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl opacity-70"
      >
        {translate("mainWebSubTitle", $_, false)}
      </p>

      <!-- download app button -->

      <div class="flex justify-center lg:justify-start w-full">
        <DownloadAppButton />
      </div>
    </div>

    <!-- the banner images -->

    <div
      class="lg:col-span-5 lg:flex max-w-[600px] bg-base-200 {containerRadius} xs:mx-10 mx-0"
    >
      <!-- <DeviceMock mediaSrc={topBarGif} uuid="BannerPhone" /> -->

      <img class="object-scale-down" src={bannerImage} alt="mockup" />
    </div>
  </div>
</section>
