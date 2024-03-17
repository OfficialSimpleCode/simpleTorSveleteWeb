<script lang="ts">
  export let otpTitle: string;
  export let otpSubTitle: string;
</script>

<div class="flex flex-row justify-between w-full gap-4">
  <div class="flex flex-col items-start">
    <h1 class="text-2xl text-start">
      {otpTitle}
    </h1>

    <p class="text-xs text-start opacity-70">
      {otpSubTitle}.
    </p>
  </div>
</div>
