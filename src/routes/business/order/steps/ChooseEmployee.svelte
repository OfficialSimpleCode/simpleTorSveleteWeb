<script lang="ts">
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
    <h1 class="text-2xl">Choose Employee</h1>
    <ul class="w-[%70] h-full flex flex-wrap items-center justify-center gap-7">
        {#each employees as employee}
            <button
                class="bg-base-200 rounded-xl min-w-[380px] w-[40%] h-32 flex items-center px-6 box-border gap-5 border"
                class:border-black={selectedEmployee == employee}
                on:click={() => employeeChosen(employee)}
            >
                <div class="avatar">
                    <div class="w-20 rounded-full">
                        <img src={employee.image} alt="employee" />
                    </div>
                </div>
                <div>
                    <h1 class="text-4xl text-start">{employee.name}</h1>
                    <p class="text-gray-500">
                        {employee.role} sains: {employee.startDate}
                    </p>
                </div>
            </button>
        {/each}
    </ul>
</section>
