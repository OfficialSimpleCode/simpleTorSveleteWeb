<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  import { _ } from "svelte-i18n";

  export let titleKey: string;

  let businessUrlEndPoint: string;

  let loading: boolean = false;
  let error: string = "";

  function isBusinessIdValid(): boolean {
    return true;
    error = $_("invalidId");
    return false;
  }

  function loadBusiness(e: Event) {
    error = "";
    if (!isBusinessIdValid()) {
      return;
    }

    loading = true;
    try {
      e.preventDefault();
      goto(`${base}/business/${businessUrlEndPoint}`);
    } catch (e: any) {
      error = e;
    } finally {
      loading = false;
    }
  }
</script>

<main class="h-full w-full flex justify-center items-center">
  <div class="-translate-y-[20vh] w-full flex flex-col items-center">
    <div class="my-8">
      <h1 class="text-2xl sm:text-4xl text-center">
        {$_(titleKey)}
      </h1>
    </div>
    <form class="join w-[85%] max-w-[700px]">
      <input
        bind:value={businessUrlEndPoint}
        type="text"
        class="input input-primary sm:input-lg xs:join-item w-full"
        class:input-error={error.length > 0}
        required
      />
      <button
        class="btn sm:btn-lg w-full btn-primary xs:join-item max-w-fit hidden xs:block"
        class:btn-disabled={loading}
        class:btn-error={error.length > 0}
        on:click={(e) => loadBusiness(e)}
      >
        {#if loading}
          <div class="loading loading-spinner" />
        {:else}
          {$_("loadBuisness")}
        {/if}
      </button>
    </form>
    <button
      class="btn xs:btn-lg w-full btn-primary max-w-fit mt-3 xs:hidden"
      class:btn-disabled={loading}
      class:btn-error={error.length > 0}
      on:click={(e) => loadBusiness(e)}
    >
      {#if loading}
        <div class="loading loading-spinner" />
      {:else}
        {$_("loadBuisness")}
      {/if}
    </button>
    {#if error.length > 0}
      <div class="label">
        <span class="label-text-alt text-error">{error}</span>
      </div>
    {/if}
  </div>
</main>
