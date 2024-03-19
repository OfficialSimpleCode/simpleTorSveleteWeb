<script>
  import { base } from "$app/paths";
  import NavberItem from "./NavberItem.svelte";
</script>

<div class="hidden lg:block">
  <NavberItem
    icon="solar:tag-price-bold"
    transKey="pricing"
    href={`${base}/pricing`}
  />
</div>
