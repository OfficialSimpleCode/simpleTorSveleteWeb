<script lang="ts">
  import GeneralIcon from "./GeneralIcon.svelte";
  export let size: number = 13;
</script>

<div class="flex items-center icon">
  <GeneralIcon icon="material-symbols:verified" {size}></GeneralIcon>
</div>
