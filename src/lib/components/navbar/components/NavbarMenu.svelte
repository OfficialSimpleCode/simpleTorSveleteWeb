<script lang="ts">
  import BrightnessNavigator from "./BrightnessNavigator.svelte";

  import ContactUsNavigator from "./ContactUsNavigator.svelte";
  import LanguageNavigator from "./LanguageNavigator.svelte";

  import PricingNavigator from "./PricingNavigator.svelte";
</script>

<div class="flex flex-col w-full items-end pt-6 pb-4 lg:hidden">
  <PricingNavigator fromMenu={true} />
  <div class="divider divider-vertical h-[1px]" />
  <ContactUsNavigator fromMenu={true} />
  <div class="divider divider-vertical h-[1px]" />
  <BrightnessNavigator fromMenu={true} />
  <div class="divider divider-vertical h-[1px]" />
  <!-- lang icon -->
  <LanguageNavigator fromMenu={true} />
</div>
