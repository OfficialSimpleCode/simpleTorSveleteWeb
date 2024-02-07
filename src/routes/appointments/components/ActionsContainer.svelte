<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";

  export let icon: string;
  export let text: string;
  export let loading: boolean = false;
  export let onClick: () => void = () => {}; // Define the prop for onClick
  export let bgColor: string = "bg-base-300";

  function handleClick() {
    if (onClick) {
      onClick();
    }
  }
</script>

<button on:click={handleClick}>
  <div
    class="flex flex-col justify-center items-center {bgColor} py-2 px-2 rounded-lg max-w-40 lg:max-w-60"
  >
    {#if loading}
      <div class="loading loading-spinner"></div>
    {:else}
      <GeneralIcon {icon}></GeneralIcon>
    {/if}

    <p class="text-center">{text}</p>
  </div>
</button>
