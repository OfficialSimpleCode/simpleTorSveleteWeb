<script lang="ts">
  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import type { TextFieldEvent } from "$lib/consts/text_fields";
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { _ } from "$lib/utils/translate";
  import { noteValidation } from "$lib/utils/validation_utils";

  function saveNote(event: CustomEvent<TextFieldEvent>): void {
    if (event.detail.isValid) {
      $bookingMakerStore.note = event.detail.value;
    }
  }
</script>

<div class="w-full rounded-lg">
  <CustomTextFormField
    validationFunc={noteValidation}
    bgColor="bg-base-300"
    placeholder="{$_('note')} ({$_('optional')})"
    on:valueChange={saveNote}
  ></CustomTextFormField>
</div>
