<script lang="ts">
  import GenderPicker from "$lib/components/pickers/gender_picker/GenderPicker.svelte";
  import { Gender } from "$lib/consts/gender";
  import UserHelper from "$lib/helpers/user/user_helper";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import UserInitializer from "$lib/initializers/user_initializer";

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
</script>

<main class="w-full h-full flex flex-row items-center">
  <!-- <img
    class="flex-[1] w-full h-full object-cover hidden md:block"
    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.timeout.com%2Fimages%2F105689091%2Fimage.jpg&f=1&nofb=1&ipt=f4b5132df6bedb3677bcdbc6907999e648fa1cc14693e8a5494a845d2cf3ec8a&ipo=images"
    alt="account-setup"
  /> -->

  <div
    class="flex-[1] w-full h-full flex flex-col justify-center items-center gap-10"
  >
    <div class="text-center">
      <h1 class="text-4xl">Account Setup</h1>
      <h5 class="text-gray-500">Fast and Easy</h5>
    </div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form class="card-body">
        <div class="form-control">
          <label class="label" for="name">
            <span class="label-text">Full Name</span>
          </label>
          <input
            bind:value={fullName}
            type="text"
            placeholder="full name"
            class="input input-bordered"
            class:input-error={fullNameError}
            required
          />
          {#if fullNameError}
            <label class="label" for="name">
              <span class="label-text-alt text-error">
                {fullNameError}
              </span>
            </label>
          {/if}
        </div>
        <div class="form-control">
          <label class="label" for="email">
            <span class="label-text">Email (optional)</span>
          </label>
          <input
            bind:value={email}
            type="email"
            placeholder="email"
            class="input input-bordered"
            class:input-error={emailError}
          />
          {#if emailError}
            <label class="label" for="email">
              <span class="label-text-alt text-error">
                {emailError}
              </span>
            </label>
          {/if}
        </div>
        <div class="form-control">
          <label class="label" for="tel">
            <span class="label-text">Phone Number</span>
          </label>
          <input
            bind:value={phoneNumber}
            type="tel"
            placeholder="phone number"
            class="input input-bordered"
            class:input-error={phoneNumberError}
          />
          {#if phoneNumberError}
            <label class="label" for="tle">
              <span class="label-text-alt text-error">
                {phoneNumberError}
              </span>
            </label>
          {/if}
        </div>
        <GenderPicker />
        <div class="form-control mt-6">
          <button class="btn btn-primary" on:click={setupAccount}>
            {#if processing}
              <div class="loading loading-spinner"></div>
            {:else}
              Finish Setup
            {/if}
          </button>
          <p class="text-gray-500 text-sm text-center mt-2">
            By clikcing "Finish Setup" you agree to our <a
              href="https://google.com"
              class="link link-neutral">privacy policy</a
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</main>
