<script lang="ts">
  import { Icon, type IconSource } from "svelte-hero-icons";

  export let icon: IconSource;
  export let text: string;
  export let onClick: () => void = () => {}; // Define the prop for onClick
  export let bgColor: string = "bg-base-300";

  function handleClick() {
    if (onClick) {
      onClick();
    }
  }
</script>

<div
  class="flex flex-col justify-center items-center {bgColor} py-2 px-2 rounded-lg max-w-40 lg:max-w-60"
>
  <Icon on:click={handleClick} src={icon} size="26px" />
  <p class="text-center">{text}</p>
</div>
