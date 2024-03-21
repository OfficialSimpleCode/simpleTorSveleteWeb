<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
</script>

<div class="flex flex-col items-start justify-start">
  <h1 class="text-2xl text-start">
    {translate("signUpHeadline", $_)}
  </h1>

  <p class="text-xs text-start opacity-70">
    {translate("happyToHaveYou", $_, false)}
  </p>
</div>
