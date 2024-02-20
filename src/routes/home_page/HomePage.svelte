<script>
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import Footer from "../../lib/components/Footer.svelte";
  import Banner from "./sections/Banner.svelte";
  import Businesses from "./sections/Businesses.svelte";
  import Data from "./sections/Data.svelte";
  import Examples from "./sections/Examples.svelte";
  import Features from "./sections/Features.svelte";
  import HowItWorks from "./sections/HowItWorks.svelte";
</script>

<main class="w-full h-full bg-base-300">
  <Navbar />
  <Banner />
  <HowItWorks />
  <Features />
  <Examples />
  <Businesses />
  <Data />
  <Footer generatedPage={false} />
</main>
