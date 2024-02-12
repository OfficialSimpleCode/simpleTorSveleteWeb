<script lang="ts">
  import { businessStore } from "$lib/stores/Business";
  import { onMount } from "svelte";
  const changingImagesRatioX = 5;
  const changingImagesRatioY = 4;
  let changingImagesHeight: number = 150;

  onMount(() => {
    changingImagesHeight =
      window != null
        ? window.innerHeight * (changingImagesRatioY / changingImagesRatioX)
        : 150;
  });
</script>

<!-- widge screens  -->
<img
  class="md:h-1/2 w-full object-cover h-[{changingImagesHeight}px] min-h-[270px] hidden xs:block"
  src={$businessStore.design.changingImages[0]}
  alt="backgroud"
/>

<!-- small screens -->
<div class="relative xs:hidden">
  <img
    class="md:h-1/2 min-h-[270px] h-[{changingImagesHeight}px] w-full object-cover"
    src={$businessStore.design.changingImages[0]}
    alt="backgroud"
  />
  <div
    class="h-[50px] bg-gradient-to-b from-transparent via-base-100 to-base-100 absolute bottom-[-2px] w-full"
  ></div>
</div>
