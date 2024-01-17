<script lang="ts">
    export let order: Record<string, any>;
</script>

<tr class="group hover:bg-base-200">
    <td>
        <div class="flex items-center gap-3">
            <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
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
                <span class="badge badge-ghost badge-sm">
                    {order.price} ₪
                </span>
                <span class="badge badge-ghost badge-sm">
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
            <input type="checkbox" class="checkbox checkbox-success" />
        </label>
    </td>
    <th class="sm:opacity-0 sm:group-hover:opacity-100">
        <div class="dropdown dropdown-hover dropdown-left">
            <div tabindex="0" role="button" class="btn btn-outline m-1">
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
                    <button class="text-error"> Delete </button>
                </li>
            </ul>
        </div>
    </th>
</tr>
