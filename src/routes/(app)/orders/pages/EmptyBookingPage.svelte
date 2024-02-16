<script lang="ts">
  import LottieAnimation from "$lib/components/LottieAnimation.svelte";
  import { bookingAnimation } from "$lib/consts/resources";
  import { _, translate } from "$lib/utils/translate";
</script>

<div class="flex flex-col gap-4 items-center justify-center pt-7">
  <h3 class="text-xl sm:text-2xl">{translate("noAvailableBookings", $_)}</h3>
  <div class="w-[70%]">
    <LottieAnimation
      animationFile={bookingAnimation}
      height={220}
      width={220}
    />
  </div>

  <h3 class="text-md opacity-70 text-center px-6">
    {translate("bookingsAsClientExplainFuture", $_)}
  </h3>
</div>
