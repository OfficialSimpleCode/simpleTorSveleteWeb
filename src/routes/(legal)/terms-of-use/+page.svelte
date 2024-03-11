<script lang="ts">
  import { base } from "$app/paths";
  import ContactUsDialog from "$lib/components/dialogs/ContactUsDialog.svelte";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import TitleAndBody from "../components/TitleAndBody.svelte";
  let contactUsDialog: HTMLDialogElement;
  function openContactUs() {
    pushDialog(contactUsDialog);
  }
</script>

<svelte:head>
  <title
    >{translate("simpleTorWebTitle", $_, false)} | {translate(
      "termsOfUse",
      $_,
      false
    )}</title
  >
  <meta name="description" content="Simple tor app's terms of use" />
  <!-- Open graphes links -->
  <meta
    property="og:title"
    content="{translate('simpleTorWebTitle', $_, false)} | {translate(
      'termsOfUse',
      $_,
      false
    )}"
  />
  <meta
    property="og:description"
    content={translate("termOfUseExplain", $_, false)}
  />
  <!-- The prefered link for this page -->
  <link rel="canonical" href="https://simpletor.app/terms-of-use" />
</svelte:head>

<ContactUsDialog bind:dialog={contactUsDialog} />

<body class="bg-base-100 items-center">
  <div class="flex flex-col items-center pb-10">
    <section class="text-start mx-6 max-w-[850px]">
      <!-- title -->
      <h1 class="text-3xl text-center pt-5">{translate("termsOfUse", $_)}</h1>

      <!-- first text -->
      <h2 class="py-5 opacity-70">
        {translate("welcomeToSimpleTor", $_)}
      </h2>

      <!-- intro -->
      <TitleAndBody
        title="generalSection"
        contentAsUl={true}
        content={[
          "generalText1",
          "generalText2",
          "generalText3",
          "generalText4",
          "generalText5",
          "generalText6",
          "generalText7",
          "generalText8",
          "generalText9",
          "generalText10",
        ]}
      />

      <!-- general explanation      -->
      <TitleAndBody
        title="displayedContent"
        contentAsUl={true}
        content={[
          "displayedContentText1",
          "displayedContentText2",
          "displayedContentText3",
          "displayedContentText4",
          "displayedContentText5",
          "displayedContentText6",
          "displayedContentText7",
          "displayedContentText8",
          "displayedContentText9",
        ]}
      />

      <!-- contact -->
      <TitleAndBody
        title="copyright"
        contentAsUl={true}
        content={["copyrightText1", "copyrightText2"]}
      />

      <!-- contact -->
      <TitleAndBody title="externalLinks" content={["externalLinksText"]} />

      <!-- How do we use the data -->
      <TitleAndBody title="requiredToTerms">
        <p>
          {translate("requiredToTermsText", $_)}
          <a
            href={`${base}/privacy`}
            class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
            target="_blank"
          >
            {translate("privacy", $_)}</a
          >
        </p>
      </TitleAndBody>

      <!-- Duties of business owner -->
      <TitleAndBody
        title="userDuties"
        contentAsUl={true}
        content={[
          "userDutiesText1",
          "userDutiesText2",
          "userDutiesText3",
          "userDutiesText4",
          "userDutiesText5",
          "userDutiesText6",
          "userDutiesText7",
          "userDutiesText8",
        ]}
      />

      <!-- Business owners -->
      <TitleAndBody
        title="businessOwners"
        contentAsUl={true}
        content={["businessOwnersText"]}
      />

      <!-- Where the data is saved -->
      <TitleAndBody
        title="specialTerms"
        contentAsUl={true}
        content={[
          "specialTermsText1",
          "specialTermsText2",
          "specialTermsText3",
        ]}
      />

      <!-- Cyber security -->
      <TitleAndBody
        title="limitResponsibilty"
        contentAsUl={true}
        content={["limitResponsibiltyText1", "limitResponsibiltyText2"]}
      />

      <!-- Right to see the data -->
      <TitleAndBody title="miscellaneousInstructions" contentAsUl={true}>
        <ul class="space-y-4">
          <p class="py-1">
            {translate("miscellaneousInstructionsText1", $_, false)}
          </p>
          <p class="py-1">
            {translate("miscellaneousInstructionsText2", $_, false)}
          </p>
          <p class="py-1">
            {translate("miscellaneousInstructionsText3", $_, false)}
          </p>
          <p class="py-1">
            {translate("miscellaneousInstructionsText4", $_, false)}
          </p>
          <p class="py-1">
            {translate("miscellaneousInstructionsText5", $_, false)}
          </p>
          <p class="py-1">
            {translate("miscellaneousInstructionsText6", $_, false)}
          </p>
          <p class="py-1">
            {translate("miscellaneousInstructionsText7", $_, false)}
            <button
              on:click={openContactUs}
              class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
              >{translate("contactOptions", $_, false)}</button
            >
            {translate("thatIn", $_, false)}
            <a
              href={`${base}/`}
              class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
              target="_blank"
            >
              {translate("homePage", $_, false)}
            </a>
          </p>
          <p class="py-1">
            {translate("miscellaneousInstructionsText8", $_, false)}
          </p>
          <p class="py-1">
            {translate("miscellaneousInstructionsText9", $_, false)}
          </p>
        </ul>
      </TitleAndBody>

      <!-- updated at -->
      <div class="felx felx-col text-center pt-10">
        <h2>{translate("lastUpdte", $_, false)}</h2>
        <p class="opacity-70">01/4/2023</p>
      </div>
      <p></p>
    </section>
  </div>
</body>
