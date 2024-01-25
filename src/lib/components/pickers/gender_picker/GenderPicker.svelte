


<script lang="ts">
  import InfoCircle from "$lib/components/InfoCircle.svelte";
  import { Gender, genderList } from "$lib/consts/gender";
  import GenderItem from "./components/GenderItem.svelte";
  export let pickedGender:Gender = Gender.male;

  function handleClick(gender:Gender){
      pickedGender = gender;
  }

  </script>
  <div class="form-control">
  <section class="relative rounded-lg bg-base-100 p-6 flex items-center justify-center gap-10 w-full"
>
  <InfoCircle
  message="hello this is a test message for the info circle"
/>
    {#each  genderList as gender, i}
    <GenderItem
        pickedGender={pickedGender}
        gender={gender}
        handleClick={handleClick}
    />
    {/each}

    </section>
  </div>

  
