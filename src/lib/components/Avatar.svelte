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
    <img src={img} alt="profile" />
  </div>
</div>
