<script>
  import { _, translate } from "$lib/utils/translate";
</script>

<div class="text-center pb-4">
  <p class="text-xl">{translate("googleDisclosureTitle", $_, false)}</p>
  <p class="opacity-70">
    {translate("googleDisclosure", $_, false)}
  </p>
  <a
    class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
    target="_blank"
    href="https://developers.google.com/terms/api-services-user-data-policy"
    >Google API Services User Data Policy</a
  >
</div>
