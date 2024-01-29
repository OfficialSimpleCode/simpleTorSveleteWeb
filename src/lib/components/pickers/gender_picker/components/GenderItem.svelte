<script lang="ts">
  import { Gender, genderToImage, genderToStr } from "$lib/consts/gender";
  import { _, translate } from "$lib/utils/translate";
  export let gender: Gender;
  export let pickedGender: Gender;
  export let handleClick: (gender: Gender) => void;
</script>

<div class="flex flex-col items-center justify-centers icon">
  <button
    on:click={() => handleClick(gender)}
    class=" rounded-lg btn-outline px-1 bg-base-300 border xs:h-[80px] xs:w-[80px] h-[60px] :w-[60px] hover:bg-primary {pickedGender ===
    gender
      ? 'border-primary'
      : 'border-gray-500'} "
  >
    <img
      class="w-full h-full object-scale-down rounded-lg p-3"
      src={genderToImage[gender]}
      alt={genderToImage[gender]}
    />
    <p class="xs:text-md text-sm">
      {translate(genderToStr[gender], $_)}
    </p>
  </button>
</div>
