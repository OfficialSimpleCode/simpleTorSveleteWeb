<script lang="ts">
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    type Employee = Record<string, string>;

    export let employees: Array<Employee>;
    export let selectedEmployee: Employee;

    function employeeChosen(employee: Employee) {
        dispatch("employee", employee);
    }
</script>

<section id="employee-step" class="w-full flex flex-col items-center gap-10">
    <h1 class="text-2xl">{$_("chooseWorkers")}</h1>
    <ul class="w-[%70] h-full flex flex-wrap items-center justify-center gap-7">
        {#each employees as employee}
            <button
                class="bg-base-200 rounded-xl w-full max-w-[90%] sm:min-w-[380px] sm:w-[40%] h-20 sm:h-32 flex items-center px-6 box-border gap-5 border"
                class:border-black={selectedEmployee == employee}
                on:click={() => employeeChosen(employee)}
            >
                <div class="avatar">
                    <div class="w-14 sm:w-20 rounded-full">
                        <img src={employee.image} alt="employee" />
                    </div>
                </div>
                <div>
                    <h1 class="text-2xl sm:text-4xl text-start">
                        {employee.name}
                    </h1>
                    <p class="text-gray-500">
                        {$_(employee.role.toLowerCase())}
                        {$_("since")}: {employee.startDate}
                    </p>
                </div>
            </button>
        {/each}
    </ul>
</section>
