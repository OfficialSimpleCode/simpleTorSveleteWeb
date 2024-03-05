<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import SettingContainer from "$lib/components/SettingContainer.svelte";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import SettingsItem from "$lib/components/custom_components/SettingsItem.svelte";
  import VerifiedIcon from "$lib/components/custom_components/VerifiedIcon.svelte";
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

  let emailDialog: HTMLDialogElement;
  let nameDialog: HTMLDialogElement;
  let phoneDialog: HTMLDialogElement;
  let copiedUserId: boolean = false;

  function openEmailDialog() {
    pushDialog(emailDialog, `${base}/profile/email`);
  }

  function openNameDialog() {
    pushDialog(nameDialog, `${base}/profile/name`);
  }

  function openPhoneDialog() {
    pushDialog(phoneDialog, `${base}/profile/phone`);
  }

  function copyToUserIdClipboard() {
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
{#if $page.state.showModal}
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
{/if}
<SettingContainer>
  <div slot="children" class="flex flex-col join join-vertical">
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
          {formatedPhone($userStore.userPublicData.phoneNumber)}
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
      <div slot="trailing" class="flex flex-row items-center gap-2">
        <p class="overflow-hidden truncate max-w-[130px] xs:max-w-[190px]">
          {#if copiedUserId}
            {translate("Copied")}
          {:else}
            {$userStore.id}
          {/if}
        </p>

        {#if copiedUserId}
          <GeneralIcon icon="material-symbols:check-circle-outline" size={22} />
        {/if}
      </div>
    </SettingsItem>
  </div>
</SettingContainer>
