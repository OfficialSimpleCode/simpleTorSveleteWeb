<script lang="ts">
  export let icon: string;
  export let size: number = 26;
  export let color: string = "";
</script>

<iconify-icon class={color} {icon} width={size} height={size}></iconify-icon>
