<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { webLink } from "$lib/consts/app_external_links";
  import { downloadAppBanner } from "$lib/controllers/screens_controller";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import Footer from "../../lib/components/Footer.svelte";
  import Articles from "./sections/Articles.svelte";
  import Banner from "./sections/Banner.svelte";
  import Businesses from "./sections/Businesses.svelte";
  import Data from "./sections/Data.svelte";
  import Download from "./sections/Download.svelte";
  import Examples from "./sections/Examples.svelte";
  import Faq from "./sections/Faq.svelte";
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

  // const pass = "saadon";
  // console.log(" ----------------------------- ");
  // Encryptor.GI()
  //   .encryptBrowser("111", pass)
  //   .then((value) => {
  //     console.log("The encrypted value is -> ", value);
  //     // decrypt
  //     Encryptor.GI()
  //       .decryptBrowser(value, pass)
  //       .then((decVal) => {
  //         console.log("The decrypted value is -> ", decVal);
  //         console.log("---END---");
  //       });
  //   });

  // 2609c61633d590627a7f76a39fa98930:b143a3efa772eac5cbf3037e487fb073:9b6683ddbc1fcf6645e0f504922a2f5d
  // 2f3876689b1b96178eda6c290bf5b8b9:c0fc9d131c8ced8a5bdb89dbea6e29b6:093d113f6670ae70f694b5f1aa70424f

  // scheme.org json
  let jsonLdScript = `<script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "SoftwareApplication",
        "url": "https://simpletor.app/",
        "author": {
          "@type": "Company",
          "name": "SA SIMPLE CODE LTD"
        },
        "publisher": {
        "@type": "Company",
        "name": "SA SIMPLE CODE LTD"
        },
        "name": "Simple Tor",
        "downloadUrl": "${webLink}",
        "image": "/AppIcon.ico",    
        "applicationCategory": "BusinessApplication",
        "softwareVersion": "1.3.9",
        "aggregateRating": {
          "@type": "AggregateRating",
          "bestRating": "5",
          "ratingValue": "5",
          "ratingCount": "30"
        },
        "review": [{
          "@type": "Review",
          "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "שקד כהן שי"
          },
          "reviewBody": "${translate("shakedReview", $_)}"
        },
        {
          "@type": "Review",
          "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Merav750"
          },
          "reviewBody": "${translate("meravReview", $_)}"
        },
        {
          "@type": "Review",
          "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Sagi Zarum"
          },
          "reviewBody": "${translate("saguiReview", $_)}"
        },
        {
          "@type": "Review",
          "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Amit mormy"
          },
          "reviewBody": "${translate("amitReview", $_)}"
        },
        {
          "@type": "Review",
          "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "דניאל מרה"
          },
          "reviewBody": "${translate("danielReview", $_)}"
        },
        {
          "@type": "Review",
          "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Shilo"
          },
          "reviewBody": "${translate("shiloReview", $_)}"
        },
        {
          "@type": "Review",
          "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "ShiraSa123"
          },
          "reviewBody": "${translate("shiraReview", $_)}"
        }]
      }
      ${"<"}/script>`;

  let targetElement: HTMLElement;

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //inside the view port
        downloadAppBanner.set(true);
      } else {
        //outside the view port
        downloadAppBanner.set(false);
      }
    });
  }

  onMount(() => {
    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  });
</script>

<svelte:head>
  <!-- Page title -->
  <title>{translate("simpleTorWebTitle", $_)}</title>

  <!-- the url for search to display for this site -->
  <link rel="canonical" href="https://simpletor.app" />

  <!-- Open Graphes data (for sharin a link) -->
  <!-- title -->
  <meta property="og:title" content={translate("simpleTorWebTitle", $_)} />

  <!-- the scheme.org of the business -->
  {@html jsonLdScript}
</svelte:head>
<main class="w-full h-full bg-base-200">
  <Navbar />

  <Banner />
  <HowItWorks />
  <Features />
  <Examples />
  <Download />
  <Businesses />
  <!-- in this section pop the download app message -->
  <div id="popDownloadApp" bind:this={targetElement}>
    <Articles />
    <Data />
    <Testimonials />
    <Faq />
    <Footer />
  </div>
</main>
