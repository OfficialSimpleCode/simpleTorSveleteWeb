<script lang="ts">
  import hold_smartphone from "$lib/images/hold_smartphone.webp";
  import { businessStore } from "$lib/stores/Business";
  import { downloadSimpleTor } from "$lib/utils/links_utils";
  import { _, translate } from "$lib/utils/translate";
  import GeneralDialog from "./dialogs/GeneralDialog.svelte";

  export let dialog: HTMLDialogElement;

  const dynamicLink = $businessStore.dynamicLink;
</script>

<!-- diaply general dialog with the data -->
<GeneralDialog
  bind:dialog
  titleTransKey={"downloadTheApp"}
  content={translate("downloadTheAppExplain")}
  onSave={async () => downloadSimpleTor(dynamicLink)}
  onCancel={() => {}}
  saveTranslateKey="pressToDownload"
  cancelTranslateKey="cancel"
  image={hold_smartphone}
  imageAlt={translate("downloadTheApp", $_)}
/>
