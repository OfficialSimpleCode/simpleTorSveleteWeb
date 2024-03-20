<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  export let showNavbarMenu: boolean;
  function onclick() {
    showNavbarMenu = !showNavbarMenu;
  }
</script>

<button
  class="btn btn-ghost btn-sm hover:text-primary hover:bg-primary hover:bg-opacity-10 lg:hidden"
  on:click={onclick}
>
  <GeneralIcon
    icon={showNavbarMenu ? "mingcute:close-line" : "ci:menu-alt-04"}
  />
</button>
