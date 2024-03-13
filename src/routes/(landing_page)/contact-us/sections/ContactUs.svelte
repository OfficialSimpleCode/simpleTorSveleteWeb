<script>
  import FormContainer from "../components.svelte/FormContainer.svelte";
  import TextChip from "../components.svelte/TextChip.svelte";
</script>

<section class="bg-base-100">
  <div class="container px-6 py-12 mx-auto">
    <div class="lg:flex lg:items-center lg:-mx-6">
      <!-- text side -->
      <div
        class="lg:w-1/2 lg:mx-6 text-center lg:text-start flex flex-col justify-center items-center lg:items-start"
      >
        <!-- title -->
        <h1
          class="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl"
        >
          דברו עם הצוות שלנו שעומד לרשותכם
        </h1>
        <!-- sub title -->
        <p class="pt-5 opacity-70 text-lg">
          זמן מענה ממוצע הינו פחות מדקה, נסו את הצוות שלנו
        </p>
        <!-- chips -->
        <div
          class="flex flex-wrap gap-2 py-4 max-w-[550px] justify-center lg:justify-start"
        >
          <TextChip textTransKey="תמיכה טכנית" />
          <TextChip textTransKey="שאלה כללית" />
          <TextChip textTransKey="בקשת פיתוח והוספת פיצר" />
          <TextChip textTransKey="דיווח על הפרה של משתמשים" />
          <TextChip textTransKey="תמיכה טכנית" />
          <TextChip textTransKey="שאלה כללית" />
          <TextChip textTransKey="בקשת פיתוח והוספת פיצר" />
          <TextChip textTransKey="דיווח על הפרה של משתמשים" />
        </div>
      </div>
      <!-- form side -->
      <FormContainer />
    </div>
  </div>
</section>
