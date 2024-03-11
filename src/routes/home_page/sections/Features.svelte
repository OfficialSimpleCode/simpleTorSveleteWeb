<script>
  import { _, translate } from "$lib/utils/translate";
  import FeatureItem from "../components/FeatureItem.svelte";
</script>

<section class="bg-base-100">
  <div
    id="features"
    class="relative block px-6 py-10 lg:py-28 md:py-10 md:px-10 bg-base-100"
  >
    <!-- top text -->
    <div class="relative mx-auto max-w-5xl text-center">
      <!-- title -->
      <h2 class="block w-full bg-gradient-to-b text-3xl sm:text-4xl">
        {translate("mainFeatures", $_, false)}
      </h2>

      <!-- sub title -->
      <p
        class="mx-auto my-4 w-full max-w-xl bg-transparent text-center opacity-70"
      >
        {translate("mainFeaturesDesc", $_, false)}
      </p>
    </div>

    <!-- features items -->
    <div
      class="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      <FeatureItem
        bg="bg-pink-500"
        icon="mdi:card-account-details-star"
        titleTransKey={translate("personalBranding", $_, false)}
        subTitleTransKey={translate("personalBrandinDesc", $_, false)}
        secondSubTitleTransKey={translate("personalBrandinDesc2", $_, false)}
      />

      <FeatureItem
        bg="bg-green-500"
        icon="mdi:sms"
        titleTransKey={translate("clientsMessage", $_, false)}
        subTitleTransKey={translate("clientsMessagesDesc", $_, false)}
        secondSubTitleTransKey={translate("clientsMessagesDesc2", $_, false)}
      />

      <FeatureItem
        bg="bg-blue-500"
        icon="mdi:electron-framework"
        titleTransKey={translate("availabilityEverywhere", $_, false)}
        subTitleTransKey={translate("availabilityEverywhereDesc", $_, false)}
        secondSubTitleTransKey={translate(
          "availabilityEverywhereDesc2",
          $_,
          false
        )}
      />

      <FeatureItem
        bg="bg-indigo-700"
        icon="mdi:database"
        titleTransKey={translate("clients", $_, false)}
        subTitleTransKey={translate("clientsDesc", $_, false)}
        secondSubTitleTransKey={translate("clientsDesc2", $_, false)}
      />

      <FeatureItem
        bg="bg-red-500"
        icon="mdi:payment"
        titleTransKey={translate("cleranceAndrecipts", $_, false)}
        subTitleTransKey={translate("cleranceAndreciptsDesc", $_, false)}
        secondSubTitleTransKey={translate("cleranceAndreciptsDesc2", $_, false)}
      />

      <FeatureItem
        bg="bg-yellow-500"
        icon="mdi:support"
        titleTransKey={translate("support", $_)}
        subTitleTransKey={translate("supportDesc", $_)}
        secondSubTitleTransKey={translate("supportDesc2", $_)}
      />
    </div>
  </div>
</section>
