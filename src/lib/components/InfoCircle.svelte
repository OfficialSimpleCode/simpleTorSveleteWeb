<script lang="ts">
  import { Icon, InformationCircle } from "svelte-hero-icons";
  export let message: string;
  let placement = "left";
</script>

<button class="hover:opacity-70" on:mouseenter={() => (placement = "left")}>
  <Icon src={InformationCircle} size="26px" />
</button>
