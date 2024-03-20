<script lang="ts">
  import { base } from "$app/paths";
  import NavberItem from "./NavberItem.svelte";
  export let fromMenu: boolean = false;
</script>

<div class={fromMenu ? "" : "hidden lg:block"}>
  <NavberItem
    icon="solar:tag-price-bold"
    transKey="pricing"
    {fromMenu}
    href={`${base}/pricing`}
  />
</div>
