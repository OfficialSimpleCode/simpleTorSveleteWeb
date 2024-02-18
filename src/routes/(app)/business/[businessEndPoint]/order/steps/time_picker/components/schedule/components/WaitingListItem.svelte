<script lang="ts">
  import { page } from "$app/stores";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import DownloadAppDialog from "$lib/components/dialogs/DownloadAppDialog.svelte";
  import { scheuleItemWidthClass } from "$lib/consts/css_classes";
  import type TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
  import { pushDialog } from "$lib/utils/general_utils";
  import { dateToTimeStr } from "$lib/utils/times_utils";
  import { _, translate } from "$lib/utils/translate";

  export let timeObj: TimePickerObj;
  let downloadAppDialog: HTMLDialogElement;

  function onClickWaitingList() {
    pushDialog(downloadAppDialog);
  }
  const text =
    translate("joinWaitingList", $_) +
    (timeObj.displayDate != null
      ? `\n${translate("in")}${dateToTimeStr(timeObj.displayDate!)}`
      : "");
</script>

<!-- Dialog -->
{#if $page.state.showModal}
  <DownloadAppDialog bind:dialog={downloadAppDialog} />
{/if}
<button
  class="btn bg-primary flex flex-col gap-3 hover:opacity-90 {scheuleItemWidthClass} h-[140px] sm:h-[160px]"
  on:click={onClickWaitingList}
>
  <h3 class="">{text}</h3>
  <GeneralIcon icon="gg:list" />
</button>
