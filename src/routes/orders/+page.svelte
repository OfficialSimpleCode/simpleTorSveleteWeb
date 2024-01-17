<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import { Icon, ChevronRight, Calendar, Clock } from "svelte-hero-icons";

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
    let notifications: Array<Record<string, any>> = [];
    let profile: Record<string, string> = {};
    let loggedIn: boolean = true;
</script>

<main>
    <Navbar {notifications} {loggedIn} {profile} />
    <div class="pt-20 flex flex-col gap-8 items-center">
        <h1 class="text-3xl mx-10">Pending Appointments</h1>
        <div class="overflow-x-auto w-full hidden md:block min-h-[400px] mx-10">
            <table class="table">
                <thead>
                    <tr>
                        <th>Business</th>
                        <th>Employee</th>
                        <th>Services</th>
                        <th>Date and Time</th>
                        <th>Confirm</th>
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
                            <td class="min-w-[145px]">
                                <div class="flex flex-col items-start gap-2">
                                    {order.services}
                                    <div class="flex items-center gap-1">
                                        <span
                                            class="badge badge-ghost badge-sm"
                                        >
                                            {order.price} ₪
                                        </span>
                                        <span
                                            class="badge badge-ghost badge-sm"
                                        >
                                            {order.duration}
                                        </span>
                                    </div>
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
                                    <input
                                        type="checkbox"
                                        class="checkbox checkbox-success"
                                    />
                                </label>
                            </td>
                            <th class="sm:opacity-0 sm:group-hover:opacity-100">
                                <div
                                    class="dropdown dropdown-hover dropdown-left"
                                >
                                    <div
                                        tabindex="0"
                                        role="button"
                                        class="btn btn-outline m-1"
                                    >
                                        Actions
                                    </div>
                                    <ul
                                        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 fixed z-20"
                                    >
                                        <li>
                                            <button> Load Business </button>
                                        </li>
                                        <li>
                                            <button> Edit </button>
                                        </li>
                                        <li>
                                            <button class="text-error">
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </th>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div
            class="flex flex-col md:hidden max-w-[95%] sm:max-w-[80%] w-full gap-6"
        >
            {#each orders as order}
                <button class="card bg-base-200 w-full hover:bg-base-300">
                    <div
                        class="card-body flex flex-col items-start p-4 max-h-30"
                    >
                        <div
                            class="flex flex-row items-center justify-between w-full"
                        >
                            <div class="flex flex-row items-center gap-2">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12">
                                        <img
                                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                            alt="business profile"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="flex flex-col items-start justify-center text-sm"
                                >
                                    <div class="font-bold">{order.name}</div>
                                    <div class="text-sm opacity-80">
                                        with {order.employee.name}
                                    </div>
                                </div>
                                <div class="w-5" />
                                <div
                                    class="flex flex-col items-start justify-center gap-[6px] text-sm"
                                >
                                    <div class="font-bold">
                                        {order.services}
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <span
                                            class="badge badge-neutral badge-sm"
                                            >{order.duration}</span
                                        >
                                        <span
                                            class="badge badge-neutral badge-sm"
                                            >{order.price} ₪</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <Icon src={ChevronRight} size="26px" />
                        </div>
                        <div
                            class="flex items-center justify-around flex-row gap-4 w-full"
                        >
                            <div class="flex flex-row items-start gap-5">
                                <div
                                    class="text-primary flex items-center gap-1"
                                >
                                    <Icon src={Calendar} size="26px" />
                                    {order.date}
                                </div>
                                <div
                                    class="text-primary flex items-center gap-1"
                                >
                                    <Icon src={Clock} size="26px" />
                                    {order.time}
                                </div>
                            </div>
                            <div
                                class:bg-warning={order.status == "pending"}
                                class:text-warning-content={order.status ==
                                    "pending"}
                                class:bg-success={order.status == "approved"}
                                class:text-success-content={order.status ==
                                    "approved"}
                                class="text-sm rounded-xl p-2 text-center"
                            >
                                {order.status == "pending"
                                    ? "Pending"
                                    : "Approved"}
                            </div>
                        </div>
                    </div>
                </button>
            {/each}
        </div>
    </div>
</main>
