<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let placeholder: string;
  export let pattern: string;
  export let validationFunc: (value: string) => string;

  let value = "";
  let errorMessage = "";
  const dispatch = createEventDispatcher();

  function handleInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const inputValue = event.currentTarget.value;

    // resp from the validation
    const validationResp = validationFunc(inputValue);
    // display error onlt if it isn't empty
    errorMessage = inputValue === "" ? "" : validationResp;

    dispatch("input", {
      value: validationResp === "" ? inputValue : undefined,
    });
  }
</script>

<div>
  <input
    type="text"
    {placeholder}
    {pattern}
    bind:value
    on:input={handleInput}
  />
  {#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
  {/if}
</div>
