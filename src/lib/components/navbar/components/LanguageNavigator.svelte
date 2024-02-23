<script lang="ts">
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import { pushDialog } from "$lib/utils/general_utils";
  import LanguageDialog from "./LanguageDialog.svelte";
  let langDialog: HTMLDialogElement;
  function openLangDialog() {
    pushDialog(langDialog);
  }
</script>

<LanguageDialog bind:dialog={langDialog} />

<CustomCircleIcon icon="mdi:language" handleClick={openLangDialog} />
