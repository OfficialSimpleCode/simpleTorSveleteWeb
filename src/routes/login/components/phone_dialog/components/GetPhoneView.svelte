<script lang="ts">
  import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";
  import { translate, _ } from "$lib/utils/translate";
  import { createEventDispatcher } from "svelte";
  import { Icon, XCircle } from "svelte-hero-icons";
  import { sendSms } from "../helpers/send_sms";
  const dispatch = createEventDispatcher();
  export let dialog: HTMLDialogElement;

  function onContinue() {
    sendSms({ phone: "+972-525656377" });
    dispatch("navigateOtp");
  }
</script>

<div class="flex justify-between items-center mb-[1rem]">
  <InfoTooltipButton message={translate("loginWithPhoneExplain")} />
  <div class="center">
    <h3 class="font-bold text-lg">{translate("loginWithPhone")}</h3>
    <h3 class="text-me">{translate("beforeStartWeNeewToConfirmPhone")}</h3>
  </div>

  <button class="btn btn-ghost" on:click={() => dialog.close()}>
    <Icon src={XCircle} size="24px" />
  </button>
</div>

<button class="btn xs:btn-lg btn-outline w-full" on:click={onContinue}>
  {translate("verify", $_)}
</button>
