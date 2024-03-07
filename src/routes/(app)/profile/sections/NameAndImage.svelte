<script lang="ts">
  import Avatar from "$lib/components/Avatar.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import { userStore } from "$lib/stores/User";
  import { imageByGender } from "$lib/utils/images_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { translate } from "$lib/utils/translate";
  export let shimmerEffect: boolean = false;
</script>

<section
  class="flex flex-col items-center {shimmerEffect ? 'animate-pulse' : ''}"
>
  {#if shimmerEffect}
    <div class="bg-base-200 h-[80px] w-[80px] rounded-full" />
  {:else}
    <Avatar small={true} ring={false} img={imageByGender($userStore.gender)} />
  {/if}

  {#if shimmerEffect}
    <div class="h-[19px] w-[100px] bg-base-200 {containerRadius} mt-3" />
    <div class="h-[13px] w-[130px] bg-base-200 {containerRadius} mt-2" />
  {:else}
    <h1 class="text-xl mt-3">{$userStore.name}</h1>
    <h2 class="text-sm text-gray-500">
      {translate("since")}: {dateToDateStr($userStore.createdAt)}
    </h2>
  {/if}
</section>
