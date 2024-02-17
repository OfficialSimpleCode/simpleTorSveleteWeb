<script>
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import {
    appFacebook,
    appInstagram,
    appLinkedin,
    simpleTorHomePage,
  } from "$lib/consts/app_external_links";
</script>

<nav class="md:place-self-center md:justify-self-end">
  <div class="grid grid-flow-col gap-4">
    <a target="_blank" href={simpleTorHomePage}>
      <GeneralIcon icon="mdi:web" size={36} hover={true} />
    </a>
    <a target="_blank" href={appInstagram}>
      <GeneralIcon icon="mdi:instagram" size={36} hover={true} />
    </a>
    <a target="_blank" href={appFacebook}
      ><GeneralIcon icon="mdi:facebook" size={36} hover={true} /></a
    >
    <a target="_blank" href={appLinkedin}
      ><GeneralIcon icon="mdi:linkedin" size={36} hover={true} /></a
    >
  </div>
</nav>
