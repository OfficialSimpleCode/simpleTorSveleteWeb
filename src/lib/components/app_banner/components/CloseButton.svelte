<script>
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import {
    ScreenController,
    downloadAppBanner,
  } from "$lib/controllers/screens_controller";
  function closeBanner() {
    ScreenController.pressExistBanner = true;
    downloadAppBanner.set(false);
  }
</script>

<!-- close button -->
<div class="absolute top-4 right-4 text-base-content text-opacity-45 sm:hidden">
  <CustomCircleIcon
    size={"xs"}
    handleClick={closeBanner}
    icon="material-symbols:close"
    bgColor="bg-base-content bg-opacity-20 backdrop-blur-lg"
  />
</div>
