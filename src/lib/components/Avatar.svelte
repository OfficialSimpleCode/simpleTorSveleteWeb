<script lang="ts">
  import { businessStore } from "$lib/stores/Business";
  import { getDefaultLogo } from "$lib/utils/images_utils";
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
        : getDefaultLogo($businessStore.design.pickedTheme.background)}
      alt="profile"
    />
  </div>
</div>
