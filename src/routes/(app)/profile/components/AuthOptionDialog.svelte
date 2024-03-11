<script lang="ts">
  import DialogTitel from "$lib/components/custom_components/DialogTitel.svelte";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import ConfirmActionDialog from "$lib/components/dialogs/ConfirmActionDialog.svelte";
  import DialogStrucher from "$lib/components/dialogs/DialogStrucher.svelte";
  import {
    AuthProvider,
    authProviderToImage,
    authProviderToStr,
  } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { isConnectedStore } from "$lib/stores/User";
  import { pushDialog } from "$lib/utils/general_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { _, translate } from "$lib/utils/translate";

  export let explainDialog: HTMLDialogElement;
  export let authProvider: AuthProvider;
  export let date: Date;
  let makeSureDeleteialog: HTMLDialogElement;
  $: oldUser =
    $isConnectedStore != null
      ? VerificationHelper.GI().userData?.displayName?.includes("&&")
      : true;
  $: lastProvider =
    $isConnectedStore != null
      ? VerificationHelper.GI().existsLoginProviders.size <= 1
      : true;
  function onDelete() {
    if (lastProvider) {
      return;
    }
    if (oldUser) {
      return;
    }
    explainDialog.close();
    pushDialog(makeSureDeleteialog);
  }

  async function deleteProvider(): Promise<boolean> {
    return await VerificationHelper.GI().unlinkProvider(authProvider);
  }
</script>

<ConfirmActionDialog
  bind:dialog={makeSureDeleteialog}
  contentTransKey="providerDeletionExplain"
  titleTransKey="providerDeletion"
  onSave={deleteProvider}
/>

<DialogStrucher bind:dialog={explainDialog} onlyMiddle={true}>
  <div
    class="modal-box bg-base-200 pb-10 flex flex-col justify-center gap-6 max-w-[400px]"
  >
    <DialogTitel titleTransKey={"authProvider"} dialog={explainDialog} />
    <div class="flex flex-col gap-3 items-center h-full">
      <img
        src={authProviderToImage[authProvider]}
        alt={authProviderToStr[authProvider]}
        class="image-center w-[50px]"
      />
      <h3 class="text-center font-bold text-sm">
        {translate("verifBy", $_)
          .replaceAll(
            "PROVIDER",
            translate(authProviderToStr[authProvider] ?? "", $_)
          )
          .replaceAll(
            "DATE",
            date == new Date(0)
              ? translate("notAvailable", $_)
              : dateToDateStr(date)
          )}
      </h3>
    </div>
    <div class="flex flex-col gap-2 w-full items-center">
      <button
        class=" bg-red-600 btn btn-sm {lastProvider || oldUser
          ? 'opacity-50'
          : ''}"
        on:click={onDelete}
      >
        <div
          class="flex flex-row gap-1 min-w-10 justify-center px-7 items-center text-white"
        >
          <GeneralIcon icon="mdi:trash" size={20} />
          {translate("delete", $_)}
        </div>
      </button>
      {#if lastProvider}
        <p class="text-center text-xs opacity-70">
          {translate("cantDeleteLastProviderDeleteUser", $_)}
        </p>
      {/if}

      {#if oldUser}
        <p class="text-center text-xs opacity-70">
          {translate("oldUserExplain", $_)}
        </p>
      {/if}
    </div>
  </div>
</DialogStrucher>
