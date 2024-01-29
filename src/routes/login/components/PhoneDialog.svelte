<script lang="ts">
  import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";
  import { translate } from "$lib/utils/translate";
  import { Icon, XCircle } from "svelte-hero-icons";

  export let dialog: HTMLDialogElement;
</script>

<dialog
  bind:this={dialog}
  class="modal modal-bottom sm:modal-middle"
  on:close={() => history.back()}
>
  <div class="modal-box bg-base-200 pb-10">
    <div class="flex justify-between items-center mb-[1rem]">
      <InfoTooltipButton message={translate("loginWithPhoneExplain")} />
      <div class="center">
        <h3 class="font-bold text-lg">{translate("loginWithPhone")}</h3>
        <h3 class="text-sm">{translate("enterPhoneNumber")}</h3>
      </div>

      <button class="btn btn-ghost" on:click={() => dialog.close()}>
        <Icon src={XCircle} size="24px" />
      </button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
