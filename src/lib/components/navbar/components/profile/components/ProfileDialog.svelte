<script lang="ts">
  import { goto, pushState } from "$app/navigation";
  import { base } from "$app/paths";
  import Avatar from "$lib/components/Avatar.svelte";
  import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import VerifiedIcon from "$lib/components/custom_components/VerifiedIcon.svelte";
  import PhoneDialog from "$lib/components/login/components/PhoneDialog.svelte";
  import GenderPicker from "$lib/components/pickers/gender_picker/GenderPicker.svelte";
  import { LoginReason } from "$lib/consts/auth";
  import type { Gender } from "$lib/consts/gender";
  import UserHelper from "$lib/helpers/user/user_helper";
  import { userStore } from "$lib/stores/User";
  import { imageByGender } from "$lib/utils/images_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import {
    ArrowRightOnRectangle,
    CheckCircle,
    Envelope,
    Icon,
    Identification,
    Phone,
    Trash,
    User,
    XCircle,
  } from "svelte-hero-icons";
  import { _ } from "svelte-i18n";

  import { page } from "$app/stores";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import UserInitializer from "$lib/initializers/user_initializer";
  import { translate } from "$lib/utils/translate";
  import { emailValidation, nameValidation } from "$lib/utils/validation_utils";
  import clipboard from "clipboardy";
  import { handleVerification } from "../helpers/handle_verification";
  import AuthOptions from "./AuthOptions.svelte";
  import ChangeAtrributeDialog from "./ChangeAtrributeDialog.svelte";
  import ChangePhoneDialog from "./ChangePhoneDialog.svelte";

  export let dialog: HTMLDialogElement;
  let emailDialog: HTMLDialogElement;
  let nameDialog: HTMLDialogElement;
  let phoneDialog: HTMLDialogElement;
  let verificationDialog: HTMLDialogElement;
  let loadingLogout: boolean = false;
  let copiedUserId: boolean = false;
  console.log($userStore.id);
  function openEmailDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => emailDialog.showModal(), 200);
  }

  function openNameDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => nameDialog.showModal(), 200);
  }

  function openPhoneDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => phoneDialog.showModal(), 200);
  }

  function copyToUserIdClipboard() {
    clipboard.write($userStore.id);
    copiedUserId = true;

    // TODO: copy to clipboard
    setTimeout(() => (copiedUserId = false), 1500);
  }

  async function updateGender(newGender: Gender) {
    await UserHelper.GI().setGender(newGender);
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
  async function onClickVerified() {
    await handleVerification(verificationDialog);
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
    bind:dialog={verificationDialog}
  />
{/if}

<dialog
  bind:this={dialog}
  id="profileDialog"
  class="modal modal-bottom sm:modal-middle"
  on:close={() => history.back()}
>
  <div class="modal-box bg-base-200 pb-10">
    <div class="flex justify-between items-center mb-[1rem]">
      <InfoTooltipButton message="Placeholder TODO" />
      <h3 class="font-bold text-lg">{$_("profile")}</h3>
      <button class="btn btn-ghost" on:click={() => dialog.close()}>
        <Icon src={XCircle} size="24px" />
      </button>
    </div>
    <div class="flex flex-col justify-start items-center gap-6">
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
      <section class="join join-vertical w-[90%] rounded-lg bg-base-100">
        <button
          class="btn btn-ghost join-item flex justify-between items-center"
          on:click={openNameDialog}
        >
          <div class="flex items-center gap-2">
            <Icon src={Identification} size="26px" />
            {$_("name")}
          </div>
          <div class="flex items-center text-gray-500">
            {$userStore.name}
            <CustomArrow />
          </div>
        </button>
        <div class="divider h-[1px]" />

        <button
          class="btn btn-ghost join-item flex justify-between items-center"
          on:click={openPhoneDialog}
        >
          <div class="flex items-center gap-2">
            <Icon src={Phone} size="26px" />
            {$_("phoneNumber")}
          </div>
          <div class="flex items-center text-gray-500">
            {#if $userStore.userPublicData.isVerifiedPhone}
              <VerifiedIcon />
            {/if}
            <div class="w-[5px]" />
            {$userStore.phoneNumber}
            <CustomArrow />
          </div></button
        >
        <div class="divider h-[1px]" />
        <button
          class="btn btn-ghost join-item flex justify-between items-center"
          on:click={openEmailDialog}
        >
          <div class="flex items-center gap-2">
            <Icon src={Envelope} size="26px" />
            {$_("email")}
          </div>
          <div class="flex items-center text-gray-500">
            {#if $userStore.userPublicData.isVerifiedEmail}
              <VerifiedIcon />
            {/if}
            <div class="w-[5px]" />
            {$userStore.userPublicData.email}
            <CustomArrow />
          </div>
        </button>
        <div class="divider h-[1px]" />
        <button
          class="btn btn-ghost join-item flex justify-between items-center"
          on:click={copyToUserIdClipboard}
        >
          <div class="flex items-center gap-2">
            <Icon src={User} size="26px" />
            {$_("userId")}
          </div>
          <div
            class={copiedUserId
              ? "flex items-center text-gray-500 gap-2"
              : "flex items-center text-gray-500"}
          >
            {#if copiedUserId}
              {translate("Copied", $_)}
            {:else}
              {$userStore.id}
            {/if}
            {#if copiedUserId}
              <Icon src={CheckCircle} size="22px" />
            {:else}
              <CustomArrow />
            {/if}
          </div>
        </button>
      </section>

      <!-- Profile Information -->
      <section class="join join-vertical w-[90%] rounded-lg bg-base-100">
        <button
          class="btn btn-ghost join-item flex justify-between items-center"
          on:click={onClickVerified}
        >
          <div class="flex items-center gap-2">
            <VerifiedIcon size={23} />
            {$_("phoneVerification")}
          </div>
          <div class="flex items-center text-gray-500">
            {translate(
              $userStore.userPublicData.isVerifiedPhone
                ? "verified"
                : "notVerified"
            )}
            <CustomArrow />
          </div>
        </button>
      </section>
      <GenderPicker onChanged={updateGender} pickedGender={$userStore.gender} />

      <AuthOptions />
      <!-- Actions -->
      <section class="join join-vertical w-[90%] rounded-lg bg-base-100">
        <button
          class="btn btn-ghost join-item flex justify-between items-center"
          on:click={onLogout}
        >
          <div class="flex items-center gap-2">
            <Icon src={ArrowRightOnRectangle} size="26px" />
            {$_("logout")}
          </div>
          <div class="flex items-center text-gray-500">
            {#if loadingLogout}
              <div class="loading loading-spinner"></div>
            {:else}
              <CustomArrow />
            {/if}
          </div>
        </button>
        <div class="divider h-[1px]" />
        <button
          class="btn btn-ghost join-item flex justify-between items-center"
          on:click={onDeleteUser}
        >
          <div class="flex items-center gap-2">
            <Icon src={Trash} size="26px" />
            {$_("deleteUser")}
          </div>
          <div class="flex items-center text-gray-500">
            <CustomArrow />
          </div>
        </button>
      </section>
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
