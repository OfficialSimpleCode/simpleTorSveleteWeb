<script lang="ts">
  import DialogStrucher from "../../DialogStrucher.svelte";
  export let recaptchaDialog: HTMLDialogElement;
</script>

<DialogStrucher bind:dialog={recaptchaDialog}></DialogStrucher>
