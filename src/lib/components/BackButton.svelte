<script lang="ts">
    import { Icon, Forward } from "svelte-hero-icons";

    export let onBack: CallableFunction = () => {};

    function back() {
        history.back();
        setTimeout(onBack, 200);
    }
</script>

<div>
    <button class="btn btn-ghost" on:click={back}>
        <Icon src={Forward} size="26px" />
    </button>
</div>
