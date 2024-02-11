<script lang="ts">
  import LoginPage from "$lib/components/login/LoginPage.svelte";
  import { LoginReason } from "$lib/consts/auth";
</script>

<LoginPage loginReason={LoginReason.linkProvider} />
