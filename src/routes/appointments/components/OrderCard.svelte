<script lang="ts">
    import { _ } from "svelte-i18n";
    import {
        Icon,
        ChevronRight,
        ChevronLeft,
        Calendar,
        Clock,
    } from "svelte-hero-icons";

    export let order: Record<string, any>;
</script>

<button class="card bg-base-200 w-full hover:bg-base-300">
    <div class="card-body flex flex-col items-start p-4 max-h-30">
        <div class="flex flex-row items-center justify-between w-full">
            <div class="flex flex-row items-center gap-2">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                        <img
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt="business profile"
                        />
                    </div>
                </div>
                <div class="flex flex-col items-start justify-center text-sm">
                    <div class="font-bold">{order.name}</div>
                    <div class="text-sm opacity-80">
                        {$_("with")}
                        {order.employee.name}
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
                        <span class="badge badge-neutral badge-sm"
                            >{order.duration}</span
                        >
                        <span class="badge badge-neutral badge-sm"
                            >{order.price} ₪</span
                        >
                    </div>
                </div>
            </div>

            <Icon
                src={document.dir == "ltr" ? ChevronRight : ChevronLeft}
                size="26px"
            />
        </div>
        <div class="flex items-center justify-around flex-row gap-4 w-full">
            <div class="flex flex-row items-start gap-5">
                <div class="text-primary flex items-center gap-1">
                    <Icon src={Calendar} size="26px" />
                    {order.date}
                </div>
                <div class="text-primary flex items-center gap-1">
                    <Icon src={Clock} size="26px" />
                    {order.time}
                </div>
            </div>
            <div
                class:bg-warning={order.status == "pending"}
                class:text-warning-content={order.status == "pending"}
                class:bg-success={order.status == "approved"}
                class:text-success-content={order.status == "approved"}
                class="text-sm rounded-xl p-2 text-center"
            >
                {#if order.status == "pending"}
                    {$_("waiting")}
                {:else if order.status == "approved"}
                    {$_("approved")}
                {/if}
            </div>
        </div>
    </div>
</button>
