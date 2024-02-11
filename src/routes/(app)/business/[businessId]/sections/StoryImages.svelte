<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/stores";
  import { workersStore } from "$lib/stores/Workers.js";
  import ImageDisplayDialog from "../components/ImageDisplayDialog.svelte";

  let workersStories: Record<string, string> = {};
  Object.values($workersStore).forEach((worker) => {
    Object.entries(worker.storyImages).forEach(([imageId, image]) => {
      workersStories[imageId] = image;
    });
  });

  let storyHearts: Map<string, number> = Object.values($workersStore)
    .map((w) => w.storylikesAmount)
    .reduce(
      (result, currentMap) =>
        new Map([...result, ...Object.entries(currentMap)]),
      new Map()
    );

  let imageDisplayDialog: HTMLDialogElement;
  let selectedStoryId: string = Object.keys(workersStories)[0] || "";

  function openImageDisplayDialog(storyId: string) {
    selectedStoryId = storyId;
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

<div class="mt-10 bg-base-200 w-full pb-14 px-2 pt-10 xs:px-16">
  <h1 class="text-center font-bold text-2xl pb-6">Our Works</h1>
  <div
    class="w-full self-center flex items-center mt-1 justify-center xs:gap-6 gap-4 flex-wrap"
  >
    {#each Object.entries(workersStories) as [storyId, image]}
      <button on:click={() => openImageDisplayDialog(storyId)}>
        <!-- h-[${storyImagesHeigth}px] w-[${storyImagesWidth}px] -->
        <img
          class="object-cover md:h-[530px] md:w-[300px] h-[284px] w-[160px] rounded-xl hover:scale-[1.01]"
          src={image}
          alt="gym"
        />
      </button>
    {/each}
  </div>
</div>
