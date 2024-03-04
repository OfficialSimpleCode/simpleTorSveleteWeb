<script lang="ts">
  export let titleTransKey: string;
  export let subTitleTransKey: string;
</script>

<div class="flex flex-col justify-center items-center">
  <p class="text-5xl">{titleTransKey}</p>
  <p class="opacity-70">{subTitleTransKey}</p>
</div>
