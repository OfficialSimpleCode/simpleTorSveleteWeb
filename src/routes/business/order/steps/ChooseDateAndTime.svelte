<script lang="ts">
    import DateButton from "./../components/DateButton.svelte";
    import {
        Icon,
        Calendar,
        ChevronRight,
        ChevronLeft,
    } from "svelte-hero-icons";

    export let selectedDateAndTime: Record<string, string>;

    let now: Date = new Date();
    let monthName: string = now.toLocaleString("default", { month: "long" });
    export let duration: string;

    let availableHours: Record<string, Array<string>> = {
        "15-01-2024": ["15:00", "17:00", "20:30"],
        "16-01-2024": ["10:00", "15:00", "17:00", "20:30"],
        "17-01-2024": ["15:00", "17:00", "20:30"],
        "18-01-2024": ["15:00", "17:00", "20:30"],
        "19-01-2024": [
            "10:25",
            "12:45",
            "13: 30",
            "15:00",
            "17:00",
            "20:30",
            "21:45",
            "22:12",
            "23:35",
        ],
        "20-01-2024": ["15:00", "17:00", "20:30"],
    };

    let longestDayLength: number = Object.values(availableHours).reduce(
        (a, b) => (a.length > b.length ? a : b),
    ).length;

    function addDays(date: Date, days: number): Date {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function formatDateToDDMMYY(date: Date): string {
        let day: any = date.getDate();
        let month: any = date.getMonth() + 1; // Adding 1 because getMonth() returns values from 0 to 11
        let year: any = date.getFullYear();

        // Add leading zero if day or month is less than 10
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;

        return day + "-" + month + "-" + year;
    }

    function haveHours(date: Date): boolean {
        let dateFormat: string = formatDateToDDMMYY(date);
        return (
            availableHours[dateFormat] && availableHours[dateFormat].length > 0
        );
    }

    function getAvailableHourForDate(date: Date): string {
        let dateFormat: string = formatDateToDDMMYY(date);
        let hour: string = availableHours[dateFormat][0];
        availableHours[dateFormat].splice(0, 1);
        return hour;
    }
</script>

<section id="date-step" class="w-full flex flex-col items-center gap-2">
    <div class="text-center">
        <h1 class="text-2xl">Choose Date and Time</h1>
        <h3 class="text-gray-500">Total Duration: {duration}</h3>
    </div>
    <div class="w-full">
        <div class="divider" />
        <div class="flex justify-between items-center">
            <div class="flex items-center mx-4 gap-2">
                <Icon src={Calendar} size="28px" />
                <button class="btn btn-s">
                    <Icon src={ChevronLeft} size="24px" />
                </button>
            </div>
            <h3>
                {monthName}
                {now.getFullYear()}
            </h3>
            <div class="mx-4">
                <button class="btn btn-s">
                    <Icon src={ChevronRight} size="24px" />
                </button>
            </div>
        </div>
        <div class="divider" />
        <div class="overflow-x-auto mb-8">
            <table class="table table-xs sm:table">
                <thead>
                    <tr>
                        {#each { length: 5 } as _, i}
                            <th>
                                <div class="flex flex-col items-center">
                                    <div class:text-primary={i == 0}>
                                        {addDays(now, i)
                                            .toLocaleString("en-us", {
                                                weekday: "long",
                                            })
                                            .substring(0, 3)}
                                    </div>
                                    <div class:text-primary={i == 0}>
                                        {addDays(now, i).getDate()}
                                    </div>
                                </div>
                            </th>
                        {/each}
                    </tr>
                </thead>
                <tbody class="overflow-scroll">
                    {#each { length: longestDayLength } as _, i}
                        <tr class="h-12 sm:h-20">
                            {#each { length: 5 } as _, i}
                                <td class="text-center">
                                    {#if haveHours(addDays(now, i))}
                                        <DateButton
                                            bind:selectedDateAndTime
                                            date={formatDateToDDMMYY(
                                                addDays(now, i),
                                            )}
                                            time={getAvailableHourForDate(
                                                addDays(now, i),
                                            )}
                                            on:dateAndTime
                                        />
                                    {/if}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</section>
