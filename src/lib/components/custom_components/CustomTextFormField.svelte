<script lang="ts">
  import {
    InputOptions,
    inputOptionToStr,
    type TextFieldEvent,
  } from "$lib/consts/text_fields";
  import { _, translate } from "$lib/utils/translate";
  import { createEventDispatcher, onMount } from "svelte";

  export let bgColor: string = "";

  export let pattern: string = "";
  export let validationFunc: ((value: string) => string | null) | undefined =
    undefined;
  export let isRequired: boolean = false;
  export let mark: boolean = false;
  export let lableTranslateKey: string = "";
  export let type: InputOptions = InputOptions.text;
  export let withErrorSpacing: boolean = false;
  export let isActive: boolean = true;
  export let isOTP: boolean = false;
  export let hint: string = "";
  export let validationResp: string | null = "";
  export let value = "";

  const dispatch = createEventDispatcher();
  function handleInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    // value of the field
    value = event.currentTarget.value;

    // resp from the validation
    validationResp = validationFunc ? validationFunc(value) : null;

    // prepearing the object
    const eventResp: TextFieldEvent = {
      value: value,
      isValid: validationResp == null && value.length > 0,
    };
    // update the listeners field value change
    dispatch("valueChange", eventResp);
  }

  onMount(() => {
    //prevent the validation bubble that will pop in the end of the form
    document.addEventListener(
      "invalid",
      (function () {
        return function (e) {
          e.preventDefault();
          document.getElementById("textFormField")?.focus();
        };
      })(),
      true
    );
  });
</script>

<label class="label {!lableTranslateKey ? 'hidden' : 'block'}" for="name">
  <span class="label-text">{translate(lableTranslateKey, $_)}</span>
</label>
<div class="form-control">
  <!-- text -->

  <input
    class="input input-bordered {bgColor} w-full {mark
      ? 'border-primary'
      : ''} {validationResp
      ? 'border-red-700'
      : ''} [&::-webkit-inner-spin-button]:appearance-none"
    autocomplete={isOTP ? "one-time-code" : undefined}
    type={inputOptionToStr[type]}
    placeholder={hint}
    name="textFormField"
    {pattern}
    {value}
    disabled={!isActive}
    on:input={handleInput}
    required={isRequired}
  />

  <!-- the error indicator -->
  <p
    class="flex items-center {withErrorSpacing ? 'h-5' : ''} mt-2 text-red-500"
  >
    {value === "" ? "" : validationResp ?? ""}
  </p>
</div>
