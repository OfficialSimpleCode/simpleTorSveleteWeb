<script>
  import { _, translate } from "$lib/utils/translate";
  import InfoItem from "../components/InfoItem.svelte";
</script>

<section class="bg-base-100">
  <div class="container px-6 py-12 mx-auto">
    <!-- title and sub title -->
    <div>
      <h2 class="mt-2 text-2xl md:text-3xl">
        {translate("goodToKnow", $_, false)}
      </h2>

      <h3 class="mt-1 opacity-70">
        {translate("goodToKnowSubtitle", $_, false)}
      </h3>
    </div>

    <!-- info items -->
    <div
      class="grid grid-cols-1 xs:gap-8 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <InfoItem
        title={translate("infoItem1", $_, false)}
        subTitle={translate("infoItemExplain1", $_, false)}
        icon="clarity:employee-group-line"
        bg="bg-red-500"
      />
      <InfoItem
        title={translate("infoItem2", $_, false)}
        subTitle={translate("infoItemExplain2", $_, false)}
        icon="fluent:payment-20-filled"
        bg="bg-purple-500"
      />
      <InfoItem
        title={translate("infoItem3", $_, false)}
        subTitle={translate("infoItemExplain3", $_, false)}
        icon="streamline:payment-cash-out-3"
        bg="bg-green-500"
      />
      <InfoItem
        title={translate("infoItem4", $_, false)}
        subTitle={translate("infoItemExplain4", $_, false)}
        icon="mdi:book-multiple"
        bg="bg-blue-500"
      />
      <InfoItem
        title={translate("infoItem5", $_, false)}
        subTitle={translate("infoItemExplain5", $_, false)}
        icon="f7:gift-fill"
        bg="bg-pink-500"
      />
      <InfoItem
        title={translate("infoItem6", $_, false)}
        subTitle={translate("infoItemExplain6", $_, false)}
        icon="ri:contract-fill"
        bg="bg-yellow-500"
      />
      <InfoItem
        title={translate("infoItem7", $_, false)}
        subTitle={translate("infoItemExplain7", $_, false)}
        icon="ic:baseline-message"
        bg="bg-teal-500"
      />
      <InfoItem
        title={translate("infoItem8", $_, false)}
        subTitle={translate("infoItemExplain8", $_, false)}
        icon="material-symbols:request-quote-outline"
        bg="bg-orange-400"
      />
    </div>
  </div>
</section>
