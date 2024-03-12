<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";

  export let icon: string;
  export let text: string;
  export let loading: boolean = false;
  export let onClick: () => void = () => {}; // Define the prop for onClick

  export let onLoad: () => void = () => {}; // Define the prop for onClick
  export let bgColor: string = "bg-base-300";
  export let active: boolean = false;
  export let href: string | undefined = undefined;

  function handleClick() {
    if (onClick) {
      onClick();
    }
  }
</script>

{#if href != null}
  <a on:click|stopPropagation={handleClick} on:load={onLoad} {href}>
    <div
      class="flex flex-col justify-center items-center {bgColor} py-2 px-2 rounded-lg min-w-24 lg:min-w-32 max-w-40 lg:max-w-60 w-full {active
        ? ''
        : 'opacity opacity-50'}"
    >
      {#if loading}
        <div class="loading loading-spinner"></div>
      {:else}
        <GeneralIcon {icon} />
      {/if}

      <p class="text-center text-wrap">{text}</p>
    </div>
  </a>
{:else}
  <button on:click|stopPropagation={handleClick}>
    <div
      class="flex flex-col justify-center items-center {bgColor} py-2 px-2 rounded-lg min-w-24 lg:min-w-32 max-w-40 lg:max-w-60 w-full {active
        ? ''
        : 'opacity opacity-50'}"
    >
      {#if loading}
        <div class="loading loading-spinner"></div>
      {:else}
        <GeneralIcon {icon} />
      {/if}

      <p class="text-center text-wrap">{text}</p>
    </div>
  </button>
{/if}
