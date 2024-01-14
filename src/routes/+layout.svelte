<script lang="ts">
    import "../app.css";
    import ToastManager from "$lib/components/ToastManager.svelte";
</script>

<ToastManager />
<div class="h-screen w-screen">
    <slot />
</div>
