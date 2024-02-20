<script lang="ts">
  import { Icon, InformationCircle } from "svelte-hero-icons";
  export let message: string;
</script>

<button
  class="tooltip tooltip-right btn btn-ghost"
  class:opacity-0={message.length == 0}
  class:cursor-default={message.length == 0}
  data-tip={message}
>
  <Icon src={InformationCircle} size="24px" />
</button>
