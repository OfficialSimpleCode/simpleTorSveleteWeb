<script lang="ts">
  import GeneralIcon from "../GeneralIcon.svelte";
</script>

<div class="flex items-center icon">
  <GeneralIcon
    icon={document.dir == "ltr"
      ? "mdi:keyboard-arrow-right"
      : "mdi:keyboard-arrow-left"}
    size={26}
  ></GeneralIcon>
</div>
