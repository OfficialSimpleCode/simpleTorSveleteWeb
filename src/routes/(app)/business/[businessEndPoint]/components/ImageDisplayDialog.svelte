<script lang="ts">
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import { ArrayCommands } from "$lib/consts/db";
  import UserHelper from "$lib/helpers/user/user_helper";
  import { userStore } from "$lib/stores/User";

  import { workersStore } from "$lib/stores/Workers.js";
  import { length } from "$lib/utils/core_utils";
  import { Icon, XCircle } from "svelte-hero-icons";

  export let dialog: HTMLDialogElement;
  export let workersStories: Record<string, StoryImageData>;
  export let storyId: string;
  let workerId = workersStories[storyId].workerId;

  function isLast(storyId: string): boolean {
    return (
      Array.from(Object.keys(workersStories)).indexOf(storyId) ==
      length(workersStories) - 1
    );
  }

  function isFirst(storyId: string): boolean {
    return Array.from(Object.keys(workersStories)).indexOf(storyId) == 0;
  }

  function getNext(storyIdTemp: string) {
    let index = Array.from(Object.keys(workersStories)).indexOf(storyIdTemp);
    let nextIndex = (index += 1);
    storyId = Array.from(Object.keys(workersStories))[nextIndex];
    workerId = workersStories[storyId].workerId;
  }

  function getBefore(storyIdTemp: string) {
    let index = Array.from(Object.keys(workersStories)).indexOf(storyIdTemp);
    let nextIndex = (index -= 1);
    storyId = Array.from(Object.keys(workersStories))[nextIndex];
    workerId = workersStories[storyId].workerId;
  }

  function handleHeartClick(storyId: string) {
    UserHelper.GI().addOrRemoveLikeForStoryImage(
      storyId,
      workersStories[storyId].workerId,
      $userStore.id,
      $userStore.storyLikes.includes(storyId)
        ? ArrayCommands.remove
        : ArrayCommands.add
    );
  }
</script>

<dialog
  bind:this={dialog}
  class="modal modal-middle"
  on:close={() => history.back()}
>
  <div
    class="modal-box bg-base-200 p-0 h-[70%] xs:h-[90%] max-h-[700px] sm:w-[520px] overflow-hidden"
  >
    <button
      class="sm:hidden text-white absolute right-4 top-4"
      on:click={() => dialog.close()}
    >
      <Icon src={XCircle} size="30px" />
    </button>
    <img
      class="object-cover h-full w-full rounded-xl"
      src={workersStories[storyId].imageUrl}
      alt="showcase"
    />
    {#if (document.dir === "rtl" && !isFirst(storyId)) || (document.dir === "ltr" && !isLast(storyId))}
      <button
        id={document.dir === "ltr" ? "right" : "left"}
        class="absolute top-[50%] right-3 text-white"
        on:click={() =>
          document.dir === "rtl" ? getBefore(storyId) : getNext(storyId)}
      >
        <div class="h-4"></div>
        <CustomCircleIcon icon="mdi:keyboard-arrow-right" size="xs" />
        <div class="h-4"></div>
      </button>
    {/if}
    {#if (document.dir === "rtl" && !isLast(storyId)) || (document.dir === "ltr" && !isFirst(storyId))}
      <button
        id={document.dir === "rtl" ? "left" : "right"}
        class="absolute top-[50%] left-3 text-white"
        on:click={() =>
          document.dir === "rtl" ? getNext(storyId) : getBefore(storyId)}
      >
        <div class="h-4"></div>

        <CustomCircleIcon icon="mdi:keyboard-arrow-left" size="xs" />

        <div class="h-4"></div>
      </button>
    {/if}
    <button
      class="absolute bottom-4 right-4 h-8 w-16 rounded-3xl bg-base-200 flex justify-center items-center"
      on:click={() => handleHeartClick(storyId)}
    >
      <div class="flex flex-row gap-1">
        {$workersStore[workerId].storylikesAmount[storyId] ?? 0}

        {#if $userStore.storyLikes.includes(storyId)}
          <GeneralIcon icon="twemoji:red-heart" />
        {:else}
          <GeneralIcon icon="ph:heart" />
        {/if}
      </div>
    </button>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
