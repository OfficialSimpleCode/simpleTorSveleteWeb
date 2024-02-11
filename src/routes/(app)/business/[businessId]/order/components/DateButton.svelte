<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let selectedDateAndTime: Record<string, string>;
    export let date: string;
    export let time: string;

    function select() {
        dispatch("dateAndTime", { date: date, time: time });
    }

    function isSelectedDate(): boolean {
        if (!selectedDateAndTime) {
            return false;
        }
        return (
            selectedDateAndTime.date == date && selectedDateAndTime.time == time
        );
    }
</script>

<button
    class="btn btn-xs sm:btn-md"
    class:btn-primary={isSelectedDate()}
    on:click={select}
>
    {time}
</button>
