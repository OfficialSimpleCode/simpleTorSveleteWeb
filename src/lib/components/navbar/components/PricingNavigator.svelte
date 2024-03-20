<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import NavberItem from "./NavberItem.svelte";
  export let fromMenu: boolean = false;
  $: insideBusiness = $page.url.pathname.includes("business");
</script>

<div
  class="{insideBusiness ? 'hidden' : ''} {fromMenu || insideBusiness
    ? ''
    : 'hidden lg:block'} "
>
  <NavberItem
    icon="solar:tag-price-bold"
    transKey="pricing"
    {fromMenu}
    href={`${base}/pricing`}
  />
</div>
