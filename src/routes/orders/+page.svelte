<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";

    let orders: Array<Record<string, any>> = [
        {
            name: "Amit Nails",
            employee: { name: "Amit", role: "manager" },
            services: "Nails Build x2",
            duration: "2h 20m",
            price: 340,
            date: "12-03-2024",
            time: "12:30",
        },
    ];
    let notifications: Array<Record<string, any>> = [];
    let profile: Record<string, string> = {};
    let loggedIn: boolean = true;
</script>

<main>
    <Navbar {notifications} {loggedIn} {profile} />
    <div class="pt-20 mx-10 flex flex-col gap-8 items-center">
        <h1 class="text-3xl">Pending Appointments</h1>
        <div class="overflow-x-auto w-full">
            <table class="sm:table table-xs">
                <thead>
                    <tr>
                        <th>Business</th>
                        <th>Employee</th>
                        <th>Services</th>
                        <th>Date and Time</th>
                        <th>Confirm Arrival</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each orders as order}
                        <tr class="group hover:bg-base-200">
                            <td>
                                <div class="flex items-center gap-3">
                                    <div class="avatar">
                                        <div
                                            class="mask mask-squircle w-12 h-12"
                                        >
                                            <img
                                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                                alt="business profile"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold">
                                            {order.name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-col items-start gap-2">
                                    <div class="font-bold">
                                        {order.employee.name}
                                    </div>
                                    <span class="badge badge-ghost badge-sm">
                                        {order.employee.role}
                                    </span>
                                </div>
                            </td>
                            <td class="flex flex-col items-start gap-2">
                                {order.services}
                                <div class="flex items-start gap-1">
                                    <span class="badge badge-ghost badge-sm">
                                        {order.price} ₪
                                    </span>
                                    <span class="badge badge-ghost badge-sm">
                                        {order.duration}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <h3 class="text-primary">
                                    {order.date}
                                </h3>
                                <h3 class="text-primary">
                                    {order.time}
                                </h3>
                            </td>
                            <td>
                                <label>
                                    <input type="checkbox" class="checkbox checkbox-success" />
                                </label>
                            </td>
                            <th
                                class="sm:opacity-0 sm:group-hover:opacity-100 max-w-[100px]"
                            >
                                <div
                                    class="flex flex-row justify-center items-center"
                                >
                                    <button class="btn btn-ghost btn-xs">
                                        Load Business
                                    </button>
                                    <button class="btn btn-ghost btn-xs">
                                        Navigate
                                    </button>
                                </div>
                                <div
                                    class="flex flex-row justify-center items-center"
                                >
                                    <button class="btn btn-ghost btn-xs">
                                        Edit
                                    </button>
                                    <button
                                        class="btn btn-ghost btn-xs text-error"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </th>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>
