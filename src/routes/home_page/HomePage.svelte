<script>
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import Footer from "../../lib/components/Footer.svelte";
  import Banner from "./sections/Banner.svelte";
  import Businesses from "./sections/Businesses.svelte";
  import Data from "./sections/Data.svelte";
  import Download from "./sections/Download.svelte";
  import Examples from "./sections/Examples.svelte";
  import Features from "./sections/Features.svelte";
  import HowItWorks from "./sections/HowItWorks.svelte";
  import Testimonials from "./sections/Testimonials.svelte";
</script>

<main class="w-full h-full bg-base-200">
  <Navbar />
  <Banner />
  <HowItWorks />
  <Features />
  <Examples />
  <Download />
  <Businesses />
  <Data />
  <Testimonials />
  <Footer generatedPage={false} />
</main>
