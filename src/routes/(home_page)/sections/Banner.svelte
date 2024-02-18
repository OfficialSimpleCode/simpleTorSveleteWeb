<script>
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
</script>

<section class="bg-base-200">
  <div
    class="flex lg:flex-row flex-col-reverse items-center gap-y-10 text-center lg:text-start lg:justify-between px-10 max-w-[1500px] mx-auto lg:py-48 py-20"
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
      <div class=" lg:block flex justify-center">
        <div class="max-w-[300px]">
          <DownloadAppButton />
        </div>
      </div>
    </div>

    <!-- the banner images -->
    <div class=" lg:col-span-5 lg:flex max-w-[400px]">
      <img
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
        alt="mockup"
      />
    </div>
  </div>
</section>
