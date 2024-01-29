<script lang="ts">
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import GenderPicker from "$lib/components/pickers/gender_picker/GenderPicker.svelte";
  import { Gender } from "$lib/consts/gender";
  import { InputOptions } from "$lib/consts/text_fields";
  import UserHelper from "$lib/helpers/user/user_helper";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import UserInitializer from "$lib/initializers/user_initializer";
  import { _, translate } from "$lib/utils/translate";

  let fullName: string;
  let fullNameError: string = "";
  let email: string;
  let emailError: string = "";
  let phoneNumber: string;
  let phoneNumberError: string = "";
  let genderError: string = "";
  let pickedGender: Gender = Gender.anonymous;
  let processing: boolean = false;

  function validatePhoneNumber() {
    if (!phoneNumber || phoneNumber.length == 0) {
      phoneNumberError = "Phone number is required";
      return false;
    }
    // TODO: implement
    return true;
  }

  function resetErrors() {
    fullNameError = "";
    emailError = "";
    phoneNumberError = "";
    genderError = "";
  }

  // function validate() {
  //     resetErrors();
  //     return (
  //         validateFullName() &&
  //         validateEmail() &&
  //         validatePhoneNumber() &&
  //         validateGender()
  //     );
  // }

  function setupAccount() {
    return;
    processing = true;
    try {
      UserHelper.GI()
        .createUser({
          gender: pickedGender,
          userName: fullName,
          phone: phoneNumber,
          email: email,
          isVerifiedEmail: false,
          isVerifiedPhone: false,
          userId: UserInitializer.GI().userId,
          authProvider: VerificationHelper.GI().currentAuthProvider,
        })
        .then(async (phoneDataResp) => {
          if (phoneDataResp == null) {
            return null;
          }
          // loading the user
          UserInitializer.GI().userDoc = undefined; // force db load user
          const setUpResp = await UserInitializer.GI().setupUser({
            newUserId: VerificationHelper.GI().userId,
          });

          if (setUpResp) {
            return phoneDataResp;
          }
          return null;
        });
    } finally {
      // For setup server errors
      processing = false;
    }
  }

  function vali(value: string): string {
    if (value.length < 5) {
      return "Short";
    } else if (value.length > 10) {
      return "Long";
    }
    return "";
  }
</script>

<main class="w-full h-full flex items-center">
  <img
    class="flex-[1] w-min h-full object-cover hidden lg:flex !max-w-[55%]"
    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.timeout.com%2Fimages%2F105689091%2Fimage.jpg&f=1&nofb=1&ipt=f4b5132df6bedb3677bcdbc6907999e648fa1cc14693e8a5494a845d2cf3ec8a&ipo=images"
    alt="account-setup"
  />

  <div
    class="flex-[1] w-full h-full flex flex-col justify-center items-center gap-10 bg-base-100 mx-2"
  >
    <div class="text-center">
      <h1 class="text-4xl">Account Setup</h1>
      <h5 class="opacity-60">Fast and Easy</h5>
    </div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
      <form class="card-body" novalidate>
        <CustomTextFormField
          type={InputOptions.text}
          lableTranslateKey="Full Name"
          placeholder="full name"
          pattern=""
          validationFunc={vali}
          isRequired={true}
        ></CustomTextFormField>

        <CustomTextFormField
          type={InputOptions.email}
          lableTranslateKey="Email (optional)"
          placeholder="example@gmail.com"
          pattern=""
          validationFunc={vali}
          isRequired={true}
        ></CustomTextFormField>

        <CustomPhoneField />

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
            By clikcing "Finish Setup" you agree to our <a
              href="https://google.com"
              class="link link-hover text-primary">{translate("policy", $_)}</a
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</main>
