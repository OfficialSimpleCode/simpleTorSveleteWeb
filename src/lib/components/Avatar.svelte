<script lang="ts">
  import { themeStore } from "$lib/controllers/theme_controller";
  import { getDefaultLogo } from "$lib/utils/images_utils";
  export let img: string;
  export let small: Boolean = false;
  export let ring: Boolean = true;
  export let extraSmall: boolean = false;
</script>

<div class="avatar flex justify-center">
  <div
    class="rounded-full ring-primary ring-offset-base-100 ring-offset-2"
    class:ring
    class:w-10={extraSmall}
    class:w-20={small}
    class:w-24={!extraSmall && !small}
  >
    <img
      src={img ? img : getDefaultLogo($themeStore?.background)}
      alt="profile"
    />
  </div>
</div>
