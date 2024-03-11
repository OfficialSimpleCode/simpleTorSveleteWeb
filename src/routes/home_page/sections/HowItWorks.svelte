<script>
  import { _, translate } from "$lib/utils/translate";
  import HowItWorkStep from "../components/HowItWorkStep.svelte";
</script>

<div class="w-full bg-base-200">
  <div
    class="container mx-auto py-10 lg:py-28 flex flex-col items-center gap-16"
  >
    <!-- top section -->
    <div class="flex flex-col gap-16">
      <div class="flex flex-col gap-2 text-center">
        <!-- title -->
        <h2 class="mb-2 text-3xl lg:text-4xl">{translate("howItWork", $_)}</h2>

        <!-- sub title -->
        <!-- <p
          class="text-base font-medium leading-7 opacity-70 max-w-[700px] mx-3"
        >
          הפיכת העסק לאוטונומי ב 3 שלבים
        </p> -->
        <!-- <DownloadAppButton /> -->
      </div>
    </div>

    <!-- steps -->
    <div
      class="flex flex-col lg:flex-row 2xl:gap-x-20 xl:gap-x-10 md:gap-x-2 gap-x-5 gap-y-4 w-full justify-center px-3"
    >
      <HowItWorkStep
        imageSrc="https://lottie.host/f6698e26-fdce-4eb9-bb80-def9a8874750/OL8jB5DdGx.json"
        titleTransKey={translate("createAccount", $_, false)}
        stepNumber={1}
      />

      <HowItWorkStep
        imageSrc="https://lottie.host/daeffa4b-3884-476d-9e08-884b415465ad/uTx14abQ0f.json"
        titleTransKey={translate("createNewBusiness", $_, false)}
        stepNumber={2}
      />

      <HowItWorkStep
        imageSrc="https://lottie.host/9becd689-df5d-41c1-8130-50fa0c7d6a76/X9QFVK5d2J.json"
        titleTransKey={translate("shareWithCustomers", $_, false)}
        stepNumber={3}
        withArrow={false}
      />
    </div>
  </div>
</div>
