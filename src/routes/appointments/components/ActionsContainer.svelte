<script lang="ts">
  import { Icon, type IconSource } from "svelte-hero-icons";

  export let icon: IconSource;
  export let text: string;
  export let onClick: () => void = () => {}; // Define the prop for onClick

  function handleClick() {
    if (onClick) {
      onClick();
    }
  }
</script>

<div
  class="flex flex-col justify-center items-center bg-slate-300 px-2 py-2 rounded-md"
>
  <Icon on:click={handleClick} src={icon} size="26px" />
  <p class="text-center">{text}</p>
</div>
