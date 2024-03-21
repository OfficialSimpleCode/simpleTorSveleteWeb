<script lang="ts">
  import { containerRadius } from "$lib/consts/sizes";
  import calendarViewsMov from "$lib/media/videos/calendar_views_mov.mp4";
  import createEventMov from "$lib/media/videos/create_event_mov.mp4";
  import orderMov from "$lib/media/videos/order_mov.mp4";
  import workersPanelMov from "$lib/media/videos/workers_panel_mov.mp4";
  import { _, translate } from "$lib/utils/translate";
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
        {translate("watchSystem", $_, false)}
      </h2>
      <!-- sub title -->
      <p
        class="mx-auto my-4 w-full max-w-3xl bg-transparent text-center opacity-70"
      >
        {translate("clickToWatch", $_, false)}
      </p>
    </div>

    <!-- side buttons and image -->
    <div
      id="images"
      class="flex xl:flex-row flex-col-reverse items-center pt-10 xl:justify-between justify-center max-w-[1700px] w-full mx-auto bg-base-100 xl:py-0 sm:py-10 py-3 sm:px-[50px] px-[10px] {containerRadius}"
    >
      <!-- buttons -->
      <div class="flex flex-col xl:gap-y-8 gap-y-5 xl:w-[700px]">
        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={0}
          titleTransKey={translate("calendarView", $_, false)}
          subTitleTransKey={translate("calendarViewExample", $_, false)}
        />

        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={1}
          titleTransKey={translate("order", $_, false)}
          subTitleTransKey={translate("noComples", $_, false)}
        />

        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={2}
          titleTransKey={translate("workersControl", $_, false)}
          subTitleTransKey={translate("workersControlExample", $_, false)}
        />

        <DataButton
          on:changeSelection={changeSelection}
          selected={imageIndex}
          currentIndex={3}
          titleTransKey={translate("placingAnEvent", $_, false)}
          subTitleTransKey={translate("placingEventDesc", $_, false)}
        />
        <!-- <DownloadAppButton /> -->
      </div>

      <!-- changin images -->

      <div class="xl:py-10 pb-10 w-[80%] sm:flex justify-end">
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
