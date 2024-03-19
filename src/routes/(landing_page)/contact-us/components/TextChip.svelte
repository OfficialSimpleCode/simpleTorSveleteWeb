<script lang="ts">
  import { contactUsSubjectStore } from "$lib/controllers/home_page_controller";
  import { _, translate } from "$lib/utils/translate";

  export let textTransKey: string;

  function onTap() {
    contactUsSubjectStore.set(translate(textTransKey, $_));
  }
</script>

<button
  on:click={onTap}
  class="bg-base-200 rounded-full px-4 py-1 hover:scale-[1.05] transform transition-transform duration-300"
>
  {translate(textTransKey, $_)}
</button>
