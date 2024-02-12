<script lang="ts">
  import { goto } from "$app/navigation";
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";

  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { isConnectedStore, userStore } from "$lib/stores/User";
  import { imageByGender } from "$lib/utils/images_utils";

  import { get } from "svelte/store";

  import { base } from "$app/paths";
  import { Gender } from "$lib/consts/gender";

  function onTap() {
    if (!get(isConnectedStore)) {
      VerificationHelper.GI().setupLoggin();
      goto(`${base}/login`);
    } else {
      goto(`${base}/profile`);
    }
  }
</script>

<button class="btn btn-ghost btn-circle avatar" on:click={onTap}>
  {#if $isConnectedStore == null}
    <div class="loading loading-spinner" />
  {:else if $isConnectedStore === false}
    <GeneralIcon icon="ic:baseline-login" />s
  {:else}
    <div
      class="{$userStore.gender === Gender.female
        ? 'w-9'
        : 'w-12'} rounded-full"
    >
      <img
        class={$userStore.gender === Gender.female ? "w-8 h-8" : "w-12 h-12"}
        alt="profile"
        src={imageByGender($userStore.gender)}
      />
    </div>
  {/if}
</button>
