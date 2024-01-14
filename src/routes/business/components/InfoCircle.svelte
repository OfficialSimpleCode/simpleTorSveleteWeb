<script lang="ts">
    // -----------------------------------------------
    // Importent Note: The parent element must have position: relative;
    // -----------------------------------------------

    import { Icon, InformationCircle } from "svelte-hero-icons";
    export let message: string;
    export let location: "left" | "right" = "right";
</script>

<div
    class="absolute top-4 tooltip"
    class:right-4={location == "right"}
    class:tooltip-left={location == "right"}
    class:left-4={location == "left"}
    class:tooltip-right={location == "left"}
    data-tip={message}
>
    <Icon src={InformationCircle} size="26px" />
</div>
