<script lang="ts">
  import { _, translate } from "$lib/utils/translate";

  export let textTransKey: string;
  export let subject: string;

  function onTap() {
    subject = translate(textTransKey, $_);
  }
</script>

<button
  on:click={onTap}
  class="bg-base-300 rounded-full px-4 py-1 hover:scale-[1.05] transform transition-transform duration-300"
>
  {translate(textTransKey, $_)}
</button>
