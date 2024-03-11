<script lang="ts">
  import { onMount } from "svelte";
  import CustomArrow from "../custom_components/CustomArrow.svelte";

  export let autoScroll: boolean = false;
  export let interval: number = 20000; // in milliseconds
  export let vertical: boolean = false;
  export let showArrows: boolean = !autoScroll;
  let carousel: HTMLDivElement;

  function atEnd(): boolean {
    if (carousel == null) {
      return false;
    }
    return vertical
      ? carousel.scrollTop + carousel.clientHeight + 1 >= carousel.scrollHeight
      : carousel.scrollLeft * -1 + carousel.clientWidth + 1 >=
          carousel.scrollWidth;
  }

  function runAutoScroll() {
    let loop = setInterval(() => {
      if (carousel === null) {
        console.log("stoping auto scroll");
        clearInterval(loop);
      }

      if (atEnd()) {
        carousel.scrollTo(0, 0);
      } else {
        scroll(false);
      }
    }, interval);
  }

  if (autoScroll) {
    onMount(runAutoScroll);
  }

  function scroll(forward: boolean = true) {
    let modifier: number = forward ? 1 : -1;
    modifier = vertical ? modifier * -1 : modifier;
    if (carousel == null) {
      return;
    }
    if (!vertical) {
      let carouselWidth = carousel.clientWidth;
      carousel.scrollBy(carouselWidth * modifier, 0);
    } else {
      let carouselHeight = carousel.clientHeight;
      carousel.scrollBy(0, carouselHeight * modifier);
    }
  }

  function Next() {
    scroll();
  }

  function Back() {
    scroll(false);
  }
</script>

<div
  class="w-full flex flex-row {showArrows
    ? 'justify-between'
    : 'justify-center'} items-center"
>
  <button class="px-1 py-1 {showArrows ? 'block' : 'hidden'}" on:click={Next}>
    <CustomArrow left={true} />
  </button>
  <div
    bind:this={carousel}
    class="carousel items-center w-full"
    class:carousel-vertical={vertical}
  >
    <slot />
  </div>
  <button class="px-1 py-1 {showArrows ? 'block' : 'hidden'}" on:click={Back}>
    <CustomArrow />
  </button>
</div>
