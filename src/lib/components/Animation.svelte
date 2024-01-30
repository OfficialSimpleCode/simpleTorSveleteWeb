<script lang="ts">
  import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";

  export let animationFile: string;
  export let height: number = 250;
  export let width: number = 250;
  export let loop: boolean = false;
</script>

<LottiePlayer
  src={animationFile}
  autoplay={true}
  controls={false}
  renderer="svg"
  background="transparent"
  {loop}
  {height}
  {width}
/>
