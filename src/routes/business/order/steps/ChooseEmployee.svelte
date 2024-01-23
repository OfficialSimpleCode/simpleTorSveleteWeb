<script lang="ts">
    import { _ } from "svelte-i18n";
    import { business } from "$lib/stores/Business.js";
    import type WorkerModel from "$lib/models/worker/worker_model";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let employees: Array<WorkerModel>;
    export let selectedEmployee: WorkerModel;
    const DEFUALT_PROFILE_IMAGE =
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.business2community.com%2Fwp-content%2Fuploads%2F2017%2F08%2Fblank-profile-picture-973460_640.png&f=1&nofb=1&ipt=9e0fdc4c7f54be4abb99406710ce51dc697217aa0b5d004b2a5b3c4170adf1f5&ipo=images";

    console.log();
    console.log(employees.map((e) => e.id));

    function employeeChosen(employee: WorkerModel) {
        dispatch("employee", employee);
    }

    function dateToDDMMYYFormat(date: Date): string {
        return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
    }

    function isManager(employee: WorkerModel): boolean {
        return (
            $business.businessId.slice(0, employee.id.length - 1) ==
            employee.id.slice(1)
        );
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
                        <img
                            src={employee.profileImg || DEFUALT_PROFILE_IMAGE}
                            alt="employee"
                        />
                    </div>
                </div>
                <div>
                    <h1 class="text-2xl sm:text-4xl text-start">
                        {employee.name}
                    </h1>
                    <p class="text-gray-500">
                        {$_(isManager(employee) ? "manager" : "worker")}
                        {$_("since")}: {dateToDDMMYYFormat(employee.createdAt)}
                    </p>
                </div>
            </button>
        {/each}
    </ul>
</section>
