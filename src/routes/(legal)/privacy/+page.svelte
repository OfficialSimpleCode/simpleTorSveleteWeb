<script>
  import { _, translate } from "$lib/utils/translate";
  import TitleAndBody from "../components/TitleAndBody.svelte";
  import Disclosure from "./sections/Disclosure.svelte";
</script>

<svelte:head>
  <title>Simple Tor | privacy policy</title>
  <meta name="description" content="Simple tor app's privacy policy" />
  <!-- Open graphes links -->
  <meta property="og:title" content="Simple Tor | privacy policy" />
  <meta property="og:description" content="Simple tor app's privacy policy" />
  <!-- The prefered link for this page -->
  <link rel="canonical" href="https://simpletor.app/privacy" />
</svelte:head>

<body class="bg-base-100 items-center">
  <div class="flex flex-col items-center pb-10">
    <section class="text-start mx-6 max-w-[850px]">
      <!-- title -->
      <h1 class="text-3xl text-center pt-5">{translate("privacy", $_)}</h1>

      <!-- first text -->
      <h2 class="py-5 opacity-70">{translate("privacyDesc", $_)}</h2>
      <!-- google disclouser -->
      <Disclosure />
      <!-- intro -->
      <TitleAndBody title="intro">
        <p class="">
          {translate("intro1", $_)}
        </p>
        <ul class="list-disc px-8 py-1 space-y-2">
          <li>{translate("intro2", $_)}</li>
          <li>{translate("intro3", $_)}</li>
        </ul>
      </TitleAndBody>

      <!-- general explanation      -->
      <TitleAndBody title="aboutPrivacy" content={["aboutText"]} />

      <!-- contact -->
      <TitleAndBody title="contact" content={["contactText"]} />

      <!-- contact -->
      <TitleAndBody title="personalData" content={["personalDataText"]} />

      <!-- How do we use the data -->
      <TitleAndBody title="dataUsage">
        <p>{translate("dataUsage1", $_)}</p>
        <ul class="list-disc px-8 py-1 space-y-2">
          <li>
            {translate("dataUsage2", $_)}
          </li>
          <li>
            {translate("dataUsage3", $_)}
          </li>
          <li>
            {translate("dataUsage4", $_)}
          </li>

          <li>{translate("dataUsage5", $_)}</li>
          <li>{translate("dataUsage6", $_)}</li>
          <li>
            {translate("dataUsage7", $_)}
          </li>
        </ul>
        <p>
          {translate("dataUsage8", $_)}
        </p></TitleAndBody
      >

      <!-- Duties of business owner -->
      <TitleAndBody title="duties" content={["duties1"]} />

      <!-- Where the data is saved -->
      <TitleAndBody title="whereDataSaved" content={["whereDataSaved1"]} />

      <!-- Cyber security -->
      <TitleAndBody title="dataScurity" content={["dataScurity1"]} />

      <!-- Right to see the data -->
      <TitleAndBody title="rights" content={["rightsText"]} />

      <!-- Changes in the policy -->
      <TitleAndBody
        title="changesToPrivacy"
        content={["changesToPrivacyText"]}
      />
    </section>
  </div>
</body>
