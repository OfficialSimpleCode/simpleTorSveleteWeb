<script lang="ts">
    import { onMount } from "svelte";
    import { Icon, ChevronRight, ChevronLeft } from "svelte-hero-icons";

    export let autoScroll: boolean = false;
    export let interval: number = 3000;
    export let vertical: boolean = false;
    export let showArrows: boolean = !autoScroll;
    let carousel: HTMLDivElement;

    function atEnd(): boolean {
        return vertical
            ? carousel.scrollTop + carousel.clientHeight + 1 >=
                  carousel.scrollHeight
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

<div class="h-[500px] max-w-[300px] relative">
    {#if showArrows}
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
    {/if}
    <div
        bind:this={carousel}
        class="carousel h-full w-full"
        class:carousel-vertical={vertical}
    >
        <slot />
    </div>
</div>
