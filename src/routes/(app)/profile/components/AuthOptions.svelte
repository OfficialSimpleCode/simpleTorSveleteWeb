<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
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
  let explainDialog: HTMLDialogElement;

  let pickedProvider: AuthProvider;
  let pickedDate: Date = new Date(0);

  async function onAdd() {
    VerificationHelper.GI().setupLoggin();
    goto(`${base}/link-source`);
  }

  function onClick(authProvider: AuthProvider, date: Date) {
    pickedProvider = authProvider;
    pickedDate = date;
    pushDialog(
      explainDialog,
      `${base}/profile/auth-${authProviderToStr[authProvider]}`
    );
  }
</script>

<!-- Dialog -->
{#if $page.state.showModal}
  <AuthOptionDialog
    bind:explainDialog
    date={pickedDate}
    authProvider={pickedProvider}
  />
{/if}

<!-- Auth Options -->
<section
  class="relative rounded-lg bg-base-200 p-5 flex items-center justify-center gap-1 w-[90%]"
>
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

  <button class="bg-base-300 btn btn-ghost" on:click={onAdd}>
    <GeneralIcon icon="gravity-ui:plus" />
  </button>
</section>
