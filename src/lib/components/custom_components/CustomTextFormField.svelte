<script lang="ts">
  import { InputOptions, type TextFieldEvent } from "$lib/consts/text_fields";
  import { _, translate } from "$lib/utils/translate";
  import { createEventDispatcher } from "svelte";

  export let bgColor: string = "";
  export let placeholder: string = "";
  export let pattern: string = "";
  export let validationFunc: (value: string) => string | null;
  export let isRequired: boolean = false;
  export let lableTranslateKey: string = "";
  export let type: InputOptions = InputOptions.text;

  export let value = "";
  let errorMessage = "";
  let validationResp: string | null = "";

  const dispatch = createEventDispatcher();
  function handleInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    // value of the field
    const inputValue: string = event.currentTarget.value;

    // resp from the validation
    validationResp = validationFunc(inputValue);

    // display error onlt if it isn't empty
    errorMessage = inputValue === "" ? "" : validationResp ?? "";

    // prepearing the object
    const eventResp: TextFieldEvent = {
      value: inputValue,
      isValid: validationResp == null && inputValue.length > 0,
    };
    // update the listeners field value change
    dispatch("valueChange", eventResp);
  }
</script>

<label class="label {!lableTranslateKey ? 'hidden' : 'block'}" for="name">
  <span class="label-text">{translate(lableTranslateKey, $_)}</span>
</label>
<div class="form-control">
  {#if type === InputOptions.text}
    <!-- text -->
    <div>
      {#if isRequired}
        <input
          class="input input-bordered {bgColor} w-full {validationResp !== ''
            ? 'border-red-700'
            : ''}"
          type="text"
          {placeholder}
          {pattern}
          bind:value
          on:input={handleInput}
          required
        />
      {:else}
        <input
          class="input input-bordered {bgColor} w-full {validationResp !== ''
            ? 'border-red-700'
            : ''}"
          type="text"
          {placeholder}
          {pattern}
          bind:value
          on:input={handleInput}
        />
      {/if}
    </div>

    <!-- email -->
  {:else if type === InputOptions.email}
    <div>
      {#if isRequired}
        <input
          class="input input-bordered {bgColor} w-full {validationResp !== ''
            ? 'border-red-700'
            : ''}"
          type="email"
          {placeholder}
          {pattern}
          bind:value
          on:input={handleInput}
          required
        />
      {:else}
        <input
          class="input input-bordered {bgColor} w-full {validationResp !== ''
            ? 'border-red-700'
            : ''}"
          type="email"
          {placeholder}
          {pattern}
          bind:value
          on:input={handleInput}
        />
      {/if}
    </div>

    <!-- password -->
  {:else if type === InputOptions.password}
    <div>
      {#if isRequired}
        <input
          class="input input-bordered {bgColor} w-full {validationResp !== ''
            ? 'border-red-700'
            : ''}"
          type="password"
          {placeholder}
          {pattern}
          bind:value
          on:input={handleInput}
          required
        />
      {:else}
        <input
          class="input input-bordered {bgColor} w-full {validationResp !== ''
            ? 'border-red-700'
            : ''}"
          type="password"
          {placeholder}
          {pattern}
          bind:value
          on:input={handleInput}
        />
      {/if}
    </div>
  {/if}

  <!-- the error indicator -->
  <p class="flex items-center h-5 mt-2 text-red-700">
    {errorMessage}
  </p>
</div>
