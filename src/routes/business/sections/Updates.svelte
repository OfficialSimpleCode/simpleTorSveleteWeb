<script lang="ts">
  import Carousel from "$lib/components/carousel/Carousel.svelte";
  import CarouselItem from "$lib/components/carousel/CarouselItem.svelte";
  import { Update } from "$lib/models/business/update_model";
  import { businessStore } from "$lib/stores/Business";
  import { _, translate } from "$lib/utils/translate";

  const businessUpdates: Map<string, Update> = $businessStore.design.updates;
</script>

<div class="flex items-center justify-center text-center py-2 bg-base-200">
  <Carousel autoScroll={true} interval={3500} showArrows={true}>
    {#each businessUpdates as [id, update]}
      <CarouselItem>
        <div
          class="flex h-[200px] flex-col justify-center items-center w-full relative"
        >
          <h1 class="absolute top-1 text-xl">{update.title}</h1>
          <p>{update.content}</p>
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
