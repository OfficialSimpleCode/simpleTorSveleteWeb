<script>
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
  import { _, translate } from "$lib/utils/translate";
  import FaqItem from "../components/FaqItem.svelte";
</script>

<section class="bg-base-100">
  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
    <div class="flex flex-row justify-between items-center pb-6">
      <h2 class="text-2xl font-bold text-center sm:text-4xl">
        {translate("faq", $_, false)}
      </h2>
      <div class="hidden sm:block">
        <DownloadAppButton />
      </div>
    </div>
    <div
      class="grid pt-8 border-t md:gap-16 border-base-content border-opacity-10 md:grid-cols-2"
    >
      <div>
        <FaqItem
          questionTransKey={translate("faq1", $_, false)}
          answerTransKey={translate("faq2", $_, false)}
        />
        <FaqItem
          questionTransKey={translate("faq3", $_, false)}
          answerTransKey={translate("faq4", $_, false)}
        />
        <FaqItem
          questionTransKey={translate("faq5", $_, false)}
          answerTransKey={translate("faq6", $_, false)}
        />
        <FaqItem
          questionTransKey={translate("faq7", $_, false)}
          answerTransKey={translate("faq8", $_, false)}
        />
        <FaqItem
          questionTransKey={translate("faq9", $_, false)}
          answerTransKey={translate("faq10", $_, false)}
        />
      </div>
      <div>
        <FaqItem
          questionTransKey={translate("faq11", $_, false)}
          answerTransKey={translate("faq12", $_, false)}
        />
        <FaqItem
          questionTransKey={translate("faq13", $_, false)}
          answerTransKey={translate("faq14", $_, false)}
        />
        <FaqItem
          questionTransKey={translate("faq15", $_, false)}
          answerTransKey={translate("faq16", $_, false)}
        />
        <FaqItem
          questionTransKey={translate("faq17", $_, false)}
          answerTransKey={translate("faq18", $_, false)}
        />
        <FaqItem
          questionTransKey={translate("faq19", $_, false)}
          answerTransKey={translate("faq20", $_, false)}
        />
      </div>
    </div>
  </div>
</section>
