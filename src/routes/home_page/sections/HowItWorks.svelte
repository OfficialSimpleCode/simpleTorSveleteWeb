<script>
  import HowItWorkStep from "../components/HowItWorkStep.svelte";
</script>

<div class="w-full">
  <div class="container mx-auto my-32 flex flex-col items-center gap-16">
    <!-- top section -->
    <div class="flex flex-col gap-16">
      <div class="flex flex-col gap-2 text-center">
        <!-- title -->
        <h2 class="mb-2 text-3xl font-extrabold leading-tight lg:text-4xl">
          איך זה עובד
        </h2>

        <!-- sub title -->
        <p
          class="text-base font-medium leading-7 opacity-70 max-w-[700px] mx-3"
        >
          הפיכת העסק לאוטונומי ב 3 שלבים
        </p>
      </div>
    </div>

    <!-- steps -->
    <div class="flex flex-col lg:flex-row gap-10">
      <HowItWorkStep
        imageSrc="https://media.tenor.com/hpE4fk0vL-QAAAAi/multiversx-egld.gif"
        titleTransKey="צור חשבון באפליקציה"
        subTitleTransKey="הורד את האפליקציה וצור חשבון בכמה שניות"
        stepNumber={1}
      />

      <HowItWorkStep
        imageSrc="https://media.tenor.com/hpE4fk0vL-QAAAAi/multiversx-egld.gif"
        titleTransKey="צור עסק במערכת"
        subTitleTransKey="צור עסק כמה קליקים והגדר שעות פעילות ושירותים אותם אתה מציע"
        stepNumber={2}
      />

      <HowItWorkStep
        imageSrc="https://media.tenor.com/hpE4fk0vL-QAAAAi/multiversx-egld.gif"
        titleTransKey="שתף עם הלקוחות"
        subTitleTransKey="תשלח לינק ללקוחות שיוכלו להזמין מהאפליקציה או האתר"
        stepNumber={3}
        withArrow={false}
      />
    </div>
  </div>
</div>
