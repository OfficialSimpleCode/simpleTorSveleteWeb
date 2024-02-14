<script lang="ts">
  import { LoginReason } from "$lib/consts/auth";
  import LoginPage from "../components/login/LoginPage.svelte";
</script>

<LoginPage loginReason={LoginReason.deleteUser} />
