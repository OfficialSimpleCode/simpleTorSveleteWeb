<script lang="ts">
  import { goto, pushState } from "$app/navigation";
  import { page } from "$app/stores";
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";

  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { isConnectedStore, userStore } from "$lib/stores/User";
  import { imageByGender } from "$lib/utils/images_utils";

  import { get } from "svelte/store";

  import { base } from "$app/paths";
  import ProfileDialog from "./components/ProfileDialog.svelte";

  let profileDialog: HTMLDialogElement;

  function onTap() {
    if (!get(isConnectedStore)) {
      VerificationHelper.GI().setupLoggin();
      goto(`${base}/login`);
    } else {
      pushState("", {
        showModal: true,
      });
      setTimeout(() => profileDialog.showModal(), 200);
    }
  }
</script>

<!-- Dialog -->
{#if $page.state.showModal}
  <ProfileDialog bind:dialog={profileDialog} />
{/if}

<button class="btn btn-ghost btn-circle avatar" on:click={onTap}>
  {#if $isConnectedStore}
    <div class="w-10 rounded-full">
      <img alt="profile" src={imageByGender($userStore.gender)} />
    </div>
  {:else}
    <GeneralIcon icon="ic:baseline-login" />s
  {/if}
</button>
