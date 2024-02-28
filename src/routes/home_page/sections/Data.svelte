<script>
  import { _, translate } from "$lib/utils/translate";
  import DataItem from "../components/DataItem.svelte";
</script>

<section class="bg-base-100">
  <div id="features" class="relative px-10 md:px-10 py-10 lg:py-28">
    <!-- top text -->
    <div class="relative mx-auto max-w-5xl text-center">
      <!-- preview text -->
      <!-- <span
          class="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider"
        >
          למה דווקא אנחנו
        </span> -->

      <!-- title -->
      <h2 class="block w-full text-3xl sm:text-4xl">
        {translate("storesStars", $_)}
      </h2>

      <!-- sub title -->
      <p
        class="mx-auto my-4 w-full max-w-xl text-center font-medium leading-relaxed tracking-wide opacity-70"
      >
        {translate("stableSystem", $_)}
      </p>
    </div>

    <!-- features items -->
    <div
      class="relative mx-auto max-w-7xl z-10 grid gap-10 pt-14 grid-cols-2 lg:grid-cols-4"
    >
      <DataItem
        titleTransKey="1M+"
        subTitleTransKey={translate("differentBookings", $_)}
      />
      <DataItem
        titleTransKey="10K+"
        subTitleTransKey={translate("businessesSearch", $_)}
      />
      <DataItem
        titleTransKey="38"
        subTitleTransKey={translate("categories", $_)}
      />
      <DataItem
        titleTransKey="5"
        subTitleTransKey={translate("storesStars", $_)}
      />
    </div>
  </div>
</section>
