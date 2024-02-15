<script lang="ts">
  import Carousel from "$lib/components/carousel/Carousel.svelte";
  import CarouselItem from "$lib/components/carousel/CarouselItem.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import { Update } from "$lib/models/business/update_model";
  import { businessStore } from "$lib/stores/Business";
  import { _, translate } from "$lib/utils/translate";

  const businessUpdates: Map<string, Update> = $businessStore.design.updates;
</script>

{#if businessUpdates.size > 0}
  <div class="flex items-center justify-center text-center xs:pt-5">
    <div
      class="flex items-center justify-center text-center py-2 bg-base-200 {containerRadius} max-w-[800px] w-full mx-6"
    >
      <Carousel
        autoScroll={true}
        interval={20000}
        showArrows={$businessStore.design.updates.size > 1}
      >
        {#each businessUpdates as [id, update]}
          <CarouselItem>
            <div
              class="flex h-[200px] flex-col justify-center items-center w-full relative px-2"
            >
              <h1 class="absolute top-1 text-xl">{update.title}</h1>
              <p class="max-w-[500px] bg-green">
                {update.content}
              </p>
              <p class="absolute bottom-1 text-sm opacity-55">
                {update.lastModified !== ""
                  ? `${translate("lastChange", $_)} ${update.lastModified}`
                  : ""}
              </p>
            </div>
          </CarouselItem>
        {/each}
      </Carousel>
    </div>
  </div>
{/if}
