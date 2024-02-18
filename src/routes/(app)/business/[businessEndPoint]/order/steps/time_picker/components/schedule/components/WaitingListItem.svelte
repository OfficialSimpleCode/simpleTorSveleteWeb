<script lang="ts">
  import { page } from "$app/stores";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import DownloadAppDialog from "$lib/components/dialogs/DownloadAppDialog.svelte";
  import { scheuleItemWidthClass } from "$lib/consts/css_classes";
  import type TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
  import { pushDialog } from "$lib/utils/general_utils";
  import { translate } from "$lib/utils/translate";

  export let timeObj: TimePickerObj;
  let downloadAppDialog: HTMLDialogElement;

  function onClickWaitingList() {
    pushDialog(downloadAppDialog);
  }
</script>

<!-- Dialog -->
{#if $page.state.showModal}
  <DownloadAppDialog bind:dialog={downloadAppDialog} />
{/if}
<button
  class="btn bg-primary flex flex-col gap-3 hover:opacity-90 {scheuleItemWidthClass} h-[140px] sm:h-[160px]"
  on:click={onClickWaitingList}
>
  <h3>
    {translate("joinWaitingList")}
  </h3>
  <GeneralIcon icon="gg:list" />
</button>
