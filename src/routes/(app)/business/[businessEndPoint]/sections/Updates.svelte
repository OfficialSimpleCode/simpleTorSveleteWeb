<script lang="ts">
  import Carousel from "$lib/components/carousel/Carousel.svelte";
  import CarouselItem from "$lib/components/carousel/CarouselItem.svelte";
  import { SubType } from "$lib/consts/purchases";
  import { containerRadius } from "$lib/consts/sizes";
  import { Update } from "$lib/models/business/update_model";
  import { businessStore, businessSubStore } from "$lib/stores/Business";
  import { isNotEmpty, length } from "$lib/utils/core_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { _, translate } from "$lib/utils/translate";
  let businessUpdates: Update[] = [];

  businessSubStore.subscribe((value) => {
    const businessDescriptionAsUpdate =
      $businessStore?.businessDescription != null &&
      $businessStore?.businessDescription != ""
        ? new Update(
            translate("onBusiness"),
            $businessStore?.businessDescription,
            "aboutBusiness",
            dateToDateStr(
              $businessStore.lastDateChangeBusinessDescription ??
                $businessStore.createdAt
            ),
            "0"
          )
        : undefined;
    if (value != null && value != SubType.basic) {
      businessUpdates =
        Object.values($businessStore?.design.updates ?? {}) ?? [];
    }
    if (businessDescriptionAsUpdate != null) {
      businessUpdates.push(businessDescriptionAsUpdate);
    }
  });
</script>

{#if isNotEmpty(businessUpdates)}
  <div
    class="flex items-center justify-center text-center xs:pt-5 md:my-20 mb-10"
  >
    <div
      class="flex items-center justify-center text-center py-2 bg-base-200 {containerRadius} max-w-[800px] w-full mx-6"
    >
      <Carousel
        autoScroll={true}
        interval={20000}
        showArrows={length(businessUpdates) > 1}
      >
        {#each Object.entries(businessUpdates) as [id, update]}
          <CarouselItem>
            <div
              class="flex h-[200px] flex-col justify-center items-center w-full relative px-2"
            >
              <h2 class="absolute top-1 text-xl">{update.title}</h2>
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
