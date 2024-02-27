<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import GeneralDialog from "$lib/components/dialogs/GeneralDialog.svelte";
  import { ErrorsController } from "$lib/controllers/errors_controller";
  import UserHelper from "$lib/helpers/user/user_helper";
  import { businessStore } from "$lib/stores/Business";
  import { _, translate } from "$lib/utils/translate";

  export let dialog: HTMLDialogElement;
  async function onLogout(): Promise<boolean> {
    const resp = await UserHelper.GI().logout();

    if (resp) {
      if ($businessStore != null) {
        goto(`${base}/business/${$businessStore.url}`);
      } else {
        goto(`${base}/`);
      }
    } else {
      ErrorsController.displayError();
    }
    console.log("33333333333333333333");
    return resp;
  }
</script>

<GeneralDialog
  bind:dialog
  onSave={onLogout}
  saveTranslateKey="yes"
  cancelTranslateKey="no"
  titleTransKey="logout"
  content={translate("sureYouWantLogout", $_)}
/>
