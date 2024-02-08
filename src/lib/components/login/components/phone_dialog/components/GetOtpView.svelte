<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";
  import { AuthProvider, LoginReason } from "$lib/consts/auth";

  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import { InputOptions, type TextFieldEvent } from "$lib/consts/text_fields";
  import { translate } from "$lib/utils/translate";
  import { Icon, XCircle } from "svelte-hero-icons";
  import { handleLogin } from "../../../helpers/handle_login";
  export let dialog: HTMLDialogElement;
  export let loginReason: LoginReason;
  let otp: string = "";
  let valid: boolean = false;
  let loading: boolean = false;

  function onChange(event: CustomEvent<TextFieldEvent>) {
    otp = event.detail.value;
    valid = otp.length === 6;
  }

  async function onContinue() {
    if (!valid || loading) {
      return;
    }
    loading = true;
    try {
      await handleLogin({
        provider: AuthProvider.Phone,
        loginReason: loginReason,
        otp,
      });
    } finally {
      loading = false;
    }
  }
</script>

<div class="flex justify-between items-center mb-[1rem]">
  <InfoTooltipButton message={translate("loginWithPhoneExplain")} />
  <div class="center">
    <h3 class="font-bold text-lg">
      {translate(
        loginReason === LoginReason.phoneVerification
          ? "phoneVerification"
          : "loginWithPhone"
      )}
    </h3>
    <h3 class="text-me">
      {translate(
        loginReason === LoginReason.phoneVerification ? "" : "enterPhoneNumber"
      )}
    </h3>
  </div>
  <button class="btn btn-ghost" on:click={() => dialog.close()}>
    <Icon src={XCircle} size="24px" />
  </button>
</div>
<GeneralIcon icon="mdi:lock" />
<h3 class="text-me">{translate("beforeStartWeNeewToConfirmPhone")}</h3>
<h3 class="text-xs">{translate("pressOpt")}</h3>
<CustomTextFormField
  type={InputOptions.password}
  value=""
  pattern=""
  isRequired={true}
  on:valueChange={onChange}
/>

<div class="form-control mt-9 mr-20 ml-20">
  <button
    type="submit"
    class="btn btn-primary {valid ? '' : 'opacity-50'}"
    on:click={onContinue}
    >{#if loading}
      <div class="loading loading-spinner"></div>
    {:else}
      {translate("login")}
    {/if}
  </button>
</div>
