<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { LoginReason } from "$lib/consts/auth";
  import { isConnectedStore } from "$lib/stores/User";
  import { onMount } from "svelte";
  import LoginPage from "../components/login/LoginPage.svelte";
  onMount(() => {
    isConnectedStore.subscribe((value) => {
      if (value === false) {
        goto(`${base}/login`);
      }
    });
  });
</script>

<LoginPage loginReason={LoginReason.linkProvider} />
