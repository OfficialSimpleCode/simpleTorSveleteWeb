<script>
  import PricingCard from "../components/PricingCard.svelte";
</script>

<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
      <h2
        class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
      >
        Designed for business teams like yours
      </h2>
      <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
        Here at Flowbite we focus on markets where technology, innovation, and
        capital can unlock long-term value and drive economic growth.
      </p>
    </div>
    <!-- items grid -->
    <div
      class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0"
    >
      <PricingCard
        title="בסיסי"
        sunTitle=""
        price={59}
        includesList={[
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
        ]}
      />
      <!-- Pricing Card -->
      <PricingCard
        title="בסיסי"
        sunTitle=""
        price={59}
        includesList={[
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
        ]}
      />
      <!-- Pricing Card -->
      <PricingCard
        title="בסיסי"
        sunTitle=""
        price={59}
        includesList={[
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
          "dsacs",
        ]}
      />
    </div>
  </div>
</section>
