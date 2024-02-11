<script lang="ts">
  import { goto, pushState } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import {
    AuthProvider,
    authProviderToImage,
    authProviderToStr,
  } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { userStore } from "$lib/stores/User";
  import AuthOptionDialog from "./AuthOptionDialog.svelte";
  let explainDialog: HTMLDialogElement;

  const verificationProviders: Map<AuthProvider, Date> =
    $userStore.authProviders;

  console.log(verificationProviders);
  async function onAdd() {
    VerificationHelper.GI().setupLoggin();
    goto(`${base}/link-source`);
  }

  function onClick() {
    //TODO
    pushState("", {
      showModal: true,
    });
    setTimeout(() => explainDialog.showModal(), 200);
  }
</script>

<!-- Dialog -->
{#if $page.state.showModal}
  <AuthOptionDialog
    bind:explainDialog
    date={new Date()}
    authProvider={AuthProvider.Apple}
  />
{/if}

<!-- Auth Options -->
<section
  class="relative rounded-lg bg-base-100 p-5 flex items-center justify-center gap-1 w-[90%]"
>
  {#each verificationProviders as [authProvider, date]}
    <button class="bg-base-300 btn btn-ghost" on:click={onClick}>
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
