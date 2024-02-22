<script lang="ts">
  import LottieAnimation from "$lib/components/custom_components/LottieAnimation.svelte";
  import { bookingAnimation } from "$lib/consts/resources";
  import { _, translate } from "$lib/utils/translate";
</script>

<div class="flex flex-col gap-4 items-center justify-center pt-7">
  <h3 class="text-xl sm:text-2xl">{translate("noAvailableBookings", $_)}</h3>
  <div class="w-[70%] flex flex-col items-center">
    <LottieAnimation animationFile={bookingAnimation} size="xl5" />
  </div>

  <h3 class="text-md opacity-70 text-center px-6">
    {translate("bookingsAsClientExplainFuture", $_)}
  </h3>
</div>
