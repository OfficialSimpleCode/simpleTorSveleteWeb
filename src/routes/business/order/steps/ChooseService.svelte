<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    type Service = Record<string, any>;

    export let services: Array<Service>;
    export let selectedServices: Array<Service>;

    function serviceChosen(service: Service) {
        service.selected = !(service.selected || false);
        console.log(service);
        service.quntity = service.selected ? 1 : 0;
        if (service.selected) {
            selectedServices = [...selectedServices, service];
        } else {
            selectedServices.splice(selectedServices.indexOf(service), 1);
            selectedServices = selectedServices;
        }
    }

    function continuetoNextStep() {
        dispatch("services", selectedServices);
    }
</script>

<section id="service-step" class="w-full flex flex-col items-center gap-12">
    <h1 class="text-2xl">Choose Service</h1>
    <ul class="w-[%70] h-full flex flex-wrap items-center justify-center gap-7">
        {#each services as service}
            <div
                class="w-full max-w-[90%] sm:min-w-[380px] sm:w-[40%] flex flex-col items-center gap-1"
            >
                <button
                    class="bg-base-200 rounded-xl w-full h-24 sm:h-28 flex items-center px-6 box-border gap-5 border justify-between"
                    class:border-black={selectedServices.includes(service)}
                    on:click={() => serviceChosen(service)}
                >
                    <h1 class="text-3xl text-start">{service.name}</h1>
                    <div class="flex items-center h-full">
                        <div class="divider divider-horizontal border-black" />
                        <div>
                            <p class="text-gray-500">
                                {service.price} ₪
                            </p>
                            <p class="text-gray-500">
                                {service.duration}
                            </p>
                        </div>
                    </div>
                </button>
                {#if service.selected}
                    <div class="join self-end">
                        <button
                            class="btn btn-sm join-item"
                            on:click={() => {
                                service.quntity -= 1;
                                if (service.quntity < 1) service.quntity = 1;
                                service = service;
                            }}
                        >
                            -
                        </button>
                        <input
                            bind:value={service.quntity}
                            type="text"
                            class="input input-sm input-bordered w-full max-w-14 join-item text-center !text-black"
                            disabled
                        />
                        <button
                            class="btn btn-sm join-item"
                            on:click={() => {
                                (service.quntity += 1), (service = service);
                            }}
                        >
                            +
                        </button>
                    </div>
                {/if}
            </div>
        {/each}
    </ul>

    {#if selectedServices.length > 0}
        <div class="flex flex-col items-center gap-4 w-full">
            <button
                class="btn btn-primary max-w-[90%] sm:max-w-sm w-full"
                on:click={continuetoNextStep}>Continue</button
            >
        </div>
    {/if}
</section>
