<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import {
    appFacebook,
    appInstagram,
    appLinkedin,
    simpleTorHomePage,
  } from "$lib/consts/app_external_links";

  let loadingWeb: boolean = false;
  let loadingInstgram: boolean = false;
  let loadingFacebook: boolean = false;
  let loadingLinkdin: boolean = false;

  function onClickWeb() {
    setTimeout(() => {
      loadingWeb = true;
    }, 50);
  }
  function onClickInstgram() {
    setTimeout(() => {
      loadingInstgram = true;
    }, 50);
  }
  function onClickFacebook() {
    setTimeout(() => {
      loadingFacebook = true;
    }, 50);
  }
  function onClickLinkdin() {
    setTimeout(() => {
      loadingLinkdin = true;
    }, 50);
  }
  function onLoad() {
    loadingWeb = false;
    loadingInstgram = false;
    loadingFacebook = false;
    loadingLinkdin = false;
  }
</script>

<nav class="md:place-self-center md:justify-self-end">
  <div class="grid grid-flow-col gap-4">
    <a
      class={loadingWeb ? "opacity-60" : ""}
      target="_blank"
      href={loadingWeb ? undefined : simpleTorHomePage}
      on:load={onLoad}
      on:click={onClickWeb}
    >
      <GeneralIcon icon="mdi:web" size={36} hover={true} />
    </a>
    <a
      class={loadingInstgram ? "opacity-60" : ""}
      target="_blank"
      href={loadingInstgram ? undefined : appInstagram}
      on:load={onLoad}
      on:click={onClickInstgram}
    >
      <GeneralIcon icon="mdi:instagram" size={36} hover={true} />
    </a>
    <a
      class={loadingFacebook ? "opacity-60" : ""}
      target="_blank"
      href={loadingFacebook ? undefined : appFacebook}
      on:load={onLoad}
      on:click={onClickFacebook}
      ><GeneralIcon icon="mdi:facebook" size={36} hover={true} /></a
    >
    <a
      class={loadingLinkdin ? "opacity-60" : ""}
      target="_blank"
      href={loadingLinkdin ? undefined : appLinkedin}
      on:load={onLoad}
      on:click={onClickLinkdin}
      ><GeneralIcon icon="mdi:linkedin" size={36} hover={true} /></a
    >
  </div>
</nav>
