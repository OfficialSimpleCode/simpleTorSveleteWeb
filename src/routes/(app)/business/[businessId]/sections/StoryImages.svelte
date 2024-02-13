<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/stores";
  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers.js";
  import { _, translate } from "$lib/utils/translate";
  import ImageDisplayDialog from "../components/ImageDisplayDialog.svelte";

  let workersStories: Record<string, StoryImageData> = {};
  let storyHearts: Record<string, number> = {};

  workersStore.subscribe((workers) => {
    workersStories = {};
    storyHearts = {};
    Object.values(workers).forEach((worker) => {
      Object.entries(worker.storyImages).forEach(([imageId, image]) => {
        workersStories[imageId] = { imageUrl: image, workerId: worker.id };
      });
    });
    Object.values(workers).forEach((worker) => {
      Object.entries(worker.storylikesAmount).forEach(([imageId, amount]) => {
        storyHearts[imageId] = amount;
      });
    });
  });

  let imageDisplayDialog: HTMLDialogElement;
  let selectedStoryId: string = Object.keys(workersStories)[0] || "";

  function openImageDisplayDialog(imageId: string) {
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
    {storyHearts}
  />
{/if}

{#if Object.keys(workersStories).length > 0}
  <div class="mt-10 bg-base-200 w-full pb-14 px-2 pt-10 xs:px-16">
    <h1 class="text-center font-bold text-2xl pb-6">
      {$businessStore.design.storyTitle
        ? $businessStore.design.storyTitle
        : translate("myWorks", $_).replaceAll(":", "")}
    </h1>
    <div
      class="w-full self-center flex items-center mt-1 justify-center xs:gap-6 gap-4 flex-wrap"
    >
      {#each Object.entries(workersStories) as [storyId, imageData]}
        <button on:click={() => openImageDisplayDialog(storyId)}>
          <!-- h-[${storyImagesHeigth}px] w-[${storyImagesWidth}px] -->
          <img
            class="object-cover md:h-[530px] md:w-[300px] h-[284px] w-[160px] rounded-xl hover:scale-[1.01]"
            src={imageData.imageUrl}
            alt="gym"
          />
        </button>
      {/each}
    </div>
  </div>
{/if}
