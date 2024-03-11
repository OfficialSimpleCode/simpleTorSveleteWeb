<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
  import { Icon, XCircle } from "svelte-hero-icons";
  export let titleTransKey: string = "";
  export let needTitleGender: boolean = true;
  export let title: string | undefined = undefined;
  export let dialog: HTMLDialogElement;
</script>

<div class="flex justify-between items-center mb-[1rem]">
  <button
    class=""
    on:click={() => {
      dialog.close();
    }}
  >
    <Icon src={XCircle} size="24px" />
  </button>
  <h3 class="font-bold text-md">
    {title ?? translate(titleTransKey, $_, needTitleGender)}
  </h3>
  <div class="w-[24px]" />
</div>
