<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import {
    AuthProvider,
    authProviderToImage,
    authProviderToStr,
  } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { userStore } from "$lib/stores/User";
  import { pushDialog } from "$lib/utils/general_utils";
  import AuthOptionDialog from "./AuthOptionDialog.svelte";

  export let shimmerEffect: boolean = false;

  let explainDialog: HTMLDialogElement;

  let pickedProvider: AuthProvider;
  let loading: boolean = false;
  let pickedDate: Date = new Date(0);

  async function onAdd() {
    if (shimmerEffect) {
      return;
    }
    if (loading) {
      return;
    }
    VerificationHelper.GI().setupLoggin();
    loading = true;
    try {
      await goto(`${base}/link-source`);
    } finally {
      loading = false;
    }
  }

  function onClick(authProvider: AuthProvider, date: Date) {
    if (shimmerEffect) {
      return;
    }
    pickedProvider = authProvider;
    pickedDate = date;
    pushDialog(explainDialog);
  }
</script>

<!-- Dialog -->

<AuthOptionDialog
  bind:explainDialog
  date={pickedDate}
  authProvider={pickedProvider}
/>

<!-- Auth Options -->
<section
  class="relative rounded-lg bg-base-200 p-5 flex items-center justify-center gap-1 w-[90%]"
>
  {#if shimmerEffect}
    <button class="bg-base-300 btn btn-ghost animate-pulse">
      <div class="w-[20px]" />
    </button>
  {:else}
    {#each $userStore.authProviders as [authProvider, date]}
      <button
        class="bg-base-300 btn btn-ghost"
        on:click={() => onClick(authProvider, date)}
      >
        <img
          src={authProviderToImage[authProvider]}
          alt={authProviderToStr[authProvider]}
          class="w-[30px]"
        />
      </button>
    {/each}
  {/if}

  <button
    class="bg-base-300 btn btn-ghost {shimmerEffect ? 'animate-pulse' : ''} "
    on:click={onAdd}
  >
    {#if loading}
      <div class="loading loading-spinner" />
    {:else}
      <GeneralIcon icon="gravity-ui:plus" />
    {/if}
  </button>
</section>
