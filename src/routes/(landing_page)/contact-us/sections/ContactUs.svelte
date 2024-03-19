<script lang="ts">
  import { page } from "$app/stores";
  import { contactUsSubjectStore } from "$lib/controllers/home_page_controller";
  import { _, translate } from "$lib/utils/translate";
  import FormContainer from "../components/FormContainer.svelte";
  import TextChip from "../components/TextChip.svelte";

  const urlParams = $page.url.searchParams;
  contactUsSubjectStore.set(urlParams.get("subject") ?? "");
</script>

<section class="bg-base-300">
  <div class="container px-2 py-12 mx-auto">
    <div class="lg:flex lg:items-center lg:mx-6">
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
          <TextChip textTransKey="textChip2" />
          <TextChip textTransKey="textChip3" />
          <TextChip textTransKey="textChip6" />

          <TextChip textTransKey="textChip4" />
          <TextChip textTransKey="textChip1" />
          <TextChip textTransKey="textChip5" />

          <TextChip textTransKey="textChip7" />
        </div>
      </div>
      <!-- form side -->
      <FormContainer />
    </div>
  </div>
</section>
