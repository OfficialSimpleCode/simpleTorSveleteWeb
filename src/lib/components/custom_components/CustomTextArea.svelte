<script lang="ts">
  import { containerRadius } from "$lib/consts/sizes";
  import { type TextFieldEvent } from "$lib/consts/text_fields";
  import { _, translate } from "$lib/utils/translate";
  import { createEventDispatcher, onMount } from "svelte";

  export let bgColor: string = "";

  export let validationFunc: ((value: string) => string | null) | undefined =
    undefined;
  export let isRequired: boolean = false;
  export let lableTranslateKey: string = "";

  export let withErrorSpacing: boolean = false;
  export let isActive: boolean = true;

  export let hint: string = "";

  export let value = "";
  let errorMessage = "";
  let validationResp: string | null = "";

  const dispatch = createEventDispatcher();
  function handleInput(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    // value of the field
    value = event.currentTarget.value;

    // resp from the validation
    validationResp = validationFunc ? validationFunc(value) : null;

    // display error onlt if it isn't empty
    errorMessage = value === "" ? "" : validationResp ?? "";

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

  <textarea
    class="block w-full h-32 px-5 py-2 input input-bordered placeholder-opacity-70 {containerRadius} md:h-48 {bgColor} w-full {validationResp
      ? 'border-red-700'
      : ''} [&::-webkit-inner-spin-button]:appearance-none"
    placeholder={hint}
    on:input={handleInput}
    name="textArea"
    {value}
    disabled={!isActive}
    required={isRequired}
  />

  <!-- the error indicator -->
  <p
    class="flex items-center {withErrorSpacing ? 'h-5' : ''} mt-2 text-red-700"
  >
    {errorMessage}
  </p>
</div>
