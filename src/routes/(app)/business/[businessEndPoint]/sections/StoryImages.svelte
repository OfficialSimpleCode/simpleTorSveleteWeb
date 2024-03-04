<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/stores";
  import BusinessInitializer from "$lib/initializers/business_initializer";
  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers.js";
  import { isNotEmpty } from "$lib/utils/core_utils";
  import { _, translate } from "$lib/utils/translate";
  import ImageDisplayDialog from "../components/ImageDisplayDialog.svelte";

  let workersStories: Record<string, StoryImageData> = {};
  let selectedStoryId: string = "";

  workersStore.subscribe((workers) => {
    workersStories = {};
    Object.values(workers).forEach((worker) => {
      Object.entries(worker.storyImages).forEach(([imageId, image]) => {
        workersStories[imageId] = { imageUrl: image, workerId: worker.id };
      });
    });
    selectedStoryId = Object.keys(workersStories)[0] || "";
  });

  let imageDisplayDialog: HTMLDialogElement;

  function openImageDisplayDialog(imageId: string) {
    BusinessInitializer.GI().loadLikes(workersStories);
    selectedStoryId = imageId;
    pushState("", {
      showModal: true,
    });
    setTimeout(() => imageDisplayDialog.showModal(), 100);
  }
</script>

<!-- Dialogs -->
{#if $page.state.showModal}
  <ImageDisplayDialog
    bind:dialog={imageDisplayDialog}
    bind:storyId={selectedStoryId}
    {workersStories}
  />
{/if}

{#if Object.keys(workersStories).length > 0}
  <div
    class="mt-10 md:mt-0 {isNotEmpty($businessStore?.design.products ?? {})
      ? 'bg-base-200'
      : 'bg-base-300'} w-full pb-14 px-2 pt-10 xs:px-16"
  >
    <h2 class="text-center font-bold text-2xl pb-6">
      {$businessStore?.design.storyTitle ?? ""
        ? $businessStore?.design.storyTitle ?? ""
        : translate("myWorks", $_).replaceAll(":", "")}
    </h2>
    <div
      class="w-full self-center flex items-center mt-1 justify-center xs:gap-6 gap-4 flex-wrap"
    >
      {#each Object.entries(workersStories) as [storyId, imageData]}
        <button on:click={() => openImageDisplayDialog(storyId)}>
          <!-- h-[${storyImagesHeigth}px] w-[${storyImagesWidth}px] -->
          <img
            class="object-cover md:h-[530px] md:w-[300px] h-[284px] w-[160px] rounded-xl hover:scale-[1.01]"
            src={imageData.imageUrl}
            alt={translate("businessWork", $_)}
          />
        </button>
      {/each}
    </div>
  </div>
{/if}
