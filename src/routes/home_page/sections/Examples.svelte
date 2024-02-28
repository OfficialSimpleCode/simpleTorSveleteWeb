<script lang="ts">
  import { containerRadius } from "$lib/consts/sizes";
  import calendarViewsMov from "$lib/media/videos/calendar_views_mov.mp4";
  import createEventMov from "$lib/media/videos/create_event_mov.mp4";
  import orderMov from "$lib/media/videos/order_mov.mp4";
  import workersPanelMov from "$lib/media/videos/workers_panel_mov.mp4";
  import DataButton from "../components/DataButton.svelte";
  import DeviceMock from "../components/DeviceMock.svelte";
  let imageIndex: number = -1;
  const images: string[] = [
    calendarViewsMov,
    orderMov,
    workersPanelMov,
    createEventMov,
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
        <!-- <DownloadAppButton /> -->
      </div>

      <!-- changin images -->

      <div class="xl:py-10 pb-10 w-full sm:flex justify-end">
        <div
          class="mx-auto xl:mx-0 py-5 px-5 {containerRadius} bg-base-200 sm:w-[600px]"
        >
          <div class="sm:max-w-[300px] max-w-[250px] mx-auto">
            <DeviceMock
              mediaSrc={images[Math.max(imageIndex, 0)]}
              uuid={images[Math.max(imageIndex, 0)]}
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
