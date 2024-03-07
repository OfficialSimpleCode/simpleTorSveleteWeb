<script lang="ts">
  import SettingContainer from "$lib/components/SettingContainer.svelte";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import SettingsItem from "$lib/components/custom_components/SettingsItem.svelte";
  import VerifiedIcon from "$lib/components/custom_components/VerifiedIcon.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import UserHelper from "$lib/helpers/user/user_helper";
  import UserInitializer from "$lib/initializers/user_initializer";
  import { userStore } from "$lib/stores/User";
  import { pushDialog } from "$lib/utils/general_utils";
  import { formatedPhone } from "$lib/utils/string_utils";
  import { translate } from "$lib/utils/translate";
  import { emailValidation, nameValidation } from "$lib/utils/validation_utils";
  import clipboard from "clipboardy";
  import ChangeAtrributeDialog from "../components/ChangeAtrributeDialog.svelte";
  import ChangePhoneDialog from "../components/ChangePhoneDialog.svelte";
  export let shimmerEffect: boolean = false;

  let emailDialog: HTMLDialogElement;
  let nameDialog: HTMLDialogElement;
  let phoneDialog: HTMLDialogElement;
  let copiedUserId: boolean = false;

  function openEmailDialog() {
    if (shimmerEffect) {
      return;
    }
    pushDialog(emailDialog);
  }

  function openNameDialog() {
    if (shimmerEffect) {
      return;
    }
    pushDialog(nameDialog);
  }

  function openPhoneDialog() {
    if (shimmerEffect) {
      return;
    }
    pushDialog(phoneDialog);
  }

  function copyToUserIdClipboard() {
    if (shimmerEffect) {
      return;
    }
    clipboard.write($userStore.id);
    copiedUserId = true;
    setTimeout(() => (copiedUserId = false), 1500);
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
</script>

<!-- Dialog -->

<ChangeAtrributeDialog
  explain={translate("nameExplain")}
  titleTransKey={"name"}
  initialValue={UserInitializer.GI().user.userPublicData.name}
  validationFunc={nameValidation}
  onUpdate={onUpdateName}
  bind:dialog={nameDialog}
/>
<ChangeAtrributeDialog
  explain={translate("emailUpdateExplain")}
  titleTransKey={"email"}
  initialValue={UserInitializer.GI().user.userPublicData.email}
  validationFunc={emailValidation}
  onUpdate={onUpdateEmail}
  bind:dialog={emailDialog}
/>
<ChangePhoneDialog
  explain={translate("phoneUpdateExplain")}
  titleTransKey={"phoneNumber"}
  initialValue={UserInitializer.GI().user.userPublicData.phoneNumber}
  onUpdate={onUpdatePhone}
  bind:dialog={phoneDialog}
/>

<SettingContainer {shimmerEffect}>
  <div slot="children" class="flex flex-col join join-vertical">
    <SettingsItem
      icon="wpf:name"
      shimmerNameLength="w-[20%]"
      onTap={openNameDialog}
      name={"name"}
      {shimmerEffect}
    >
      <div slot="trailing" class="flex w-full justify-end">
        {#if shimmerEffect}
          <div
            class="h-[11px] w-full min-w-[50px] max-w-[180px] {containerRadius} bg-base-300"
          />
        {:else}
          <p
            class="max-w-[130px] xs:max-w-[190px] overflow-hidden truncate opacity-60"
          >
            {$userStore.name}
          </p>
        {/if}
      </div>
    </SettingsItem>

    <div class="h-[0.2px] w-full bg-base-content opacity-10" />
    <SettingsItem
      {shimmerEffect}
      icon="ic:baseline-phone"
      onTap={openPhoneDialog}
      shimmerNameLength="w-[40%]"
      name={"phoneNumber"}
    >
      <div slot="trailing" class="flex flex-row w-full justify-end">
        {#if shimmerEffect}
          <div
            class="h-[11px] w-full min-w-[50px] max-w-[150px] {containerRadius} bg-base-300"
          />
        {:else}
          <div class="opacity-60 flex flex-row">
            {#if $userStore.userPublicData.isVerifiedPhone}
              <VerifiedIcon />
            {/if}
            <div class="w-[5px]" />
            <p class="overflow-hidden truncate max-w-[100px] xs:max-w-[190px]">
              {formatedPhone($userStore.userPublicData.phoneNumber)}
            </p>
          </div>
        {/if}
      </div>
    </SettingsItem>

    <div class="h-[0.2px] w-full bg-base-content opacity-10" />
    <SettingsItem
      {shimmerEffect}
      icon="ic:baseline-email"
      onTap={openEmailDialog}
      shimmerNameLength="w-[30%]"
      name={"email"}
    >
      <div slot="trailing" class="flex items-center w-full justify-end">
        {#if shimmerEffect}
          <div
            class="h-[11px] w-full min-w-[50px] max-w-[250px] {containerRadius} bg-base-300"
          />
        {:else}
          <div class="opacity-60 flex flex-row">
            {#if $userStore.userPublicData.isVerifiedEmail}
              <VerifiedIcon />
            {/if}
            <div class="w-[5px]" />
            <p class="overflow-hidden truncate max-w-[130px] xs:max-w-[190px]">
              {$userStore.userPublicData.email}
            </p>
          </div>
        {/if}
      </div>
    </SettingsItem>

    <div class="h-[0.2px] w-full bg-base-content opacity-10" />
    <SettingsItem
      {shimmerEffect}
      shimmerNameLength="w-[50%]"
      icon="tabler:id"
      onTap={copyToUserIdClipboard}
      name={"userId"}
    >
      <div
        slot="trailing"
        class="flex flex-row items-center gap-2 w-full justify-end"
      >
        {#if shimmerEffect}
          <div
            class="h-[11px] w-full min-w-[50px] max-w-[350px] {containerRadius} bg-base-300"
          />
        {:else}
          <div class="opacity-60 flex flex-row">
            <p class="overflow-hidden truncate max-w-[130px] xs:max-w-[190px]">
              {#if copiedUserId}
                {translate("Copied")}
              {:else}
                {$userStore.id}
              {/if}
            </p>

            {#if copiedUserId}
              <GeneralIcon
                icon="material-symbols:check-circle-outline"
                size={22}
              />
            {/if}
          </div>
        {/if}
      </div>
    </SettingsItem>
  </div>
</SettingContainer>
