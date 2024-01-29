<script lang="ts">
  import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";
  import { translate } from "$lib/utils/translate";
  import { Icon, XCircle } from "svelte-hero-icons";
  export let dialog: HTMLDialogElement;
</script>

<div class="flex justify-between items-center mb-[1rem]">
  <InfoTooltipButton message={translate("loginWithPhoneExplain")} />
  <div class="center">
    <h3 class="font-bold text-lg">{translate("loginWithPhone")}</h3>
    <h3 class="text-me">{translate("enterPhoneNumber")}</h3>
  </div>
  <button class="btn btn-ghost" on:click={() => dialog.close()}>
    <Icon src={XCircle} size="24px" />
  </button>
</div>
<h3 class="text-xs">{translate("weSendYouCode")}</h3>
<button class="btn xs:btn-lg btn-outline w-full" on:click={() => {}}>
  {translate("login")}
</button>
