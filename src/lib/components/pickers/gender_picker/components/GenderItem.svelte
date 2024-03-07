<script lang="ts">
  import { Gender, genderToImage, genderToStr } from "$lib/consts/gender";
  import { containerRadius } from "$lib/consts/sizes";
  import { _, translate } from "$lib/utils/translate";
  export let gender: Gender;
  export let pickedGender: Gender;
  export let handleClick: (gender: Gender) => void;
  export let shimmerEffect: boolean = false;
</script>

<div
  class="flex flex-col items-center justify-center gap-1 icon {shimmerEffect
    ? 'animate-pulse'
    : ''}"
>
  <button
    on:click={() => handleClick(gender)}
    class="flex items-center justify-center rounded-full
       hover:bg-primary
       shrink-0 transition-all duration-200 w-[50px] h-[50px] sm:h-[65px] sm:w-[65px] {shimmerEffect
      ? 'opacity-20'
      : ''}"
  >
    <img
      class="object-scale-down rounded-lg p-1"
      src={genderToImage[gender]}
      alt={genderToImage[gender]}
    />
  </button>
  <div
    class="{pickedGender === gender && !shimmerEffect
      ? 'bg-primary'
      : ''} {containerRadius} px-2"
  >
    <p
      class="xs:text-md text-sm capitalize {shimmerEffect
        ? 'opacity-30'
        : ''} {pickedGender === gender && !shimmerEffect
        ? 'text-primary-content'
        : ''} "
    >
      {translate(genderToStr[gender], $_)}
    </p>
  </div>
</div>
