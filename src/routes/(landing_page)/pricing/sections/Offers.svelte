<script>
  import { _, translate } from "$lib/utils/translate";
  import PricingCard from "../components/PricingCard.svelte";
</script>

<section class="bg-base-200 pt-20">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-10 lg:px-6">
    <!-- title and sub title -->
    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
      <h1 class="mb-4 text-3xl md:text-4xl font-extrabold">
        {translate("pricingTitle", $_, false)}
      </h1>
      <div class="mb-5 sm:text-xl">
        <h2 class="opacity-70">
          {translate("pricingSubtitle", $_, false)}
        </h2>
        <!-- <span class="font-extrabold">המחירים הינם סופיים לתשלום לאחר מע״מ</span> -->
      </div>
    </div>
    <!-- items grid -->
    <div
      class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0"
    >
      <PricingCard
        title={translate("basic", $_, false)}
        sunTitle={translate("basicSubtitle", $_, false)}
        price={50.5}
        includesList={[
          "basicExplain1",
          "basicExplain2",
          "basicExplain7",
          "basicExplain8",
          "basicExplain4",
          "basicExplain9",
          "basicExplain3",
          "basicExplain5",
          "basicExplain6",
          "basicExplain11",
          "basicExplain10",
        ]}
      />
      <!-- Pricing Card -->
      <PricingCard
        title={translate("premium", $_, false)}
        sunTitle={translate("premiumSubtitle", $_, false)}
        price={68.9}
        bestSeller
        extraOverSub={translate("onBasic", $_, false)}
        includesList={[
          "preminumExplain2",
          "preminumExplain3",
          "preminumExplain4",
          "preminumExplain5",
          "preminumExplain6",
          "preminumExplain7",
          "preminumExplain1",
          "preminumExplain8",
          "preminumExplain9",
        ]}
      />
      <!-- Pricing Card -->
      <PricingCard
        title={translate("golden", $_, false)}
        sunTitle={translate("goldenSubtitle", $_, false)}
        price={205.9}
        extraOverSub={translate("onBasicAndPremium", $_, false)}
        includesList={[
          "goldenExplain1",
          "goldenExplain2",
          "goldenExplain3",
          "goldenExplain4",
          "goldenExplain5",
          "goldenExplain7",
          "goldenExplain6",
          "goldenExplain8",
          "goldenExplain9",
        ]}
      />
    </div>
  </div>
</section>
