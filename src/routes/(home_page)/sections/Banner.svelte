<script>
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
  import topBarGif from "$lib/images/example.gif";
</script>

<section class="bg-base-200">
  <div
    class="flex lg:flex-row flex-col-reverse items-center gap-y-16 text-center lg:text-start lg:justify-between px-10 max-w-[1500px] mx-auto lg:py-48 py-20"
  >
    <!-- title  -->
    <div>
      <h1
        class="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl dark:text-white"
      >
        ניהול התורים בעסק ללא מאמץ
      </h1>

      <!-- sub title -->
      <p
        class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
      >
        מערכת ניהול עסק מתקדמת, זימוני תורים, ניהול עובדים, תשלומים וקבלות,
        מהטלפון בבית
      </p>

      <!-- download app button -->
      <div class="lg:flex block lg:justify-start">
        <div class="">
          <DownloadAppButton />
        </div>
      </div>
    </div>

    <!-- the banner images -->

    <div class=" lg:col-span-5 lg:flex max-w-[350px]">
      <div
        class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl"
      >
        <div
          class="w-[118px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"
        ></div>
        <div
          class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"
        ></div>
        <div
          class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"
        ></div>
        <div
          class="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"
        ></div>
        <div
          class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800"
        >
          <img src={topBarGif} alt="mockup" />
        </div>
      </div>
      <!-- <img
        src="https://i.pinimg.com/originals/f3/b0/0f/f3b00f83a79c9648e01a45f4b76ea3a8.gif"
        alt="mockup"
      /> -->
    </div>
  </div>
</section>
