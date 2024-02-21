<script lang="ts">
  import { LoginReason } from "$lib/consts/auth";
  import { isConnectedStore, userStore } from "$lib/stores/User";

  import { _, translate } from "$lib/utils/translate";
  export let loginReason: LoginReason;
</script>

<div class="flex flex-row justify-between w-full gap-4">
  <div class="flex flex-col items-start">
    <h1 class="text-2xl text-start">
      {translate(
        loginReason === LoginReason.deleteUser
          ? "deleteUser"
          : loginReason === LoginReason.linkProvider
            ? "addingAuthProvider"
            : "loggin",
        $_
      )}
    </h1>

    <p class="text-xs text-start opacity-70">
      {loginReason === LoginReason.deleteUser
        ? translate("deleteUserIsSesnstive", $_, false)
        : loginReason === LoginReason.linkProvider
          ? translate("yourAcountIsImportantForUs", $_)
          : translate("loginExplain", $_)}.
      <!-- if have businesses need to notify him -->
      {loginReason === LoginReason.deleteUser &&
      (!$isConnectedStore ||
        $userStore.userPublicData.myBuisnessesIds.length > 0)
        ? translate("deleteUserExplainWithBusinesss", $_)
        : ""}
    </p>
  </div>
  {#if $isConnectedStore == null}
    <div class="loading loading-spinner" />
  {/if}
</div>
