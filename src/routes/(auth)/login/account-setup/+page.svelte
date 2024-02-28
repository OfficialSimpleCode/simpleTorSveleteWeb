<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import GeneralDialog from "$lib/components/dialogs/GeneralDialog.svelte";
  import GenderPicker from "$lib/components/pickers/gender_picker/GenderPicker.svelte";
  import { AuthProvider } from "$lib/consts/auth";
  import { Gender } from "$lib/consts/gender";
  import { maxButtonSize } from "$lib/consts/sizes";
  import {
    InputOptions,
    type PhonePickerEvent,
    type TextFieldEvent,
  } from "$lib/consts/text_fields";
  import { ErrorsController } from "$lib/controllers/errors_controller";
  import UserHelper from "$lib/helpers/user/user_helper";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import { emailValidation, nameValidation } from "$lib/utils/validation_utils";
  import SetupTitle from "./components/SetupTitle.svelte";
  import { signInAction } from "./helpers/sign_in";

  let processing: boolean = false;

  const userData = VerificationHelper.GI().userData;

  let fullName: string = userData?.displayName ?? "";

  let email: string = userData?.email ?? "";
  let phoneNumber: string = userData?.phoneNumber ?? "";
  let pickedGender: Gender = Gender.anonymous;
  let verifiedEmail: boolean = false;

  let validPhone: boolean =
    userData?.phoneNumber != "" && userData?.phoneNumber != null;
  let validName: boolean = nameValidation(fullName) == null;
  let validEmail: boolean = emailValidation(email) == null;

  let saveMeUsUserDialog: HTMLDialogElement;

  if (userData?.emailVerified == true) {
    verifiedEmail = true;
  }

  async function setupAccount() {
    console.log(validEmail, validPhone, validName, processing);
    if (!validEmail || !validPhone || !validName || processing) {
      return;
    }
    processing = true;
    try {
      const resp = await signInAction(
        pickedGender,
        fullName,
        phoneNumber,
        email,
        verifiedEmail,
        VerificationHelper.GI().currentAuthProvider === AuthProvider.Phone
      );

      if (resp != null) {
        if ($businessStore != null) {
          pushDialog(saveMeUsUserDialog);
        } else {
          onFinish();
        }
      }
    } finally {
      // For setup server errors
      processing = false;
    }
  }

  async function onFinish() {
    if ($businessStore != null) {
      goto(`${base}/business/${$businessStore.url}`);
    } else {
      goto(`${base}/`);
    }
  }

  async function saveUserOnBusiness() {
    const resp =
      await UserHelper.GI().saveMyselfAsCustomerAtBusiness($workersStore);
    if (!resp) {
      ErrorsController.displayError();
    }
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

<GeneralDialog
  bind:dialog={saveMeUsUserDialog}
  titleTransKey={"newClient"}
  content={translate("doYouWantToBeClient")}
  cancelTranslateKey={"no"}
  maxWidth="max-w-[300px]"
  saveTranslateKey={"yes"}
  onCancel={onFinish}
  onSave={saveUserOnBusiness}
/>

<main class="flex w-full h-full">
  <img
    class="flex-[1] object-cover !max-w-[50%] hidden lg:flex"
    src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg"
    alt="simpletor"
  />
  <div class="flex flex-col items-center justify-center w-full pb-20">
    <section
      class="bg-base-200 py-7 px-5 rounded-md flex flex-col items-center gap-3 w-[93%] xs:w-[80%] md:w-[50%] lg:w-[80%]"
    >
      <!-- login title -->
      <SetupTitle />

      <div class="flex flex-col gap-2 w-[90%]">
        <div class="divider divider-vertical px-3" />

        <CustomTextFormField
          type={InputOptions.text}
          hint={translate("name", $_)}
          value={fullName}
          pattern=""
          validationFunc={nameValidation}
          isRequired={true}
          on:valueChange={handleNameChange}
        />

        <CustomTextFormField
          type={InputOptions.email}
          hint="example@gmail.com"
          value={email}
          pattern=""
          validationFunc={emailValidation}
          isRequired={true}
          on:valueChange={handleEmailChange}
        />
        <CustomPhoneField
          on:phoneChange={handlePhoneChange}
          value={phoneNumber}
        />
        <div class="max-w-[500px] flex flex-col items-center">
          <GenderPicker background={"bg-base-100"} />
        </div>
        <div class="divider divider-vertical px-3" />
      </div>

      <!-- End Button -->
      <button
        class="btn btn-md sm:text-xl btn-primary w-[80%] {processing
          ? 'opacity-55'
          : ''} {maxButtonSize} hover:outline"
        on:click={setupAccount}
      >
        {#if processing}
          <div class="loading loading-spinner" />
        {:else}
          {translate("finish", $_)}
        {/if}
      </button>
      <div class="w-[70%]">
        <p class="text-sm opacity-70 text-center">
          {translate("confirmPolicy", $_)}
          <a
            href="{base}/privacy"
            target="_blank"
            class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
            >{translate("policy", $_)}</a
          >
          {translate("andThe", $_)}
          <a
            href="{base}/terms-of-use"
            target="_blank"
            class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
            >{translate("termToUse", $_)}</a
          >
        </p>
      </div>
    </section>
  </div>
</main>
