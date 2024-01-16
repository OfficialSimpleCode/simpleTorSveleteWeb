<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    type Service = Record<string, any>;

    export let services: Array<Service>;
    export let selectedService: Service;

    let quantity: number = 1;
    $: if (selectedService) selectedService.quantity = quantity;

    function serviceChosen(service: Service) {
        selectedService = service;
    }

    function continuetoNextStep() {
        dispatch("service", selectedService);
    }
</script>

<section id="service-step" class="w-full flex flex-col items-center gap-12">
    <h1 class="text-2xl">Choose Service</h1>
    <ul class="w-[%70] h-full flex flex-wrap items-center justify-center gap-7">
        {#each services as service}
            <button
                class="bg-base-200 rounded-xl w-full max-w-[90%] sm:min-w-[380px] sm:w-[40%] h-24 sm:h-28 flex items-center px-6 box-border gap-5 border justify-between"
                class:border-black={selectedService &&
                    selectedService.name == service.name}
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
        {/each}
    </ul>

    {#if selectedService}
        <div class="flex flex-col items-center gap-4 w-full">
            <div class="join">
                <button
                    class="btn join-item"
                    on:click={() => (quantity -= quantity > 1 ? 1 : 0)}
                >
                    -
                </button>
                <input
                    bind:value={quantity}
                    type="text"
                    class="input input-bordered w-full max-w-14 join-item text-center !text-black"
                    disabled
                />
                <button class="btn join-item" on:click={() => (quantity += 1)}>
                    +
                </button>
            </div>
            <button
                class="btn btn-primary max-w-[90%] sm:max-w-sm w-full"
                on:click={continuetoNextStep}>Continue</button
            >
        </div>
    {/if}
</section>
