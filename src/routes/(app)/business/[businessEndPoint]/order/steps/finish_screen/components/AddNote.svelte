<script lang="ts">
  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import type { TextFieldEvent } from "$lib/consts/text_fields";
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { _ } from "$lib/utils/translate";
  import { noteValidation } from "$lib/utils/validation_utils";
  function onValueChange(event: CustomEvent<TextFieldEvent>) {
    bookingMakerStore.update((value) => {
      value.note = event.detail.value;
      return value;
    });
  }
</script>

<div class="w-full rounded-lg">
  <CustomTextFormField
    validationFunc={noteValidation}
    bgColor="bg-base-300"
    hint="{$_('note')} ({$_('optional')})"
    value={$bookingMakerStore.note}
    on:valueChange={onValueChange}
  ></CustomTextFormField>
</div>
