<script lang="ts">
  import {
    contactUsSubjectStore,
    markContactUsSubjectStore,
  } from "$lib/controllers/home_page_controller";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";

  export let textTransKey: string;

  let focusFormOnTap: boolean = true;

  function onTap() {
    contactUsSubjectStore.set(translate(textTransKey, $_));

    markContactUsSubjectStore.set(true);
    setTimeout(() => {
      markContactUsSubjectStore.set(false);
    }, 1800);
  }
  onMount(() => {
    focusFormOnTap = window.innerWidth < 1024;
  });
</script>

<button
  on:click={onTap}
  class="bg-base-200 rounded-full px-4 py-1 hover:scale-[1.05] transform transition-transform duration-300"
>
  <a href={focusFormOnTap ? "#contact-form" : undefined}
    >{translate(textTransKey, $_)}</a
  >
</button>
