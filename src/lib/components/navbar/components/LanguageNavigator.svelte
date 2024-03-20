<script lang="ts">
  import { pushDialog } from "$lib/utils/general_utils";
  import LanguageDialog from "./LanguageDialog.svelte";
  import NavberItem from "./NavberItem.svelte";
  export let fromMenu: boolean = false;
  let langDialog: HTMLDialogElement;
  function openLangDialog() {
    pushDialog(langDialog);
  }
</script>

<LanguageDialog bind:dialog={langDialog} />
<!-- <div class="block lg:hidden">
  <CustomCircleIcon
    icon="mdi:language"
    handleClick={openLangDialog}
    bgColor="bg-base-200"
  />
</div> -->

<div class={fromMenu ? "" : "hidden lg:block"}>
  <NavberItem
    icon="mdi:language"
    {fromMenu}
    transKey="language"
    handleClick={openLangDialog}
  />
</div>
