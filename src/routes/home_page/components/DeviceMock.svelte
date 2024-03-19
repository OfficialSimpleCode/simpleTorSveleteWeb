<script lang="ts">
  import { onMount } from "svelte";
  export let mediaSrc: string; // imageDiv
  export let uuid: string;
  let isLoading = true;
  onMount(() => {
    const dynamicDiv = document.getElementById(uuid);
    const width = dynamicDiv?.offsetWidth;

    if (width !== null && width! < 250) {
      dynamicDiv?.classList.remove(`rounded-[39px]`);
      dynamicDiv?.classList.add(`rounded-[27px]`);
      document
        .getElementById(`${uuid}Images`)
        ?.classList.remove(`rounded-[30px]`);
      document.getElementById(`${uuid}Images`)?.classList.add(`rounded-[18px]`);
    }
  });

  function changeIsReady() {
    isLoading = true;
  }
</script>

<div
  id={uuid}
  class="
        flex flex-col justify-center items-center
        relative mx-auto border-gray-800 dark:border-black bg-gray-800 border-[8px] rounded-[39px] aspect-[9/18] shadow-xl"
>
  <!-- <div
          class="w-[115%] aspect-[50/18] top-[22%] rounded-b-[.8rem] left-1/2 -translate-x-1/2 absolute bg-green-400 opacity-20"
        >
          <div
            class=" aspect-[3/46] h-[80%] absolute rounded-s-lg bg-yellow-500"
          >
            vevew
          </div>
        </div> -->

  <div
    class="w-[39.4%] aspect-[118/22] bg-black top-[-.8px] rounded-b-[.8rem] left-1/2 -translate-x-1/2 absolute"
  ></div>
  <div
    class="h-[8%] aspect-[3/46] bg-black absolute -start-[11px] top-[22%] rounded-s-lg"
  ></div>
  <div
    class="h-[8%] aspect-[3/46] bg-black absolute -start-[11px] top-[31%] rounded-s-lg"
  ></div>
  <div
    class="h-[11%] aspect-[3/64] bg-black absolute -end-[11px] top-[25%] rounded-e-lg"
  ></div>
  <div
    id={`${uuid}Images`}
    class="rounded-[30px] overflow-hidden aspect-[272/572] bg-white dark:bg-black"
  >
    {#key mediaSrc}
      <video
        id={mediaSrc}
        placeholder="nvdoisvoidsnvoids"
        autoplay
        muted
        loop
        playsinline
        class="object-cover"
        on:load={changeIsReady}
      >
        <source src={mediaSrc} type="video/mp4" />
        <track kind="captions" /></video
      >
    {/key}
    <div
      class="p-10 w-full felx justify-center items-center mx-auto {!isLoading
        ? 'hidden'
        : 'block'}"
    >
      Loading...
    </div>
  </div>
</div>
