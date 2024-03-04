<script lang="ts">
  import { pushDialog } from "$lib/utils/general_utils";
  import { Icon, InformationCircle } from "svelte-hero-icons";
  import GeneralDialog from "./dialogs/GeneralDialog.svelte";
  export let message: string;
  let explainDialog: HTMLDialogElement;

  function onClick() {
    pushDialog(explainDialog);
  }
</script>

<GeneralDialog
  bind:dialog={explainDialog}
  titleTransKey="info"
  content={message}
  maxWidth="max-w-[400px]"
  showCancel={false}
  saveTranslateKey={"ok"}
/>
<button class="hover:opacity-70" on:click={onClick}>
  <Icon src={InformationCircle} size="26px" />
</button>
