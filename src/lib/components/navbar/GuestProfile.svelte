<script>
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import GeneralIcon from "../GeneralIcon.svelte";
  function onTap() {
    VerificationHelper.GI().setupLoggin();
    goto(`${base}/login`);
  }
</script>

<button on:click={onTap}>
  <GeneralIcon icon="ic:baseline-login" />s
</button>
