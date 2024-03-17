<script>
  import { _, translate } from "$lib/utils/translate";
  import HowItWorkStep from "../components/HowItWorkStep.svelte";
</script>

<section id="works" class="w-full bg-base-200">
  <div
    class="relative bg-base-200 ontainer mx-auto py-10 lg:py-28 flex flex-col items-center"
  >
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <!-- top data (title + sub titlr) -->
      <div class="max-w-2xl mx-auto text-center">
        <!-- title  -->
        <h2 class="mb-2 text-3xl lg:text-4xl">{translate("howItWork", $_)}</h2>
        <!-- sub title  -->
        <p
          class="max-w-lg mx-auto mt-4 bg-transparent text-center opacity-70 sm:text-xl"
        >
          {translate("howItWorkSubTitle", $_)}
        </p>
      </div>

      <!-- buttom part -->
      <div class="relative mt-12 lg:mt-20">
        <!-- dots img -->
        <div
          class="absolute inset-x-0 hidden xl:px-44 top-10 md:block md:px-20 lg:px-28"
        >
          <img
            alt=""
            loading="lazy"
            width="1000"
            height="500"
            decoding="async"
            data-nimg="1"
            class="w-full"
            style="color:transparent"
            src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
          />
        </div>

        <!-- list of steps  -->
        <div
          class="relative grid grid-cols-1 text-center gap-y-16 md:grid-cols-3 gap-x-28"
        >
          <HowItWorkStep
            imageSrc="https://lottie.host/f6698e26-fdce-4eb9-bb80-def9a8874750/OL8jB5DdGx.json"
            titleTransKey={translate("createAccount", $_, false)}
            subTitleTransKey={translate("createAccountDesc", $_, false)}
            stepNumber={1}
          />

          <HowItWorkStep
            imageSrc="https://lottie.host/daeffa4b-3884-476d-9e08-884b415465ad/uTx14abQ0f.json"
            titleTransKey={translate("createNewBusiness", $_, false)}
            subTitleTransKey={translate("createBusinessDesc", $_, false)}
            stepNumber={2}
          />

          <HowItWorkStep
            imageSrc="https://lottie.host/9becd689-df5d-41c1-8130-50fa0c7d6a76/X9QFVK5d2J.json"
            titleTransKey={translate("shareWithCustomers", $_, false)}
            subTitleTransKey={translate("shareBusinessDesc", $_, false)}
            stepNumber={3}
            withDivider={false}
          />
        </div>
      </div>
    </div>
  </div>
</section>
