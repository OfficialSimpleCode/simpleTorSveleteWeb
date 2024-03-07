<script lang="ts">
  import InfoCircle from "$lib/components/InfoCircle.svelte";
  import { Gender, genderList } from "$lib/consts/gender";
  import { containerRadius } from "$lib/consts/sizes";
  import { _, translate } from "$lib/utils/translate";
  import GenderItem from "./components/GenderItem.svelte";
  export let pickedGender: Gender = Gender.male;
  export let background: string = "bg-base-200";
  export let onChanged: ((gender: Gender) => void) | undefined = undefined;
  export let shimmerEffect: boolean = false;
  function handleClick(gender: Gender) {
    if (shimmerEffect) {
      return;
    }
    pickedGender = gender;
    if (onChanged != undefined) {
      onChanged(gender);
    }
  }
</script>

<section
  class="relative rounded-lg {background} xs:p-3 p-2 flex items-center justify-center gap-10 w-[90%] {containerRadius}"
>
  <div class="absolute top-1 w-full p-1 {shimmerEffect ? 'hidden' : ''}">
    <InfoCircle message={translate("genderInfo", $_, false)} />
  </div>

  <div
    class="flex flex-row gap-5 px-4 xs:py-4 py-6 items-center justify-center"
  >
    {#each genderList as gender, i}
      <GenderItem bind:pickedGender {gender} {handleClick} {shimmerEffect} />
    {/each}
  </div>
</section>
