<script lang="ts">
  import InfoCircle from "$lib/components/InfoCircle.svelte";
  import { Gender, genderList } from "$lib/consts/gender";
  import { containerRadius } from "$lib/consts/sizes";
  import { _, translate } from "$lib/utils/translate";
  import GenderItem from "./components/GenderItem.svelte";
  export let pickedGender: Gender = Gender.male;
  export let background: string = "bg-base-200";
  export let onChanged: ((gender: Gender) => void) | undefined = undefined;

  function handleClick(gender: Gender) {
    pickedGender = gender;
    if (onChanged != undefined) {
      onChanged(gender);
    }
  }
</script>

<section
  class="relative rounded-lg {background} xs:p-3 p-2 flex items-center justify-center gap-10 w-[90%] {containerRadius}"
>
  <div class="absolute top-1 w-full p-1">
    <InfoCircle message={translate("genderInfo", $_, false)} />
  </div>

  <div
    class="flex flex-row gap-2 px-4 xs:py-4 py-6 items-center justify-center"
  >
    {#each genderList as gender, i}
      <GenderItem {pickedGender} {gender} {handleClick} />
    {/each}
  </div>
</section>
