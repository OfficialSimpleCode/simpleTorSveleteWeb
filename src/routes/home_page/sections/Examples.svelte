<script lang="ts">
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
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
  <div class="flex flex-col gap-10 w-full px-3 py-10 lg:py-28">
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
      id="images"
      class="flex xl:flex-row flex-col-reverse items-center xl:justify-between justify-center max-w-[1800px] w-full mx-auto bg-base-100 xl:py-0 sm:py-10 py-3 sm:px-[50px] px-[10px] {containerRadius}"
    >
      <!-- buttons -->
      <div class="flex flex-col xl:gap-y-8 gap-y-5 xl:w-[700px]">
        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={0}
          bg="bg-red-500"
          icon="mdi:sms"
          titleTransKey="תצוגת יומן"
          subTitleTransKey="5 אפשרויות תצוגה, גרירות, יומני עובדים, ותצוגת תור מפורטת"
        />

        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={1}
          bg="bg-blue-500"
          icon="mdi:sms"
          titleTransKey="הזמנת תור"
          subTitleTransKey="כפתור ברור במרכז המסך, 4 קליקים והתור הוזמן, אין אפשרות להסתבך"
        />

        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={2}
          bg="bg-yellow-500"
          icon="mdi:sms"
          titleTransKey="שליטה על עובדים"
          subTitleTransKey="פאנל עוצמתי, ניהול הרשאות, דוח הספקים וכניסה לימנים"
        />

        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={3}
          bg="bg-indigo-700"
          icon="mdi:sms"
          titleTransKey="שיבוץ אירוע"
          subTitleTransKey="סנכרון עם יומני חוץ, תמיכה בקביעת אירועים אישיים כולל התראות אישיות"
        />
        <DownloadAppButton />
      </div>

      <!-- changin images -->

      <div class="xl:py-10 pb-10 w-full sm:flex justify-end">
        <div
          class="mx-auto xl:mx-0 py-5 px-5 {containerRadius} bg-base-200 sm:w-[600px]"
        >
          <div class="sm:max-w-[300px] max-w-[250px] mx-auto">
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
