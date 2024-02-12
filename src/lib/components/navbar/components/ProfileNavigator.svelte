<script lang="ts">
  import { goto } from "$app/navigation";

  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { isConnectedStore } from "$lib/stores/User";

  import { get } from "svelte/store";

  import { base } from "$app/paths";
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";

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
    <CustomCircleIcon icon="" loading={true} size={22} />
    <div class="loading loading-spinner" />
  {:else if $isConnectedStore === false}
    <CustomCircleIcon icon="ic:baseline-login" size={22} />
  {:else}
    <CustomCircleIcon icon="iconamoon:profile-fill" size={22} />
  {/if}
</button>
