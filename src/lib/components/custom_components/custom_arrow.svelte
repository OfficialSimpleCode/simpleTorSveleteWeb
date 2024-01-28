<script lang="ts">
  import GeneralIcon from "../GeneralIcon.svelte";
</script>

<div class="icon">
  <GeneralIcon
    icon={document.dir == "ltr"
      ? "mdi:keyboard-arrow-right"
      : "mdi:keyboard-arrow-left"}
    size={20}
  ></GeneralIcon>
</div>
