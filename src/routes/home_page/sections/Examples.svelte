<script lang="ts">
  import { containerRadius } from "$lib/consts/sizes";
  import DataButton from "../components/DataButton.svelte";
  import DeviceMock from "../components/DeviceMock.svelte";
  let imageIndex: number = -1;
  const images: string[] = [
    "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1488372759477-a7f4aa078cb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  function changeSelection(event: CustomEvent<any>) {
    imageIndex = event.detail.value;
  }
</script>

<section class="bg-base-200">
  <div class="flex flex-col gap-10 w-full px-3 py-10">
    <!-- top titles -->
    <div>
      <!-- title -->
      <h2 class="text-2xl font-bold text-center sm:text-4xl">
        צפה במערכת בפעולה!
      </h2>
      <!-- sub title -->
      <p class="max-w-3xl mx-auto mt-4 text-center opacity-70">
        לחץ על הכפתורים ותראה איך זה יראה על העסק שלך, ואיך הלקוחות שלך ישתמשו
        במערכת
      </p>
    </div>

    <!-- side buttons and image -->
    <div
      class="flex xl:flex-row flex-col items-center xl:justify-between justify-center max-w-[1600px] w-full mx-auto"
    >
      <!-- buttons -->
      <div class="space-y-4 max-w-xl">
        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={0}
          bg="bg-red-500"
          icon="mdi:sms"
          titleTransKey="תצוגת יומן"
          subTitleTransKey="מגוון אפשרויות תצוגה, גרירות של תורים ניווט בין עובדים, ושליטה מלאה על ההזמנות"
        />

        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={1}
          bg="bg-blue-500"
          icon="mdi:sms"
          titleTransKey="הזמנת תור"
          subTitleTransKey="עמוד העסק המעוצב שלך יאפשר הזמנת תור מהירה וקלילה ללקוחות שלך כדי שלא יתבלבלו"
        />

        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={2}
          bg="bg-yellow-500"
          icon="mdi:sms"
          titleTransKey="שליטה על עובדים"
          subTitleTransKey="פאנל ניהול עובדים מהמתקדמים ביותר, שליטה על הרשאות, כניסה ליומן, נתונים ודוחות על בסיס יומי"
        />

        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={3}
          bg="bg-indigo-700"
          icon="mdi:sms"
          titleTransKey="שיבוץ אירוע"
          subTitleTransKey="היומן שלנו מאפשר שיבוץ אירוע מכל סוג, מתריע לכם גם על אירועים אישיים במידה ותרצו ואפילו מסתנכרן עם יומנים חיצוניים"
        />
      </div>

      <!-- changin images -->

      <div id="images" class="py-10 w-full sm:flex justify-end">
        <div
          class="mx-auto xl:mx-0 py-5 px-5 {containerRadius} bg-base-300 bg-opacity-40 sm:w-[600px]"
        >
          <div class="max-w-[200px] mx-auto">
            <DeviceMock
              mediaSrc={images[Math.max(imageIndex, 0)]}
              uuid="ExamplePhone"
            />
          </div>
          <!-- <img
            alt=""
            width="620"
            height="620"
            src={}
            class="mx-auto {containerRadius} bg-yellow-300"
            style="color:transparent"
          />
        </div> -->
        </div>
      </div>
    </div>
  </div>
</section>
