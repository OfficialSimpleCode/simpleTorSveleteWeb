<script lang="ts">
  import { languages } from "$lib/consts/lang";
  import { containerRadius } from "$lib/consts/sizes";
  import { translate } from "$lib/utils/translate";
  import { _, locale } from "svelte-i18n";

  export let dialog: HTMLDialogElement;

  function chooseLang(language: Record<string, string>) {
    locale.set(language.locale);
  }
</script>

<dialog
  bind:this={dialog}
  on:close={() => history.back()}
  class="modal modal-bottom sm:modal-middle"
>
  <div
    class="modal-box flex flex-col bg-base-200 px-4 py-3 {containerRadius} gap-6 justify-center items-center"
  >
    <h3>{translate("pickLnaguage")}</h3>

    <div class="grid grid-cols-2 gap-3">
      {#each languages as language, i}
        <button
          class="flex flex-col hover:bg-primary bg-base-300 hover:text-primary-content items-center gap-2 p-3 px-8 {containerRadius}"
          on:click={() => chooseLang(language)}
          on:keypress={() => chooseLang(language)}
        >
          <img class="w-10 rounded" src={language.flag} alt="flag" />
          <h3 class="text-sm">{$_(language.name)}</h3>
        </button>
      {/each}
    </div>
  </div>

  <!-- backdrop close dialog -->
  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
