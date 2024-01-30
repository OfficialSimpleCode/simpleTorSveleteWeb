<script lang="ts">
  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import { _ } from "$lib/utils/translate";
  import { noteValidation } from "$lib/utils/validation_utils";

  function validNote(value: string): string {
    throw new Error("Function not implemented.");
  }
</script>

<div class="w-full rounded-lg">
  <CustomTextFormField
    validationFunc={noteValidation}
    bgColor="bg-base-300"
    placeholder="{$_('note')} ({$_('optional')})"
  ></CustomTextFormField>
</div>
