<script lang="ts">
  import { Update } from "$lib/models/business/update_model";
  import { Icon, XCircle } from "svelte-hero-icons";
  import DialogStrucher from "./DialogStrucher.svelte";

  export let dialog: HTMLDialogElement;
  export let update: Update | undefined;
</script>

<DialogStrucher bind:dialog onlyTop={true}>
  <div class="modal-box bg-base-200 items-center max-w-[500px]">
    <div class="flex flex-col gap-3 items-center h-full">
      <!-- title and top buttons -->
      <div class="flex flex-row justify-between items-center relative">
        <!-- close button -->
        <button class="btn btn-ghost" on:click={() => dialog.close()}>
          <Icon src={XCircle} size="24px" />
        </button>

        <!-- title -->
        <h3 class="font-bold text-lg text-center">
          {update?.title ?? ""}
        </h3>

        <p></p>
      </div>

      <!-- term text -->
      <h3 class="text-sm text-center mx-6 mb-8">
        {update?.content ?? ""}
      </h3>
    </div>
  </div>
</DialogStrucher>
