<script lang="ts">
  import GeneralDialog from "$lib/components/dialogs/GeneralDialog.svelte";
  import { translate } from "$lib/utils/translate";
  import { finishDeleteUser } from "../helpers/handle_login";
  export let dialog: HTMLDialogElement;

  async function onExit() {
    dialog.close();
  }
</script>

<GeneralDialog
  bind:dialog
  titleTransKey={"areYouSure"}
  content={translate("doYouWantToDleteTheUser")}
  cancelTranslateKey="delete"
  onSave={onExit}
  onCancel={finishDeleteUser}
  saveTranslateKey="regret"
/>
