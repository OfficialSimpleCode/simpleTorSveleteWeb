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

{#if $isConnectedStore == null}
  <CustomCircleIcon icon="" loading={true} size={22} />
{:else if $isConnectedStore === false}
  <CustomCircleIcon icon="ic:baseline-login" size={22} handleClick={onTap} />
{:else}
  <CustomCircleIcon
    icon="iconamoon:profile-fill"
    size={22}
    handleClick={onTap}
  />
{/if}
