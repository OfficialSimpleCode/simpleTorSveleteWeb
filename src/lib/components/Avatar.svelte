<script lang="ts">
    export let small: Boolean = false;
    export let ring: Boolean = true;
</script>

<div class="avatar">
    <div
        class="rounded-full ring-primary ring-offset-base-100 ring-offset-2 w-24"
        class:ring={ring}
        class:w-20={small}
    >
        <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="profile"
        />
    </div>
</div>
