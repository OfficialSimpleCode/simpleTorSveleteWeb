<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  let loading: boolean = false;
  function onClick() {
    //no need to load the same page
    if ($page.url.pathname === "/") {
      return;
    }

    setTimeout(() => (loading = true), 50);
  }

  function onLoad() {
    loading = false;
  }
</script>

<a
  on:load={onLoad}
  on:click={onClick}
  href={loading ? undefined : `${base}/`}
  class=" text-xl hover:opacity-70 {loading ? 'opacity-70' : ''}">Simple Tor</a
>
