<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import SettingContainer from "$lib/components/SettingContainer.svelte";
  import SettingsItem from "$lib/components/custom_components/SettingsItem.svelte";
  import UserHelper from "$lib/helpers/user/user_helper";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { businessStore } from "$lib/stores/Business";
  let loadingLogout: boolean = false;
  async function onLogout() {
    if (loadingLogout) {
      return;
    }
    loadingLogout = true;
    try {
      const resp = await UserHelper.GI().logout();

      if (resp) {
        if ($businessStore != null) {
          goto(`${base}/business/${$businessStore.url}`);
        } else {
          goto(`${base}/`);
        }
      }
    } finally {
      loadingLogout = false;
    }
  }

  async function onDeleteUser() {
    VerificationHelper.GI().setupLoggin();
    goto(`${base}/delete-user`);
  }
</script>

<SettingContainer>
  <div slot="children" class="flex flex-col join join-vertical">
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
  </div>
</SettingContainer>
