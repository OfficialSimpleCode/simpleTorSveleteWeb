<script lang="ts">
  import { containerRadius } from "$lib/consts/sizes";
  import { Tooltip } from "flowbite-svelte";
  import { Icon, InformationCircle } from "svelte-hero-icons";
  export let message: string;
  let placement = "left";
</script>

<button class="hover:opacity-70" on:mouseenter={() => (placement = "left")}>
  <Icon src={InformationCircle} size="26px" />
</button>

<Tooltip
  ><section class="bg-base-300 {containerRadius} ">
    <div class="flex flex-row gap-2 py-3 px-5 items-center justify-center">
      <h3 class="text-sm text-base-content">{message}</h3>
    </div>
  </section></Tooltip
>
