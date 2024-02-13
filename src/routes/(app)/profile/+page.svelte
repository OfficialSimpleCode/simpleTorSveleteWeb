<script lang="ts">
  import { goto, pushState } from "$app/navigation";
  import { base } from "$app/paths";
  import Avatar from "$lib/components/Avatar.svelte";
  import PhoneDialog from "$lib/components/login/components/PhoneDialog.svelte";
  import GenderPicker from "$lib/components/pickers/gender_picker/GenderPicker.svelte";
  import { LoginReason } from "$lib/consts/auth";
  import type { Gender } from "$lib/consts/gender";
  import UserHelper from "$lib/helpers/user/user_helper";
  import { isConnectedStore, userStore } from "$lib/stores/User";
  import { imageByGender } from "$lib/utils/images_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { CheckCircle, Icon } from "svelte-hero-icons";
  import { _ } from "svelte-i18n";

  import { page } from "$app/stores";
  import SettingsItem from "$lib/components/custom_components/SettingsItem.svelte";
  import VerifiedIcon from "$lib/components/custom_components/VerifiedIcon.svelte";
  import VerifiedPhoneSuccessfullyDialog from "$lib/components/dialogs/VerifiedPhoneSuccessfullyDialog.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import UserInitializer from "$lib/initializers/user_initializer";
  import { translate } from "$lib/utils/translate";
  import { emailValidation, nameValidation } from "$lib/utils/validation_utils";
  import clipboard from "clipboardy";
  import { onMount } from "svelte";
  import AuthOptions from "./components/AuthOptions.svelte";
  import ChangeAtrributeDialog from "./components/ChangeAtrributeDialog.svelte";
  import ChangePhoneDialog from "./components/ChangePhoneDialog.svelte";
  import { handleVerification } from "./helpers/handle_verification";
  let emailDialog: HTMLDialogElement;
  let nameDialog: HTMLDialogElement;
  let phoneDialog: HTMLDialogElement;
  let verificationDialog: HTMLDialogElement;
  let verificationSuccessfully: HTMLDialogElement;
  let loadingLogout: boolean = false;
  let copiedUserId: boolean = false;
  console.log($userStore.id);
  onMount(() => {
    isConnectedStore.subscribe((value) => {
      //redirect to the login page if the user is not connected
      console.log($page.url);
      if (value === false) {
        goto(`${base}/login`);
      }
    });
  });

  function openEmailDialog() {
    pushState(`${base}/profile/email`, {
      showModal: true,
    });
    setTimeout(() => emailDialog.showModal(), 200);
  }

  function openNameDialog() {
    pushState(`${base}/profile/name`, {
      showModal: true,
    });
    setTimeout(() => nameDialog.showModal(), 200);
  }

  function openPhoneDialog() {
    pushState(`${base}/profile/phone`, {
      showModal: true,
    });
    setTimeout(() => phoneDialog.showModal(), 200);
  }

  function copyToUserIdClipboard() {
    clipboard.write($userStore.id);
    copiedUserId = true;
    setTimeout(() => (copiedUserId = false), 1500);
  }

  async function onLogout() {
    loadingLogout = true;
    try {
      await UserHelper.GI().logout();
      history.back();
    } finally {
      loadingLogout = false;
    }
  }

  async function onUpdateName(name: string) {
    return await UserHelper.GI().updateName(name);
  }

  async function onUpdateEmail(email: string) {
    return await UserHelper.GI().updateEmail(email);
  }

  async function onUpdatePhone(phone: string) {
    return (await UserHelper.GI().updatePhone(phone, false)) != null;
  }

  async function updateGender(newGender: Gender) {
    await UserHelper.GI().setGender(newGender);
  }

  async function onClickVerified() {
    await handleVerification(
      verificationDialog,
      `${base}/profile/phone-verification`
    );
  }

  async function onDeleteUser() {
    VerificationHelper.GI().setupLoggin();
    goto(`${base}/delete-user`);
  }
</script>

<!-- Dialog -->
{#if $page.state.showModal}
  <ChangeAtrributeDialog
    explain={translate("nameExplain")}
    title={translate("name")}
    initialValue={UserInitializer.GI().user.userPublicData.name}
    validationFunc={nameValidation}
    onUpdate={onUpdateName}
    bind:dialog={nameDialog}
  />
  <ChangeAtrributeDialog
    explain={translate("emailUpdateExplain")}
    title={translate("email")}
    initialValue={UserInitializer.GI().user.userPublicData.email}
    validationFunc={emailValidation}
    onUpdate={onUpdateEmail}
    bind:dialog={emailDialog}
  />
  <ChangePhoneDialog
    explain={translate("phoneUpdateExplain")}
    title={translate("phoneNumber")}
    initialValue={UserInitializer.GI().user.userPublicData.phoneNumber}
    onUpdate={onUpdatePhone}
    bind:dialog={phoneDialog}
  />

  <PhoneDialog
    loginReason={LoginReason.phoneVerification}
    insideOtp={true}
    on:onVerifyPhone={() => {
      //remove the otp dialog
      history.back();
      //push the successfully verified dialog
      pushState("", {
        showModal: true,
      });
      setTimeout(() => verificationSuccessfully.showModal(), 200);
    }}
    bind:dialog={verificationDialog}
  />
  <VerifiedPhoneSuccessfullyDialog bind:dialog={verificationSuccessfully} />
{/if}

{#if $isConnectedStore === undefined}
  <div class="loading loading-spinner"></div>
{:else if $isConnectedStore === false}
  <div />
{:else}
  <div
    class="flex flex-col justify-start items-center gap-6 max-w-[800px] mx-auto pb-5"
  >
    <!-- Avatar -->
    <section class="flex flex-col items-center">
      <Avatar
        small={true}
        ring={false}
        img={imageByGender($userStore.gender)}
      />
      <h1 class="text-xl mt-5">{$userStore.name}</h1>
      <h5 class="text-sm text-gray-500">
        {$_("since")}: {dateToDateStr($userStore.createdAt)}
      </h5>
    </section>

    <!-- Profile Information -->
    <section class="join join-vertical w-[90%] {containerRadius} bg-base-200">
      <SettingsItem icon="wpf:name" onTap={openNameDialog} name={"name"}>
        <h3
          slot="trailing"
          class="overflow-hidden truncate max-w-[130px] xs:max-w-[190px]"
        >
          {$userStore.name}
        </h3>
      </SettingsItem>

      <div class="h-[0.2px] w-full bg-gray-500 opacity-20" />
      <SettingsItem
        icon="ic:baseline-phone"
        onTap={openPhoneDialog}
        name={"phoneNumber"}
      >
        <div slot="trailing" class="flex flex-row">
          {#if $userStore.userPublicData.isVerifiedPhone}
            <VerifiedIcon />
          {/if}
          <div class="w-[5px]" />
          <p class="overflow-hidden truncate max-w-[100px] xs:max-w-[190px]">
            {$userStore.userPublicData.phoneNumber}
          </p>
        </div>
      </SettingsItem>

      <div class="h-[0.2px] w-full bg-gray-500 opacity-20" />
      <SettingsItem
        icon="ic:baseline-email"
        onTap={openEmailDialog}
        name={"email"}
      >
        <div slot="trailing" class="flex items-center text-gray-500">
          {#if $userStore.userPublicData.isVerifiedEmail}
            <VerifiedIcon />
          {/if}
          <div class="w-[5px]" />
          <p class="overflow-hidden truncate max-w-[130px] xs:max-w-[190px]">
            {$userStore.userPublicData.email}
          </p>
        </div>
      </SettingsItem>

      <div class="h-[0.2px] w-full bg-gray-500 opacity-20" />
      <SettingsItem
        icon="tabler:id"
        onTap={copyToUserIdClipboard}
        name={"userId"}
      >
        <div slot="trailing" class="flex flex-row items-center">
          <p class="overflow-hidden truncate max-w-[130px] xs:max-w-[190px]">
            {#if copiedUserId}
              {translate("Copied", $_)}
            {:else}
              {$userStore.id}
            {/if}
          </p>

          {#if copiedUserId}
            <Icon src={CheckCircle} size="22px" />
          {/if}
        </div>
      </SettingsItem>
    </section>

    <!-- Profile Information -->
    <section class=" w-[90%] {containerRadius} bg-base-200">
      <SettingsItem
        icon="material-symbols:verified"
        onTap={onClickVerified}
        name={"phoneVerification"}
      >
        <h3 slot="trailing">
          {translate(
            $userStore.userPublicData.isVerifiedPhone
              ? "verified"
              : "notVerified"
          )}
        </h3></SettingsItem
      >
    </section>
    <GenderPicker onChanged={updateGender} pickedGender={$userStore.gender} />

    <AuthOptions />
    <!-- Actions -->
    <section class="join join-vertical w-[90%] {containerRadius} bg-base-200">
      <SettingsItem
        icon="material-symbols:logout"
        onTap={onLogout}
        name={"logout"}
      >
        <div slot="trailing">
          {#if loadingLogout}
            <div class="loading loading-spinner" />
          {/if}
        </div>
      </SettingsItem>

      <div class="h-[0.2px] w-full bg-gray-500 opacity-20" />
      <SettingsItem
        icon="ph:trash-bold"
        onTap={onDeleteUser}
        name={"deleteUser"}
      />
    </section>
  </div>
{/if}
