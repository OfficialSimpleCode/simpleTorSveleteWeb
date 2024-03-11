<script lang="ts">
  import ContactUsDialog from "$lib/components/dialogs/ContactUsDialog.svelte";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import TitleAndBody from "../components/TitleAndBody.svelte";
  import Disclosure from "./sections/Disclosure.svelte";
  let contactUsDialog: HTMLDialogElement;
  function openContactUs() {
    pushDialog(contactUsDialog);
  }
</script>

<svelte:head>
  <title
    >{translate("simpleTorWebTitle", $_, false)} | {translate(
      "privacy",
      $_,
      false
    )}</title
  >
  <meta name="description" content="Simple tor app's privacy policy" />
  <!-- Open graphes links -->
  <meta
    property="og:title"
    content="{translate('simpleTorWebTitle', $_, false)} | {translate(
      'privacy',
      $_,
      false
    )}"
  />
  <meta
    property="og:description"
    content={translate("privacyPolicyExplain", $_, false)}
  />
  <!-- The prefered link for this page -->
  <link rel="canonical" href="https://simpletor.app/privacy" />
</svelte:head>

<ContactUsDialog bind:dialog={contactUsDialog} />

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
      <TitleAndBody title="contact">
        <p>
          {translate("contactText1", $_, false)}
          <button
            class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
            on:click={openContactUs}
          >
            {translate("contacting", $_, false)}
          </button>
          {translate("contactText2", $_, false)}
        </p>
      </TitleAndBody>

      <!-- contact -->
      <TitleAndBody title="personalData" content={["personalDataText"]} />

      <!-- How do we use the data -->
      <TitleAndBody title="dataUsage">
        <p>{translate("dataUsage1", $_, false)}</p>
        <ul class="list-disc px-8 py-1 space-y-2">
          <li>
            {translate("dataUsage2", $_, false)}
          </li>
          <li>
            {translate("dataUsage3", $_, false)}
          </li>
          <li>
            {translate("dataUsage4", $_, false)}
          </li>

          <li>{translate("dataUsage5", $_, false)}</li>
          <li>{translate("dataUsage6", $_, false)}</li>
          <li>
            {translate("dataUsage7", $_, false)}
          </li>
        </ul>
        <p>
          {translate("dataUsage8", $_, false)}
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
      <!-- updated at -->
      <div class="felx felx-col text-center pt-10">
        <h2>{translate("lastUpdte", $_, false)}</h2>
        <p class="opacity-70">01/4/2023</p>
      </div>
    </section>
  </div>
</body>
