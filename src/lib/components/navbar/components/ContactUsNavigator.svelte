<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  import NavberItem from "./NavberItem.svelte";
  export let fromMenu: boolean = false;
  $: insideBusiness = $page.url.pathname.includes("business") && false;
</script>

<div
  class="{insideBusiness ? 'hidden' : ''} {fromMenu || insideBusiness
    ? ''
    : 'hidden lg:block'}"
>
  <NavberItem
    {fromMenu}
    icon="grommet-icons:contact"
    transKey="contactUs"
    href={`${base}/contact-us`}
  />
</div>
