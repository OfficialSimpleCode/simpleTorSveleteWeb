<script lang="ts">
  import type { PhonePickerEvent } from "$lib/consts/text_fields";
  import { _, translate } from "$lib/utils/translate";
  import { createEventDispatcher, onMount } from "svelte";

  import { TelInput, normalizedCountries } from "svelte-tel-input";
  import type {
    CountryCode,
    DetailedValue,
    E164Number,
  } from "svelte-tel-input/types";

  export let titleTransKey: string | undefined = undefined;
  // You must use E164 number format. It's guarantee the parsing and storing consistency.
  export let value: E164Number | null = "";

  export let hint: string = "";

  export let withErrorSpacing: boolean = false;

  export let isActive: boolean = true;

  // Any Country Code Alpha-2 (ISO 3166)
  let selectedCountry: CountryCode | null = "IL";

  // Validity
  let valid = true;

  // Optional - Extended details about the parsed phone number
  let detailedValue: DetailedValue | null = null;

  let country: CountryCode | null = null;

  const dispatch = createEventDispatcher();
  function updatePhoneNumber() {
    const phone = detailedValue?.phoneNumber;
    console.log(detailedValue?.countryCallingCode);

    const formattedPhone = phone?.replace(
      `+${detailedValue?.countryCallingCode ?? "eeeeee"}`,
      `+${detailedValue?.countryCallingCode}-`
    );
    // prepearing the object
    const event: PhonePickerEvent = {
      value: formattedPhone,
      isValid:
        valid &&
        detailedValue?.phoneNumber != null &&
        detailedValue?.phoneNumber?.length > 0,
    };
    console.log(event);
    // update the listeners about phone change
    dispatch("phoneChange", event);
  }

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onMount(() => {
    //prevent the validation bubble that will pop in the end of the form
    document.addEventListener(
      "invalid",
      (function () {
        return function (e) {
          e.preventDefault();
          document.getElementById("phoneFormField")?.focus();
        };
      })(),
      true
    );
  });
</script>

<div class="form-control">
  <!-- title -->
  {#if titleTransKey != null}
    <label class="label" for="phone-number">
      <span class="label-text"
        >{capitalizeFirstLetter(translate(titleTransKey, $_))}</span
      >
    </label>
  {/if}
  <!-- phone field -->
  <div dir="ltr" class="flex flex-row gap-2 xs:text-lg">
    <!-- selct for the prefix (by country) -->
    <select
      class="country-select rounded-md input input-bordered w-[40%]"
      name="Country"
      disabled={!isActive}
      bind:value={selectedCountry}
    >
      <!-- title of the options -->
      <option value={null} hidden={country !== null}
        >{translate("pleaseSelectCountry")}</option
      >

      <!-- options -->
      {#each normalizedCountries as currentCountry (currentCountry.id)}
        <option
          value={currentCountry.iso2}
          selected={currentCountry.iso2 === country}
          aria-selected={currentCountry.iso2 === country}
        >
          <!-- {currentCountry.name} -->
          {currentCountry.iso2} (+{currentCountry.dialCode})
        </option>
      {/each}
    </select>

    <!-- rest of the phone  -->
    <TelInput
      bind:country={selectedCountry}
      bind:value
      bind:valid
      bind:detailedValue
      name="phoneFormField"
      placeholder={hint}
      disabled={!isActive}
      on:input={updatePhoneNumber}
      class="basic-tel-input {!valid
        ? 'border-red-700'
        : ''}  rounded-md input input-bordered w-full"
    />
  </div>

  <!-- invalidity indicator -->
  <p
    class="flex items-center {withErrorSpacing ? 'h-5' : ''} mt-2 text-red-700"
  >
    {valid ? "" : translate("illegalPhone", $_)}
  </p>
</div>
