<script>
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import Footer from "../../lib/components/Footer.svelte";
  import Banner from "./sections/Banner.svelte";
  import Data from "./sections/Data.svelte";
  import Examples from "./sections/Examples.svelte";
  import Features from "./sections/Features.svelte";
  import HowItWorks from "./sections/HowItWorks.svelte";
</script>

<main class="w-full h-full">
  <Navbar />
  <Banner />
  <HowItWorks />
  <Features />
  <Examples />
  <Data />
  <Footer generatedPage={false} />
</main>
