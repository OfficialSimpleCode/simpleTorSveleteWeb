<script lang="ts">
  import { page } from "$app/stores";
  import { _, translate } from "$lib/utils/translate";
  import FormContainer from "../components.svelte/FormContainer.svelte";
  import TextChip from "../components.svelte/TextChip.svelte";

  let subject: string = "";
</script>

<svelte:head>
  <!-- business title -->
  <title
    >{translate("simpleTorWebTitle", $_, false)} | {translate(
      "contactUs",
      $_,
      false
    )}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/contactUs`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{translate('simpleTorWebTitle', $_, false)} | {translate(
      'contactUs',
      $_,
      false
    )}"
  />
</svelte:head>

<section class="bg-base-100">
  <div class="container px-6 py-12 mx-auto">
    <div class="lg:flex lg:items-center lg:-mx-6">
      <!-- text side -->
      <div
        class="lg:w-1/2 lg:mx-6 text-center lg:text-start flex flex-col justify-center items-center lg:items-start"
      >
        <!-- title -->
        <h1 class="text-2xl lg:text-3xl font-semibold">
          {translate("talkWithOurCrew", $_)}
        </h1>
        <!-- sub title -->
        <p class="pt-2 opacity-70 text-lg">
          {translate("timeToAnswerLessThan", $_)}
        </p>
        <!-- chips -->
        <div
          class="flex flex-wrap gap-2 py-8 max-w-[550px] justify-center lg:justify-start"
        >
          <TextChip textTransKey="textChip2" bind:subject />
          <TextChip textTransKey="textChip3" bind:subject />
          <TextChip textTransKey="textChip6" bind:subject />

          <TextChip textTransKey="textChip4" bind:subject />
          <TextChip textTransKey="textChip1" bind:subject />
          <TextChip textTransKey="textChip5" bind:subject />

          <TextChip textTransKey="textChip7" bind:subject />
        </div>
      </div>
      <!-- form side -->
      <FormContainer bind:subject />
    </div>
  </div>
</section>
