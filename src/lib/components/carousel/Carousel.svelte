<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronLeft, ChevronRight, Icon } from "svelte-hero-icons";

  export let autoScroll: boolean = false;
  export let interval: number = 20000; // in milliseconds
  export let vertical: boolean = false;
  export let showArrows: boolean = !autoScroll;
  let carousel: HTMLDivElement;

  function atEnd(): boolean {
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

<div class="w-full flex flex-row justify-between items-center">
  <button class="px-1 py-1{showArrows ? 'block' : 'hidden'}" on:click={Next}>
    <Icon src={ChevronRight} size="24px" />
  </button>
  <div
    bind:this={carousel}
    class="carousel items-center"
    class:carousel-vertical={vertical}
  >
    <slot />
  </div>
  <button class="px-2 py-1 {showArrows ? 'block' : 'hidden'}" on:click={Back}>
    <Icon src={ChevronLeft} size="24px" />
  </button>
</div>
