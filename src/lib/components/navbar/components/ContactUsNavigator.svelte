<script>
  import { base } from "$app/paths";

  import NavberItem from "./NavberItem.svelte";
</script>

<div class="hidden lg:block">
  <NavberItem
    icon="grommet-icons:contact"
    transKey="contactUs"
    href={`${base}/contact-us`}
  />
</div>
