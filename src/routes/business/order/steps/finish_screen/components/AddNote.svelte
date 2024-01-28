<script>
  import { _ } from "$lib/utils/translate";
</script>

<div class="bg-base-300 w-full rounded-lg">
  <label class="form-control w-full px-3 pb-3">
    <div class="label"></div>
    <input
      type="text"
      placeholder="{$_('note')} ({$_('optional')})"
      class="input border-b border-b-gray-500 sm:input-lg w-full focus:outline-none bg-base-300"
    />
  </label>
</div>
