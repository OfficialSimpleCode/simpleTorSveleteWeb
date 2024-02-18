<script>
  import HowItWorkStep from "../components/HowItWorkStep.svelte";
</script>

<div class="w-full">
  <div class="container mx-auto my-32 flex flex-col items-center gap-16">
    <!-- top section -->
    <div class="flex flex-col gap-16">
      <div class="flex flex-col gap-2 text-center">
        <!-- title -->
        <h2
          class="mb-2 text-3xl font-extrabold leading-tight text-dark-grey-900 lg:text-4xl"
        >
          איך זה עובד?
        </h2>

        <!-- sub title -->
        <p
          class="text-base font-medium leading-7 opacity-70 max-w-[700px] mx-3"
        >
          המטרה המרכזית הינה להוריד ממך את ההתעסקות על הלקוחות, בהשלמת כמה צעדים
          פשוטים העסק שלך מוען ותוכל להתחיל להתנסות במערכת מותאמת בשבילך!
        </p>
      </div>
    </div>

    <!-- steps -->
    <div class="flex flex-col lg:flex-row gap-10">
      <HowItWorkStep
        titleTransKey="צור חשבון באפליקציה"
        subTitleTransKey="הורד את האפליקציה וצור חשבון בכמה שניות"
        stepNumber={1}
      />

      <HowItWorkStep
        titleTransKey="צור עסק במערכת"
        subTitleTransKey="צור עסק כמה קליקים והגדר שעות פעילות ושירותים אותם אתה מציע"
        stepNumber={2}
      />

      <HowItWorkStep
        titleTransKey="שתף עם הלקוחות"
        subTitleTransKey="תשלח לינק ללקוחות שיוכלו להזמין מהאפליקציה או האתר"
        stepNumber={3}
        withArrow={false}
      />
    </div>
  </div>
</div>
