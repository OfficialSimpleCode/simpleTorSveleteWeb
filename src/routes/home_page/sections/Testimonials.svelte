<script lang="ts">
  import { reviews } from "$lib/consts/home_page_data";
  import ArrowContainer from "../components/ArrowContainer.svelte";
  import ReviewContanier from "../components/ReviewContanier.svelte";

  $: itemToDisplay = 0;
  reviews;
  function forwords() {
    itemToDisplay += 1;
  }

  function backwords() {
    if (itemToDisplay === 0) {
      itemToDisplay = reviews.length - 1;
    } else {
      itemToDisplay -= 1;
    }
  }
</script>

<section
  class="pb-24 pt-10 lg:pt-0 bg-base-100 flex flex-col justify-center items-center"
>
  <div
    class="flex justify-centeitems-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 sm:max-w-2xl lg:max-w-[1200px] mx-4"
  >
    <div class="w-full lg:w-2/5">
      <!-- section title -->
      <span
        class="text-sm opacity-70 mb-4 lg:block lg:text-start text-center hidden"
        >הלקוחות שלנו</span
      >
      <!-- title -->
      <h2 class="text-4xl leading-[3.25rem] mb-8 lg:text-start text-center">
        50 שניות בממוצע למענה <span class="text-primary">מהתמיכה</span>
      </h2>

      <!-- Slider controls (arrows) -->
      <div class="flex items-center gap-4 lg:justify-start justify-center">
        <!--  -->
        <ArrowContainer onButtonClick={backwords} isBackwords={true} />
        <ArrowContainer onButtonClick={forwords} />
      </div>
    </div>

    <!-- reviews -->
    <div class="w-full lg:w-3/5">
      <!--Slider wrapper-->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <ReviewContanier reviewItem={reviews[itemToDisplay % reviews.length]} />
        <ReviewContanier
          reviewItem={reviews[(itemToDisplay + 1) % reviews.length]}
        />
      </div>
    </div>
  </div>
</section>
