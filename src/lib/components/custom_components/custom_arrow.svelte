<script lang="ts">
  import { ChevronLeft, ChevronRight, Icon } from "svelte-hero-icons";
</script>

<div class="icon">
  <Icon src={document.dir == "ltr" ? ChevronRight : ChevronLeft} size="20px" />
</div>
