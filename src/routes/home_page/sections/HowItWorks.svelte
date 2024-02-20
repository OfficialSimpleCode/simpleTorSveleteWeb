<script>
  import HowItWorkStep from "../components/HowItWorkStep.svelte";
</script>

<div class="w-full bg-base-200">
  <div class="container mx-auto py-10 flex flex-col items-center gap-16">
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
    <div
      class="flex flex-col lg:flex-row xl:gap-x-10 md:gap-x-2 gap-x-5 gap-y-8"
    >
      <HowItWorkStep
        imageSrc="https://lottie.host/f6698e26-fdce-4eb9-bb80-def9a8874750/OL8jB5DdGx.json"
        titleTransKey="צור חשבון באפליקציה"
        subTitleTransKey="הורד את האפליקציה וצור חשבון בכמה שניות"
        stepNumber={1}
      />

      <HowItWorkStep
        imageSrc="https://lottie.host/daeffa4b-3884-476d-9e08-884b415465ad/uTx14abQ0f.json"
        titleTransKey="צור עסק במערכת"
        subTitleTransKey="צור עסק כמה קליקים והגדר שעות פעילות ושירותים אותם אתה מציע"
        stepNumber={2}
      />

      <HowItWorkStep
        imageSrc="https://lottie.host/9becd689-df5d-41c1-8130-50fa0c7d6a76/X9QFVK5d2J.json"
        titleTransKey="שתף עם הלקוחות"
        subTitleTransKey="תשלח לינק ללקוחות שיוכלו להזמין מהאפליקציה או האתר"
        stepNumber={3}
        withArrow={false}
      />
    </div>
  </div>
</div>
