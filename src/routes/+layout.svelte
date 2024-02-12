<script lang="ts">
  import ToastManager from "$lib/components/ToastManager.svelte";
  import { initialTheme } from "$lib/controllers/theme_controller";
  import { handleLocaleChanges } from "$lib/language/loader";
  import { onMount } from "svelte";
  import "../app.css";

  onMount(() => {
    initialTheme(localStorage, document);
    handleLocaleChanges(localStorage, document);
  });
</script>

<ToastManager />
<div class="w-full h-full">
  <slot />
</div>
