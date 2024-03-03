<script lang="ts">
  export let mode: "light" | "dark" = "light";
  export let radius: number = 48;
</script>

<div style="width: {radius}px; height: {radius}px">
  {#if mode == "light"}
    <div
      class="h-full w-full bg-black flex items-center justify-center rounded-full"
    >
      <h3
        class="font-bold font-mono text-white text-center"
        class:text-lg={radius < 60}
        class:text-xl={radius < 80}
        class:text-2xl={radius < 120}
      >
        ST
      </h3>
    </div>
  {:else}
    <div
      class="h-full w-full bg-white flex items-center justify-center rounded-full"
      class:text-lg={radius < 60}
      class:text-xl={radius < 80}
      class:text-2xl={radius < 120}
    >
      <h3 class="text-lg font-bold font-mono text-black text-center">ST</h3>
    </div>
  {/if}
</div>
