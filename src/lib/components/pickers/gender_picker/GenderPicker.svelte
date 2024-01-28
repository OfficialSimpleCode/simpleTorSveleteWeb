<script lang="ts">
  import InfoCircle from "$lib/components/InfoCircle.svelte";
  import { Gender, genderList } from "$lib/consts/gender";
  import { translate } from "$lib/utils/translate";
  import GenderItem from "./components/GenderItem.svelte";
  export let pickedGender: Gender = Gender.male;
  export let onChanged: ((gender: Gender) => void) | undefined = undefined;

  function handleClick(gender: Gender) {
    pickedGender = gender;
    if (onChanged != undefined) {
      onChanged(gender);
    }
  }
</script>

<div class="form-control">
  <section
    class="relative rounded-lg bg-base-100 p-6 flex items-center justify-center gap-10 w-full"
  >
    <InfoCircle message={translate("genderInfo", false)} />
    {#each genderList as gender, i}
      <GenderItem {pickedGender} {gender} {handleClick} />
    {/each}
  </section>
</div>
