<script lang="ts">
  import { businessesData } from "$lib/consts/home_page_data";
  import BusinessItem from "../components/BusinessItem.svelte";
</script>

<section class="bg-gradient-to-r from-base-200 py-10 lg:py-28">
  <!-- title and sub-title -->
  <div class="flex flex-col justify-center items-center">
    <h2 class="text-2xl font-bold text-center sm:text-4xl">הדבר האמיתי</h2>
    <!-- sub title -->
    <p class="max-w-3xl mx-auto mt-4 text-center opacity-70">
      לחץ על העסקים השונים וקבל השראה לדף שלך
    </p>
  </div>

  <!-- business items -->
  <div class="flex flex-col">
    <div id="images" class="py-10 w-full sm:flex justify-end">
      <!-- items grid inside the list (The businesses) -->
      <div
        class=" mx-auto grid grid-cols-1 gap-10 py-3 xs:px-5 px-2 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[1800px]"
      >
        {#each businessesData as businessData}
          <BusinessItem {businessData} />
        {/each}
      </div>
    </div>
  </div>
</section>
