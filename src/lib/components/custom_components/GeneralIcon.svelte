<script lang="ts">
  import "iconify-icon";

  export let icon: string;

  export let size: number = 26;
  export let style: string = "";
  export let hover: boolean = false;
</script>

<div class="flex items-center justify-center {hover ? 'hover:opacity-70' : ''}">
  <iconify-icon
    inline
    {icon}
    width={size}
    height={size}
    observer="false"
    {style}
  />
</div>
