<script lang="ts">
  import DialogStrucher from "$lib/components/dialogs/DialogStrucher.svelte";
  import { languages } from "$lib/consts/lang";
  import { containerRadius } from "$lib/consts/sizes";
  import { translate } from "$lib/utils/translate";
  import { _, locale } from "svelte-i18n";

  export let dialog: HTMLDialogElement;

  function chooseLang(language: Record<string, string>) {
    locale.set(language.locale);
  }
</script>

<DialogStrucher bind:dialog onlyMiddle={true}>
  <div
    class="modal-box flex flex-col bg-base-200 px-4 py-3 {containerRadius} gap-6 justify-center items-center max-w-[300px]"
  >
    <h3>{translate("pickLnaguage")}</h3>

    <div class="grid grid-cols-2 gap-3">
      {#each languages as language, i}
        <button
          class="flex flex-col hover:bg-primary bg-base-300 hover:text-primary-content items-center gap-2 p-3 px-8 {containerRadius} {$locale ==
          language.locale
            ? 'bg-primary text-primary-content'
            : 'bg-base-300'}"
          on:click={() => chooseLang(language)}
          on:keypress={() => chooseLang(language)}
        >
          <img
            class="w-10 rounded"
            src={language.flag}
            alt={translate("flagOf", $_).replaceAll("COUNTRY", language.name)}
          />
          <p class="text-sm">{$_(language.name)}</p>
        </button>
      {/each}
    </div>
  </div>
</DialogStrucher>
