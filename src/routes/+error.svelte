<script lang="ts">
  import { page } from "$app/stores";
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import GeneralErrorPage from "$lib/components/pages/GeneralErrorPage.svelte";

  import NotFoundPage from "$lib/components/pages/NotFoundPage.svelte";

  let isNotFound: boolean = false;

  if ($page.status == 404) {
    isNotFound = true;
  }
</script>

<Navbar />
{#if isNotFound}
  <NotFoundPage />
{:else}
  <GeneralErrorPage />
{/if}
