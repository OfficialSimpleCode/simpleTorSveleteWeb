<script lang="ts">
  export let titleTransKey: string;
  export let subTitleTransKey: string;
</script>

<div class="flex flex-col justify-center items-center">
  <h1 class="text-5xl">{titleTransKey}</h1>
  <p class="opacity-70">{subTitleTransKey}</p>
</div>
