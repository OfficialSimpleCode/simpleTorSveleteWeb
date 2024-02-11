<script lang="ts">
  // Models
  // Components
  import SocialLinks from "./sections/SocialLinks.svelte";

  // other (utils / stores)

  import ChangingImages from "./sections/ChangingImages.svelte";
  import Footer from "./sections/Footer.svelte";
  import IconAndTopButtons from "./sections/IconAndTopButtons.svelte";
  import ProductsSection from "./sections/ProductsSection.svelte";
  import StoryImages from "./sections/StoryImages.svelte";
  import Updates from "./sections/Updates.svelte";
</script>

<main class="w-full h-full">
  <!-- background image -->
  <ChangingImages />

  <!-- define the whole page below the top images -->
  <div class="bg-base-100 min-h-1/2 w-full z-10">
    <!-- this is effects the entire layout (top margin is -3 to be above the images)-->
    <div class=" ">
      <!-- the business icon, name, address, order & share buttons -->
      <IconAndTopButtons />
    </div>
    <!-- business icons links -->
    <SocialLinks />

    <!-- business updates -->
    <Updates />

    <!-- Display images -->
    <StoryImages />

    <ProductsSection></ProductsSection>
  </div>
  <Footer />
</main>
