<script>
  import { containerRadius } from "$lib/consts/sizes";
  import { _, translate } from "$lib/utils/translate";
</script>

<section
  class="bg-base-100 max-w-screen-xl xl:mx-auto mx-4 mb-32 {containerRadius}"
>
  <div
    class="relative px-4 sm:px-10 md:px-10 py-10 lg:py-20 max-w-screen-lg mx-auto"
  >
    <h2 class="text-2xl font-bold text-center sm:text-4xl pb-10">
      {translate("articleTitle1", $_, false)}
    </h2>
    <h3 class="pb-3 text-xl">{translate("articleTitle2", $_, false)}</h3>
    <div
      class="flex flex-col gap-8 opacity-70 bg-base-200 {containerRadius} p-6"
    >
      <p>
        {translate("articleContent1", $_, false)}
      </p>
      <p>
        {translate("articleContent2", $_, false)}
      </p>

      <p>
        {translate("articleContent3", $_, false)}
      </p>

      <p>
        {translate("articleContent4", $_, false)}
      </p>
    </div>
    <div class="grid pt-8 md:gap-16 md:grid-cols-2 gap-10">
      <div>
        <h3 class="pb-3 text-xl">{translate("articleTitle3", $_, false)}</h3>

        <div
          class="flex flex-col gap-4 opacity-70 bg-base-200 {containerRadius} p-6"
        >
          <p>
            {translate("articleContent5", $_, false)}
          </p>
          <p>
            {translate("articleContent6", $_, false)}
          </p>
          <p>
            {translate("articleContent7", $_, false)}
          </p>
        </div>
      </div>
      <div>
        <h3 class="pb-3 text-xl">{translate("articleTitle4", $_, false)}</h3>
        <div
          class="flex flex-col gap-4 opacity-70 bg-base-200 {containerRadius} p-6"
        >
          <p>
            {translate("articleContent8", $_, false)}
          </p>

          <p>
            {translate("articleContent9", $_, false)}
          </p>

          <p>
            {translate("articleContent10", $_, false)}
          </p>

          <p>
            {translate("articleContent11", $_, false)}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
