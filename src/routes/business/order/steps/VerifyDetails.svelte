<script lang="ts">
    import { _ } from "svelte-i18n";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import {
        Icon,
        Clock,
        Calendar,
        WrenchScrewdriver,
        ChevronRight,
    } from "svelte-hero-icons";

    import type WorkerModel from "$lib/models/worker/worker_model";
    import TipDialog from "../components/TipDialog.svelte";

    export let employee: WorkerModel;
    export let services: Array<Record<string, any>>;
    export let totalServicesDuration: string;
    export let dateAndTime: Record<string, string>;

    let paymentDialog: HTMLDialogElement;

    let totalServicesPrice: number = services
        .map((s) => s.price * s.quntity)
        .reduce((a, b) => a + b);

    let totalNumberOfServices: number = services
        .map((s) => s.quntity)
        .reduce((a, b) => a + b);

    function getWeekdayFromDate(dateString: string): string {
        // Parse the date string into a Date object
        var dateObject = new Date(dateString);

        // Get the day of the week (0-6)
        var dayOfWeek = dateObject.getDay();

        // Define an array of weekday names
        var weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        // Get the weekday name
        var weekdayName = weekdays[dayOfWeek];

        return weekdayName;
    }

    function gotoServicesStep() {
        dispatch("edit-services", {});
    }
</script>

<!-- Dialogs -->
<TipDialog bind:dialog={paymentDialog} bind:amount={totalServicesPrice} />

<section class="flex flex-col items-center gap-8 w-[90%] sm:w-[70%]">
    <h1 class="text-3xl text-center">
        {$_("bookAnOrder")}
        {$_("to")}
        <span class="font-bold text-primary">{employee.name}</span>
    </h1>
    <div
        class="card shrink-0 w-full sm:w-[70%] bg-base-200 max-h-24 sm:max-h-full"
    >
        <div
            class="card-body flex flex-row items-center justify-center p-2 sm:p-8 gap-8"
        >
            <div class="flex flex-row items-center gap-3">
                <Icon src={Calendar} size="26px" />
                <div class="flex flex-col items-center justify-center">
                    <h3 class="sm:text-xl text-primary">{dateAndTime.date}</h3>
                    <h3 class="sm:text-xl text-primary">
                        {getWeekdayFromDate(dateAndTime.date)}
                    </h3>
                </div>
            </div>
            <div class="flex flex-row items-center gap-3">
                <Icon src={Clock} size="26px" />
                <div>
                    <h3 class="sm:text-xl text-primary">{dateAndTime.time}</h3>
                </div>
            </div>
        </div>
    </div>

    <button
        class="card shrink-0 bg-base-200 hover:bg-base-300 w-full sm:w-[70%]"
        on:click={gotoServicesStep}
    >
        <div
            class="card-body flex flex-row items-center justify-between py-2 sm:p-8"
        >
            <div class="flex flex-row items-center gap-4">
                <Icon src={WrenchScrewdriver} size="26px" />
                <div class="flex flex-col items-start justify-between">
                    <h3 class="font-semibold">
                        {totalNumberOfServices} services
                    </h3>
                    <h3 class="flex flex-row items-center">
                        {totalServicesPrice} ₪
                        <div class="divider divider-horizontal mx-0 sm:mx-2" />
                        <h3>
                            {totalServicesDuration}
                        </h3>
                    </h3>
                </div>
            </div>
            <Icon src={ChevronRight} size="26px" />
        </div>
    </button>

    <label class="form-control w-full sm:w-[70%]">
        <div class="label">
            <span class="label-text sm:text-lg"
                >{$_("note")} ({$_("optional")})</span
            >
        </div>
        <input
            type="text"
            placeholder="Note to employee"
            class="input input-bordered sm:input-lg w-full"
        />
    </label>

    <button
        class="btn sm:btn-lg btn-primary"
        on:click={() => paymentDialog.showModal()}>Confirm Appointment</button
    >
</section>
