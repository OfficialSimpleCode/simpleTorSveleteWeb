<script lang="ts">
  import DialogStrucher from "../../DialogStrucher.svelte";
  export let recaptchaDialog: HTMLDialogElement;
</script>

<DialogStrucher bind:dialog={recaptchaDialog}
  ><div
    id="recaptcha-container"
    class="absolute !z-[10000]"
  ></div></DialogStrucher
>
