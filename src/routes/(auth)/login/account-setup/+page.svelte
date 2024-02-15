<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import GeneralDialog from "$lib/components/GeneralDialog.svelte";
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import GenderPicker from "$lib/components/pickers/gender_picker/GenderPicker.svelte";
  import { Gender } from "$lib/consts/gender";
  import {
    InputOptions,
    type PhonePickerEvent,
    type TextFieldEvent,
  } from "$lib/consts/text_fields";
  import UserHelper from "$lib/helpers/user/user_helper";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import { emailValidation, nameValidation } from "$lib/utils/validation_utils";
  import { signInAction } from "./helpers/sign_in";

  let processing: boolean = false;

  const userData = VerificationHelper.GI().userData;

  let fullName: string = userData?.displayName ?? "";

  let email: string = userData?.email ?? "";
  let phoneNumber: string = userData?.phoneNumber ?? "";
  let pickedGender: Gender = Gender.anonymous;
  let verifiedEmail: boolean = false;

  let validPhone: boolean = false;
  let validName: boolean = emailValidation(email) == null;
  let validEmail: boolean = nameValidation(fullName) == null;

  let saveMeUsUserDialog: HTMLDialogElement;

  if (userData?.emailVerified == true) {
    verifiedEmail = true;
  }

  async function setupAccount() {
    if (!validEmail || !validPhone || !validName) {
      return;
    }
    processing = true;
    try {
      const resp = await signInAction(
        pickedGender,
        fullName,
        phoneNumber,
        email
      );

      if (resp != null) {
      }
    } finally {
      if ($businessStore != null) {
        pushDialog(saveMeUsUserDialog);
      } else {
        onFinish();
      }
      // For setup server errors
      processing = false;
    }
  }

  function onFinish() {
    goto(
      `${base}/business/${
        $businessStore != null
          ? $businessStore.urlEndPoint ?? $businessStore.businessId
          : ""
      }`
    );
  }

  async function saveUserOnBusiness() {
    await UserHelper.GI().saveMyselfAsCustomerAtBusiness($workersStore);
    onFinish();
  }

  function handleEmailChange(event: CustomEvent<TextFieldEvent>): void {
    validEmail = event.detail.isValid;
    email = event.detail.value;
  }
  function handlePhoneChange(event: CustomEvent<PhonePickerEvent>): void {
    validPhone = event.detail.isValid;
    phoneNumber = event.detail.value ?? "";
  }
  function handleNameChange(event: CustomEvent<TextFieldEvent>): void {
    validName = event.detail.isValid;
    fullName = event.detail.value;
  }
</script>

{#if $page.state.showModal}
  <GeneralDialog
    bind:dialog={saveMeUsUserDialog}
    titleTransKey={"newClient"}
    content={translate("doYouWantToBeClient")}
    cancelTranslateKey={"no"}
    saveTranslateKey={"yes"}
    onCancel={onFinish}
    onSave={saveUserOnBusiness}
  />
{/if}
<main class="w-full min-h-full flex items-center">
  <img
    class="flex-[1] w-min h-full object-cover hidden lg:flex !max-w-[55%]"
    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.timeout.com%2Fimages%2F105689091%2Fimage.jpg&f=1&nofb=1&ipt=f4b5132df6bedb3677bcdbc6907999e648fa1cc14693e8a5494a845d2cf3ec8a&ipo=images"
    alt="account-setup"
  />

  <div
    class="flex-[1] w-full h-full flex flex-col justify-center items-center gap-10 bg-base-100 mx-2"
  >
    <div class="text-center mt-4">
      <h1 class="text-4xl">Account Setup</h1>
      <h5 class="opacity-60">Fast and Easy</h5>
    </div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
      <form class="card-body" novalidate>
        <CustomTextFormField
          type={InputOptions.text}
          lableTranslateKey="Full Name"
          placeholder="full name"
          value={fullName}
          pattern=""
          validationFunc={nameValidation}
          isRequired={true}
          on:valueChange={handleNameChange}
        />

        <CustomTextFormField
          type={InputOptions.email}
          lableTranslateKey="Email (optional)"
          placeholder="example@gmail.com"
          value={email}
          pattern=""
          validationFunc={emailValidation}
          isRequired={true}
          on:valueChange={handleEmailChange}
        />

        <CustomPhoneField on:phoneChange={handlePhoneChange} />

        <GenderPicker />
        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary" on:click={setupAccount}>
            {#if processing}
              <div class="loading loading-spinner"></div>
            {:else}
              Finish Setup
            {/if}
          </button>
          <p class=" text-sm text-center mt-2">
            {translate("confirmPolicy")}
            <a href="{base}/privacy" class="link link-hover text-primary"
              >{translate("policy", $_)}</a
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</main>
