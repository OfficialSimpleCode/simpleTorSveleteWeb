<script lang="ts">
    import { Icon, InformationCircle, XCircle } from "svelte-hero-icons";
    export let message: string;
</script>

<button class="tooltip tooltip-right btn btn-ghost" data-tip={message}>
    <!-- TODO: fix for mobile devices -->
    <Icon src={InformationCircle} size="24px" />
</button>
