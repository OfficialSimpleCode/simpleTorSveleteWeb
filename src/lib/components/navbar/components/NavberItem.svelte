<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import { _, translate } from "$lib/utils/translate";

  export let transKey: string;
  export let icon: string;
  export let href: string | undefined = undefined;
  export let active: boolean = true;
  export let handleClick: () => void = () => {};
</script>

{#if href != null}
  <a
    class="flex flex-row btn btn-ghost btn-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary {active
      ? ''
      : 'opacity-60'}"
    {href}
  >
    <p class="capilize text-sm">{translate(transKey, $_)}</p>
    <div class="text-base-content">
      <GeneralIcon {icon} size={20} />
    </div>
  </a>
{:else}
  <button
    class="flex flex-row btn btn-ghost btn-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary {active
      ? ''
      : 'opacity-60'}"
    on:click={handleClick}
  >
    <p class="capilize text-sm">
      {translate(transKey, $_)}
    </p>
    <div class="text-base-content">
      <GeneralIcon {icon} size={20} />
    </div>
  </button>
{/if}
