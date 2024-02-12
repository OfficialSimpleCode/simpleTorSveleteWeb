<script lang="ts">
  export let img: string;
  export let small: Boolean = false;
  export let ring: Boolean = true;
</script>

<div class="avatar flex justify-center">
  <div
    class="rounded-full ring-primary ring-offset-base-100 ring-offset-2 w-24"
    class:ring
    class:w-20={small}
  >
    <img
      src={img
        ? img
        : "https://images.pexels.com/photos/19936782/pexels-photo-19936782/free-photo-of-woman-in-white-dress-walking-on-wet-sea-coast-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
      alt="profile"
    />
  </div>
</div>
