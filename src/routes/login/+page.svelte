<script lang="ts">
  import LoginPage from "$lib/components/login/LoginPage.svelte";
  import { LoginReason } from "$lib/consts/auth";
</script>

<!-- Dialog -->
<!-- {#if $page.state.showModal}
  <PhoneDialog bind:dialog={phoneDialog} />
{/if} -->

<LoginPage loginReason={LoginReason.login} />
