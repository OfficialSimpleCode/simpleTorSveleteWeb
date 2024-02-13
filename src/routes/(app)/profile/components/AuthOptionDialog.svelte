<script lang="ts">
  import { page } from "$app/stores";
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import ConfirmActionDialog from "$lib/components/dialogs/ConfirmActionDialog.svelte";
  import {
    AuthProvider,
    authProviderToImage,
    authProviderToStr,
  } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { pushDialog } from "$lib/utils/general_utils";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { translate } from "$lib/utils/translate";

  import { Icon, XCircle } from "svelte-hero-icons";

  export let explainDialog: HTMLDialogElement;
  export let authProvider: AuthProvider;
  export let date: Date;
  let makeSureDeleteialog: HTMLDialogElement;

  function onDelete() {
    explainDialog.close();
    pushDialog(makeSureDeleteialog);
  }

  async function deleteProvider(): Promise<boolean> {
    return await VerificationHelper.GI().unlinkProvider(authProvider);
  }
</script>

{#if $page.state.showModal}
  <ConfirmActionDialog
    bind:dialog={makeSureDeleteialog}
    contentTransKey="providerDeletionExplain"
    titleTransKey="providerDeletion"
    onSave={deleteProvider}
  />
{/if}
<dialog
  bind:this={explainDialog}
  class="modal modal-middle"
  on:close={() => history.back()}
>
  <div class="modal-box bg-base-200 pb-10 flex flex-col justify-center gap-3">
    <div class="flex justify-between items-center mb-[1rem]">
      <h3 class="font-bold text-me">{translate("authProvider")}</h3>
      <button class="btn btn-ghost" on:click={() => explainDialog.close()}>
        <Icon src={XCircle} size="24px" />
      </button>
    </div>
    <div class="flex flex-col gap-3 items-center h-full">
      <img
        src={authProviderToImage[authProvider]}
        alt={authProviderToStr[authProvider]}
        class="image-center w-[50px]"
      />
      <h3 class="text-center font-bold text-sm">
        {translate("verifBy")
          .replaceAll(
            "PROVIDER",
            translate(authProviderToStr[authProvider] ?? "")
          )
          .replaceAll(
            "DATE",
            date == new Date(0)
              ? translate("notAvailable")
              : dateToDateStr(date)
          )}
      </h3>
    </div>

    <button class="bg-red-600 btn min-w-10" on:click={onDelete}>
      <div class="flex flex-row gap-1 min-w-10">
        <GeneralIcon icon="mdi:trash" size={20} />
        {translate("delete")}
      </div>
    </button>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
