<script lang="ts">
  import GeneralDialog from "$lib/components/dialogs/GeneralDialog.svelte";
  import { translate } from "$lib/utils/translate";
  import { finishDeleteUser } from "../helpers/handle_login";
  export let dialog: HTMLDialogElement;
  export let loadingLogin: boolean;

  async function onExit() {
    dialog.close();
    loadingLogin = false;
  }
</script>

<GeneralDialog
  bind:dialog
  on:close={onExit}
  titleTransKey={"areYouSure"}
  content={translate("doYouWantToDleteTheUser")}
  cancelTranslateKey="delete"
  maxWidth="max-w-[400px]"
  onSave={onExit}
  onCancel={finishDeleteUser}
  saveTranslateKey="regret"
/>
