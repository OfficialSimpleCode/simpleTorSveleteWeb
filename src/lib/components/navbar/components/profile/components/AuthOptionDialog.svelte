<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";
  import {
    AuthProvider,
    authProviderToImage,
    authProviderToStr,
  } from "$lib/consts/auth";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { translate } from "$lib/utils/translate";

  import { Icon, XCircle } from "svelte-hero-icons";

  export let explainDialog: HTMLDialogElement;
  export let authProvider: AuthProvider;
  export let date: Date;

  function onDelete() {}
</script>

<dialog
  bind:this={explainDialog}
  class="modal modal-bottom sm:modal-middle"
  on:close={() => history.back()}
>
  <div class="modal-box bg-base-200 pb-10">
    <div class="flex justify-between items-center mb-[1rem]">
      <InfoTooltipButton message="Placeholder TODO" />
      <h3 class="font-bold text-me">{translate("authProvider")}</h3>
      <button class="btn btn-ghost" on:click={() => explainDialog.close()}>
        <Icon src={XCircle} size="24px" />
      </button>
    </div>
    <img
      src={authProviderToImage[authProvider]}
      alt={authProviderToStr[authProvider]}
      class="image-center w-[30px]"
    />
    <h3 class="text-center font-bold text-sm">
      {translate("verifBy")
        .replaceAll(
          "PROVIDER",
          translate(authProviderToStr[authProvider] ?? "")
        )
        .replaceAll(
          "DATE",
          date == new Date(0) ? translate("notAvailable") : dateToDateStr(date)
        )}
    </h3>
    <button class="bg-red-600 btn btn-ghost self-center" on:click={onDelete}>
      <GeneralIcon icon="mdi:trash" size={20} />
    </button>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
