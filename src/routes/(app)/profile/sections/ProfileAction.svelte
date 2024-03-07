<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import SettingContainer from "$lib/components/SettingContainer.svelte";
  import SettingsItem from "$lib/components/custom_components/SettingsItem.svelte";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { pushDialog } from "$lib/utils/general_utils";
  import LogoutDialog from "../components/LogoutDialog.svelte";
  export let shimmerEffect: boolean = false;
  let loadingLogout: boolean = false;
  let logoutDialog: HTMLDialogElement;
  let loadingDelete: boolean = false;

  function onClickLogout() {
    pushDialog(logoutDialog);
  }

  async function onDeleteUser() {
    if (loadingDelete) {
      return;
    }
    VerificationHelper.GI().setupLoggin();

    loadingDelete = true;
    try {
      await goto(`${base}/delete-user`);
    } finally {
      loadingDelete = false;
    }
  }
</script>

<LogoutDialog bind:dialog={logoutDialog} />

<SettingContainer {shimmerEffect}>
  <div slot="children" class="flex flex-col join join-vertical">
    <SettingsItem
      {shimmerEffect}
      icon="material-symbols:logout"
      shimmerNameLength="w-[30%]"
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
      {shimmerEffect}
      shimmerNameLength="w-[45%]"
      icon="ph:trash-bold"
      loading={loadingDelete}
      onTap={onDeleteUser}
      name={"deleteUser"}
    />
  </div>
</SettingContainer>
