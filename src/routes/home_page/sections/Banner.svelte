<script>
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
  import topBarGif from "$lib/images/video example.mp4";
  import { _, translate } from "$lib/utils/translate";
  import DeviceMock from "../components/DeviceMock.svelte";
</script>

<section class="bg-base-100">
  <div
    class="flex lg:flex-row flex-col items-center gap-y-16 text-center lg:text-start lg:justify-between px-10 max-w-[1500px] mx-auto lg:py-20 py-10"
  >
    <!-- title  -->
    <div>
      <h1
        class="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl"
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
        <!-- <div class="">
          
        </div> -->
      </div>
    </div>

    <!-- the banner images -->

    <div class="lg:col-span-5 lg:flex sm:w-[260px] w-[230px]">
      <DeviceMock mediaSrc={topBarGif} uuid="BannerPhone" />
      <!-- <img
        src="https://i.pinimg.com/originals/f3/b0/0f/f3b00f83a79c9648e01a45f4b76ea3a8.gif"
        alt="mockup"
      /> -->
    </div>
  </div>
</section>
