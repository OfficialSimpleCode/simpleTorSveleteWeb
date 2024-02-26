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

  // const pass = "saadon";
  // const enc = Encryptor.GI().encrypt("shilo-,$#@±encryped this code", pass);
  // console.log(" ----------------------------- ");
  // console.log("hash ->", Encryptor.GI().hashTextSha256("shilo", "saadon"));
  // console.log(enc);
  // console.log(
  //   Encryptor.GI().decrypt(
  //     "d374f16176c2001ae892cc1ef10143c1:ed1aa0dabd785751d898d2a78332e99e:bd569fc5953fd2625e62e359b846993f78e11517d4e7f3dcae75af8bd0463d77",
  //     pass
  //   )
  // );
  // console.log(" ----------------------------- ");

  // 2609c61633d590627a7f76a39fa98930:b143a3efa772eac5cbf3037e487fb073:9b6683ddbc1fcf6645e0f504922a2f5d
  // 2f3876689b1b96178eda6c290bf5b8b9:c0fc9d131c8ced8a5bdb89dbea6e29b6:093d113f6670ae70f694b5f1aa70424f
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
