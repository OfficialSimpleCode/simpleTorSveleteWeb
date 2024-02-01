<script lang="ts">
    import { Icon, ChevronRight, ChevronLeft } from "svelte-hero-icons";

    export let vertical: boolean = false;
    let carousel: HTMLDivElement;

    function scroll(forward: boolean = true) {
        let modifier: number = forward ? 1 : -1;
        if (!vertical) {
            let carouselWidth = carousel.clientWidth;
            console.log(carouselWidth);
            carousel.scrollBy(carouselWidth * modifier, 0);
        } else {
            let carouselHeight = carousel.clientHeight;
            console.log(carouselHeight);
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

<div class="max-w-[300px] relative">
    <button class="absolute top-[50%] right-3 text-white" on:click={Next}>
        <div class="h-4"></div>
        <Icon src={ChevronRight} size="36px" />
        <div class="h-4"></div>
    </button>
    <button class="absolute top-[50%] left-3 text-white" on:click={Back}>
        <div class="h-4"></div>
        <Icon src={ChevronLeft} size="36px" />
        <div class="h-4"></div>
    </button>
    <div
        bind:this={carousel}
        class="carousel"
        class:carousel-vertical={vertical}
    >
        <slot />
    </div>
</div>
