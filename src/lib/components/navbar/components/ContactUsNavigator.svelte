<script lang="ts">
  import { base } from "$app/paths";

  import NavberItem from "./NavberItem.svelte";
  export let fromMenu: boolean = false;
</script>

<div class={fromMenu ? "" : "hidden lg:block"}>
  <NavberItem
    {fromMenu}
    icon="grommet-icons:contact"
    transKey="contactUs"
    href={`${base}/contact-us`}
  />
</div>
