<script lang="ts">
  // -----------------------------------------------
  // Importent Note: The parent element must have position: relative;
  // -----------------------------------------------

  import { Icon, InformationCircle } from "svelte-hero-icons";
  export let message: string;
</script>

<button
  class="hover:opacity-70"
  data-tooltip-target="tooltip-light"
  type="button"
  data-tip={message}
>
  <Icon src={InformationCircle} size="26px" />
</button>

<div
  id="tooltip-light"
  role="tooltip"
  class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
>
  {message}
  <div class="tooltip-arrow" data-popper-arrow></div>
</div>
