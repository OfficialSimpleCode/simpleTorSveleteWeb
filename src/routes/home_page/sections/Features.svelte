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
      <!-- preview text -->
      <!-- <span
        class="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider"
      >
        למה דווקא אנחנו
      </span> -->

      <!-- title -->
      <h2 class="block w-full bg-gradient-to-b text-3xl sm:text-4xl">
        {translate("mainFeatures", $_)}
      </h2>

      <!-- sub title -->
      <p
        class="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide opacity-70"
      >
        {translate("mainFeaturesDesc", $_)}
      </p>
    </div>

    <!-- features items -->
    <div
      class="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      <FeatureItem
        bg="bg-pink-500"
        icon="mdi:card-account-details-star"
        titleTransKey={translate("personalBranding", $_)}
        subTitleTransKey={translate("personalBrandinDesc", $_)}
      />

      <FeatureItem
        bg="bg-green-500"
        icon="mdi:sms"
        titleTransKey={translate("clientsMessage", $_)}
        subTitleTransKey={translate("clientsMessagesDesc", $_)}
      />

      <FeatureItem
        bg="bg-blue-500"
        icon="mdi:electron-framework"
        titleTransKey={translate("availabilityEverywhere", $_)}
        subTitleTransKey={translate("availabilityEverywhereDesc", $_)}
      />

      <FeatureItem
        bg="bg-indigo-700"
        icon="mdi:database"
        titleTransKey={translate("clients", $_)}
        subTitleTransKey={translate("clientsDesc", $_)}
      />

      <FeatureItem
        bg="bg-red-500"
        icon="mdi:payment"
        titleTransKey={translate("cleranceAndrecipts", $_)}
        subTitleTransKey={translate("cleranceAndreciptsDesc", $_)}
      />

      <FeatureItem
        bg="bg-yellow-500"
        icon="mdi:support"
        titleTransKey={translate("support", $_)}
        subTitleTransKey={translate("supportDesc", $_)}
      />
    </div>
  </div>
</section>
