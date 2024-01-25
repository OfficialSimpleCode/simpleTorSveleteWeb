<script lang="ts">
    import { Gender, genderToImage } from "$lib/consts/gender";
    export let gender:Gender;
    export let pickedGender:Gender;
    export let handleClick : (gender:Gender)=>void;
  </script>
  
  <div class= "icon">
    <button on:click = {()=>handleClick(gender)} class="btn sm:btn-lg btn-outline w-full" class:text-gray-500={pickedGender != gender}>
        <img class="w-10 h-10" src={genderToImage[gender]} alt={genderToImage[gender]} />
    </button>
  </div>