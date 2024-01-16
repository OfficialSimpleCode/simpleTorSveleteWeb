<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    type Service = Record<string, string>;

    export let services: Array<Service>;
    export let selectedService: Service;

    function serviceChosen(service: Service) {
        dispatch("service", service);
    }
</script>

<section id="service-step" class="w-full flex flex-col items-center gap-10">
    <h1 class="text-2xl">Choose Service</h1>
    <ul class="w-[%70] h-full flex flex-wrap items-center justify-center gap-7">
        {#each services as service}
            <button
                class="bg-base-200 rounded-xl min-w-[280px] sm:min-w-[380px] sm:w-[40%] h-24 sm:h-28 flex items-center px-6 box-border gap-5 border justify-between"
                class:border-black={selectedService == service}
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
</section>
