<script>
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import { containerRadius } from "$lib/consts/sizes";
</script>

<div class="mt-8 lg:w-1/2 lg:mx-6">
  <div
    class="w-full px-8 py-10 mx-auto overflow-hidden {containerRadius} shadow-2xl lg:max-w-xl bg-base-200"
  >
    <!-- The from -->
    <form class="">
      <!-- user name -->
      <div class="flex-1">
        <CustomTextFormField lableTranslateKey="firstName" />
      </div>

      <!-- User Phone -->
      <div class="flex-1 mt-6">
        <CustomPhoneField titleTransKey="phoneNumber" />
      </div>

      <!-- message -->
      <div class="w-full mt-6">
        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
          >Message</label
        >
        <textarea
          class=" block w-full h-32 px-5 py-3 mt-2 input input-bordered placeholder-opacity-70 {containerRadius} md:h-48"
          placeholder="Message"
        ></textarea>
      </div>

      <button
        class="w-full px-6 py-3 mt-6 text-sm bg-primary {containerRadius}"
      >
        שליחה
      </button>
    </form>
  </div>
</div>
