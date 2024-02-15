<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import SettingsItem from "$lib/components/custom_components/SettingsItem.svelte";
  import { containerRadius } from "$lib/consts/sizes";
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
      console.log(resp);
      if (resp) {
        if ($businessStore != null) {
          console.log("3333333333333333");
          goto(
            `${base}/business/${
              $businessStore.urlEndPoint ?? $businessStore.businessId
            }`
          );
        } else {
          console.log(base);
          console.log("222222222222");
          goto(base);
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

<section class="join join-vertical w-[90%] {containerRadius} bg-base-200">
  <SettingsItem icon="material-symbols:logout" onTap={onLogout} name={"logout"}>
    <div slot="trailing">
      {#if loadingLogout}
        <div class="loading loading-spinner" />
      {/if}
    </div>
  </SettingsItem>

  <div class="h-[0.2px] w-full bg-gray-500 opacity-20" />
  <SettingsItem icon="ph:trash-bold" onTap={onDeleteUser} name={"deleteUser"} />
</section>
