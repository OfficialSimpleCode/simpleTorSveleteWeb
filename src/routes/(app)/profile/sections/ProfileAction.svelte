<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import SettingContainer from "$lib/components/SettingContainer.svelte";
  import SettingsItem from "$lib/components/custom_components/SettingsItem.svelte";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { pushDialog } from "$lib/utils/general_utils";
  import LogoutDialog from "../components/LogoutDialog.svelte";
  let loadingLogout: boolean = false;
  let logoutDialog: HTMLDialogElement;

  function onClickLogout() {
    pushDialog(logoutDialog);
  }

  async function onDeleteUser() {
    VerificationHelper.GI().setupLoggin();
    goto(`${base}/delete-user`);
  }
</script>

<LogoutDialog bind:dialog={logoutDialog} />

<SettingContainer>
  <div slot="children" class="flex flex-col join join-vertical">
    <SettingsItem
      icon="material-symbols:logout"
      onTap={onClickLogout}
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
  </div>
</SettingContainer>
