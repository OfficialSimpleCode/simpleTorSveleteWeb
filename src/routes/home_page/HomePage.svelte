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

  // console.log(hashText1("shilo", "saadon")); // encryptText1
  // const v = encrypt("shilo", "saadon");
  // console.log(v);
  // console.log(decrypt("Fyx6urTcY6uFQgemMuynwg==", "saadon"));
  // const w = encrypt1("shilo", "saadon");
  // console.log("aaa enc ", w);
  // console.log("aaa dec ", decrypt1(w, "saadon"));
  // encryptText1("shilo", "saadon", "salt").then((value) => {
  //   console.log("encrotion is ", value);
  //   decryptText1(value, "saadon", "salt").then((dec) => {
  //     console.log("decription is ", dec);
  //   });
  // }); // encryptText1
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
