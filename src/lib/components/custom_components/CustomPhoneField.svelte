<script lang="ts">
  import type { PhonePickerEvent } from "$lib/consts/text_fields";
  import { _, translate } from "$lib/utils/translate";
  import { createEventDispatcher } from "svelte";

  import { TelInput, normalizedCountries } from "svelte-tel-input";
  import type {
    CountryCode,
    DetailedValue,
    E164Number,
  } from "svelte-tel-input/types";

  // Any Country Code Alpha-2 (ISO 3166)
  let selectedCountry: CountryCode | null = "IL";

  // You must use E164 number format. It's guarantee the parsing and storing consistency.
  let value: E164Number | null = "";

  // Validity
  let valid = true;

  // Optional - Extended details about the parsed phone number
  let detailedValue: DetailedValue | null = null;

  let country: CountryCode | null = null;

  const dispatch = createEventDispatcher();
  function updatePhoneNumber() {
    // prepearing the object
    const event: PhonePickerEvent = {
      value: detailedValue?.phoneNumber,
      isValid:
        valid &&
        detailedValue?.phoneNumber != null &&
        detailedValue?.phoneNumber?.length > 0,
    };
    // update the listeners about phone change
    dispatch("phoneChange", event);
  }

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>

<div class="form-control">
  <!-- title -->
  <label class="label" for="phone-number">
    <span class="label-text"
      >{capitalizeFirstLetter(translate("businessPhone", $_))}</span
    >
  </label>

  <!-- phone field -->
  <div class="flex flex-row gap-2 xs:text-lg">
    <!-- selct for the prefix (by country) -->
    <select
      class="country-select rounded-md input input-bordered"
      name="Country"
      bind:value={selectedCountry}
    >
      <!-- title of the options -->
      <option value={null} hidden={country !== null}>Please select</option>

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
      on:input={updatePhoneNumber}
      class="basic-tel-input {!valid
        ? 'border-red-700'
        : ''}  rounded-md input input-bordered w-full"
    />
  </div>

  <!-- invalidity indicator -->
  <p class="flex items-center h-5 mt-2 text-red-700">
    {valid ? "" : "invalid"}
  </p>
</div>
