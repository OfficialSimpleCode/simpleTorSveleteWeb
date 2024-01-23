<script lang="ts">
    import { _ } from "svelte-i18n";
    import Navbar from "$lib/components/navbar/Navbar.svelte";
    import OrderCard from "./components/OrderCard.svelte";
    import TableRow from "./components/TableRow.svelte";

    let orders: Array<Record<string, any>> = [
        {
            name: "Amit Nails",
            employee: { name: "Amit", role: "manager" },
            services: "Nails Build x2",
            duration: "2h 20m",
            price: 340,
            date: "12-03-2024",
            time: "12:30",
            status: "pending",
        },
        {
            name: "Amit Nails",
            employee: { name: "Amit", role: "manager" },
            services: "Nails Build x2",
            duration: "2h 20m",
            price: 340,
            date: "12-03-2024",
            time: "12:30",
            status: "pending",
        },
        {
            name: "Amit Nails",
            employee: { name: "Amit", role: "manager" },
            services: "Nails Build x2",
            duration: "2h 20m",
            price: 340,
            date: "12-03-2024",
            time: "12:30",
            status: "approved",
        },
    ];
</script>

<main>
    <Navbar />
    <div class="pt-20 flex flex-col gap-8 items-center">
        <h1 class="text-3xl mx-10">{$_("myBookings")}</h1>
        <div class="overflow-x-auto w-full hidden md:block min-h-[400px] mx-10">
            <table class="table">
                <thead>
                    <tr>
                        <th>{$_("business")}</th>
                        <th>{$_("worker")}</th>
                        <th>{$_("treatments")}</th>
                        <th>{$_("dateAndTime")}</th>
                        <th>{$_("confirmed")}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each orders as order}
                        <TableRow {order} />
                    {/each}
                </tbody>
            </table>
        </div>
        <div
            class="flex flex-col md:hidden max-w-[95%] sm:max-w-[80%] w-full gap-6"
        >
            {#each orders as order}
                <OrderCard {order} />
            {/each}
        </div>
        <div class="pb-4 w-[90%]">
            <button
                class="btn btn-outline sm:hidden w-full"
                on:click={() => history.back()}
                >{$_("back")}
            </button>
        </div>
    </div>
</main>
