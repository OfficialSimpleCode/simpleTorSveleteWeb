<script lang="ts">
  import GeneralIcon from "./GeneralIcon.svelte";
  export let left: Boolean = false;
</script>

<div class="flex items-center icon ltr:hidden">
  <GeneralIcon
    icon={left ? "mdi:keyboard-arrow-right" : "mdi:keyboard-arrow-left"}
    size={26}
  />
</div>

<div class="flex items-center icon rtl:hidden">
  <GeneralIcon
    icon={left ? "mdi:keyboard-arrow-left" : "mdi:keyboard-arrow-right"}
    size={26}
  />
</div>
