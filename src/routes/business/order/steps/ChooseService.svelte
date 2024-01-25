<script lang="ts">
  import type Treatment from "$lib/models/general/treatment_model";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { _ } from "svelte-i18n";

  import { ShowToast } from "$lib/stores/ToastManager";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  type Service = Treatment;

  export let selectedEmployee: WorkerModel;
  export let selectedServices: Array<Service>;

  let selectMultiple: boolean = false;
  $: if (!selectMultiple) {
    selectedServices = [];
  }

  function serviceChosen(service: Service, ss: Array<Service>) {
    if (selectMultiple) {
      if (!ss.includes(service)) {
        selectedServices = addService(service, ss);
      } else {
        while (selectedServices.includes(service)) {
          selectedServices = removeService(service, ss);
        }
      }
    } else {
      continuetoNextStep();
    }
  }

  function addService(
    service: Service,
    selectedServices: Array<Service>
  ): Array<Service> {
    if (selectedServices.length >= selectedEmployee.maxTreatments) {
      ShowToast({
        text: $_("userMaxTreatments").replace(
          "AMOUNT",
          selectedEmployee.maxTreatments.toString()
        ),
        status: "fail",
      });
      return selectedServices;
    }
    selectedServices = [...selectedServices, service];
    return selectedServices;
  }

  function removeService(
    service: Service,
    selectedServices: Array<Service>
  ): Array<Service> {
    selectedServices.splice(selectedServices.indexOf(service), 1);
    return selectedServices;
  }

  function serviceCount(service: Service, selectedServices: Array<Service>) {
    let equalArr: Array<number> = selectedServices.map((s) =>
      s === service ? 1 : 0
    );

    if (equalArr.length == 0) {
      return 0;
    }

    return equalArr.reduce((a: any, b: any) => a + b);
  }

  function continuetoNextStep() {
    dispatch("services", selectedServices);
  }
</script>

<section id="service-step" class="w-full flex flex-col items-center gap-12">
  <h1 class="text-2xl">{$_("pickServices")}</h1>
  <ul
    class="h-full w-full max-w-[90%] flex flex-col items-center justify-center gap-7"
  >
    <div class="w-full sm:w-[40%] flex flex-row items-center justify-between">
      {$_("chooseMulti")}
      <input
        bind:checked={selectMultiple}
        type="checkbox"
        class="toggle toggle-accent"
      />
    </div>

    {#each selectedEmployee.treatmentsSubjects as [name, subject]}
      {subject.name}
      {#each subject.treatments as [name, service]}
        <div
          class="w-full sm:min-w-[480px] sm:w-[40%] flex flex-col items-center gap-1"
        >
          <button
            class="bg-base-200 rounded-xl w-full h-20 sm:h-28 flex items-center px-6 box-border gap-5 border justify-between"
            class:border-black={selectedServices.includes(service)}
            on:click={() => serviceChosen(service, selectedServices)}
          >
            <h1 class="text-lg sm:text-3xl text-start">
              {service.name}
            </h1>
            <div class="flex items-center h-full">
              <div class="divider divider-horizontal border-black" />
              <div class="flex flex-col">
                <p class="text-gray-500 whitespace-nowrap" dir="ltr">
                  {service.price}
                </p>
                <p class="text-gray-500">
                  {service.totalMinutes}
                </p>
              </div>
            </div></button
          >
          {#if serviceCount(service, selectedServices) > 0}
            <div class="join self-end">
              <button
                class="btn btn-sm join-item"
                on:click={() =>
                  (selectedServices = removeService(service, selectedServices))}
              >
                -
              </button>
              <input
                value={serviceCount(service, selectedServices)}
                type="text"
                class="input input-sm input-bordered w-full max-w-14 join-item text-center !text-black"
                disabled
              />
              <button
                class="btn btn-sm join-item"
                on:click={() =>
                  (selectedServices = addService(service, selectedServices))}
              >
                +
              </button>
            </div>
          {/if}
        </div>
      {/each}
    {/each}
  </ul>

  {#if selectedServices.length > 0}
    <div class="flex flex-col items-center gap-4 w-full">
      <button
        class="btn btn-primary max-w-[90%] sm:max-w-sm w-full"
        on:click={continuetoNextStep}
        >{$_("continue")}
      </button>
    </div>
  {/if}
</section>
