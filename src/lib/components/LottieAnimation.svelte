<script lang="ts">
  import { onMount } from "svelte";
  export let animationFile: string;
  export let height: number = 250;
  export let width: number = 250;
  export let loop: boolean = false;

  let animationContainer: HTMLElement;
  onMount(async () => {
    const lottie = (await import("lottie-web")).default;
    lottie.loadAnimation({
      container: animationContainer,
      path: animationFile,
      autoplay: true,
      loop: loop,
    });
  });
</script>

<div bind:this={animationContainer} class="h-[{height}px] w-[{width}px]" />
