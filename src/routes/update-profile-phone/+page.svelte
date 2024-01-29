<script lang="ts">
  import { base } from "$app/paths";
  import { userStore } from "$lib/stores/User";
  import { _ } from "svelte-i18n";

  import { goto } from "$app/navigation";
  import UpdatePageHeader from "$lib/components/UpdatePageHeader.svelte";
  //  ---------------------------   //
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
  //let isValid: boolean = true;

  let showInvalid: boolean = false;

  //  ---------------------------   //

  function updatePhoneNumber() {
    if (detailedValue?.isValid && detailedValue?.phoneNumber) {
      $userStore.phoneNumber = detailedValue?.phoneNumber; // the phone the user typed
      goto(`${base}/verify-phone-number`);
    } else {
      showInvalid = true;

      setTimeout(() => (showInvalid = false), 1000);
    }
  }

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
  <UpdatePageHeader
    title={capitalizeFirstLetter($_("phoneUpdate"))}
    helpMessage={$_("phoneUpdateExplain")}
  />

  <div class="flex items-center justify-center w-full h-[60%]">
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-200 py-3 px-6">
      <div class="form-control">
        <label class="label" for="phone-number">
          <span class="label-text"
            >{capitalizeFirstLetter($_("businessPhone"))}</span
          >
        </label>
        <!--  -->
        <div class="flex flex-row gap-1 xs:text-lg">
          <select
            class="country-select rounded-md {!valid ? 'border-red-700' : ''}"
            name="Country"
            bind:value={selectedCountry}
          >
            <option value={null} hidden={country !== null}>Please select</option
            >
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

          <TelInput
            bind:country={selectedCountry}
            bind:value
            bind:valid
            bind:detailedValue
            class="basic-tel-input {!valid
              ? 'border-red-700'
              : ''}  rounded-md "
          />
        </div>

        <p class="flex items-center h-5 mt-2">
          {detailedValue?.isValid === false ? "invalid" : ""}
        </p>

        <!--  -->
      </div>
      <div class="form-control mt-6">
        <button
          class="btn btn-primary {detailedValue?.isValid ? '' : 'opacity-60'}"
          on:click={updatePhoneNumber}
        >
          {showInvalid ? "Invalid phoner number" : $_("pressToVerify")}
        </button>
      </div>
    </div>
  </div>
</main>
