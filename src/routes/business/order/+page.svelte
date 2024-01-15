<script lang="ts">
    import ChooseDateAndTime from "./steps/ChooseDateAndTime.svelte";
    import ChooseService from "./steps/ChooseService.svelte";
    import ChooseEmployee from "./steps/ChooseEmployee.svelte";
    import { ShowToast } from "$lib/stores/ToastManager";

    let steps: string[] = ["Employee", "Service", "Date and Time"];
    let currentStep: number = 1;

    let employees: Array<Record<string, string>> = [
        {
            name: "Amit",
            role: "Manager",
            startDate: "20-03-2020",
            image: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
        },
        {
            name: "Ron",
            role: "Employee",
            startDate: "25-11-2018",
            image: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
        },
        {
            name: "Mosh",
            role: "Employee",
            startDate: "03-06-2021",
            image: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
        },
    ];
    let selectedEmployee: Record<string, string>;
    let selectedDateAndTime: Record<string, string>;

    let services: Array<Record<string, string>> = [
        { name: "Nails", price: "150", duration: "1h 20m" },
        { name: "Build", price: "340", duration: "2h 10m" },
        { name: "Hair", price: "230", duration: "1h" },
    ];
    let selectedService: Record<string, string>;

    function clickedOnStep(stepNumber: number) {
        if (stepNumber == currentStep) {
            return;
        }

        if (stepNumber == 2 && !selectedEmployee) {
            ShowToast({
                text: "Finish the current step first",
                status: "warning",
            });
            return;
        }

        if (stepNumber == 3 && !selectedService) {
            ShowToast({
                text: "Finish the current step first",
                status: "warning",
            });
            return;
        }

        currentStep = stepNumber;
    }

    function employeeSelected(employee: Record<string, string>) {
        selectedEmployee = employee;
        currentStep += 1;
    }

    function serviceSelected(service: Record<string, string>) {
        selectedService = service;
        currentStep += 1;
    }

    function dateAndTimeSelected(dateAndTime: Record<string, string>) {
        selectedDateAndTime = dateAndTime;
        currentStep += 1;
    }
</script>

<main class="h-screen w-screen flex flex-col items-center gap-8 bg-base-100">
    <ul class="steps min-h-20 w-[90%] sm:w-[60%] mt-5">
        {#each steps as step, i}
            <button
                class="step"
                class:step-success={currentStep > i}
                data-content={currentStep > i + 1 ? "✓" : (i + 1).toString()}
                on:click={() => clickedOnStep(i + 1)}
            >
                {step}
            </button>
        {/each}
    </ul>

    {#if currentStep == 1}
        <ChooseEmployee
            {employees}
            bind:selectedEmployee
            on:employee={(event) => employeeSelected(event.detail)}
        />
    {:else if currentStep == 2}
        <ChooseService
            {services}
            bind:selectedService
            on:service={(event) => serviceSelected(event.detail)}
        />
    {:else if currentStep == 3}
        <ChooseDateAndTime
            bind:selectedDateAndTime
            duration={selectedService.duration}
            on:dateAndTime={(event) => dateAndTimeSelected(event.detail)}
        />
    {/if}
</main>
