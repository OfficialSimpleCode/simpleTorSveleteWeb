<script lang="ts">
  import { cssSizesClasses } from "$lib/consts/css_classes";
  import { onMount } from "svelte";
  export let animationFile: string;
  export let size:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xl2"
    | "xl3"
    | "xl4"
    | "xl5" = "lg";

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

<div bind:this={animationContainer} class={cssSizesClasses[size].cssClass} />
