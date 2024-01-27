<script lang="ts">
  import { onMount } from "svelte";

  import * as sync from "@syncfusion/ej2-base";
  import "@syncfusion/ej2-base/styles/material.css";
  import "@syncfusion/ej2-buttons/styles/material.css";
  import "@syncfusion/ej2-calendars/styles/material.css";
  import "@syncfusion/ej2-dropdowns/styles/material.css";
  import "@syncfusion/ej2-inputs/styles/material.css";
  import "@syncfusion/ej2-lists/styles/material.css";
  import "@syncfusion/ej2-navigations/styles/material.css";
  import "@syncfusion/ej2-popups/styles/material.css";
  import * as schedule from "@syncfusion/ej2-schedule";

  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { Duration } from "$lib/models/core/duration";
  import TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
  import { setToMidNight } from "$lib/utils/dates_utils";
  import { addDuration } from "$lib/utils/duration_utils";
  import { Schedule, WorkWeek } from "@syncfusion/ej2-schedule";
  import { loadBookingMakerTimeData } from "../helpers/load_data";

  onMount(() => {
    sync.registerLicense(
      "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCfEx0Q3xbf1x0ZFRHallSTnZYUiweQnxTdEFjWH1ZcXVQRWBbWUxxWg=="
    );

    loadBookingMakerTimeData(
      [
        new Date(2024, 0, 26),
        new Date(2024, 0, 27),
        new Date(2024, 0, 28),
        new Date(2024, 0, 29),
        new Date(2024, 0, 30),
        new Date(2024, 0, 31),
        new Date(2024, 1, 1),
        new Date(2024, 1, 2),
        new Date(2024, 1, 3),
        new Date(2024, 1, 4),
        new Date(2024, 1, 5),
      ],
      BookingController.worker,
      [60]
    );

    Schedule.Inject(WorkWeek);
    let scheduleObj = new schedule.Schedule({
      width: "100%",
      height: "100%",
      views: ["WorkWeek"],
      workHours: { highlight: false },
      showQuickInfo: false,
      eventClick: onEventClick,
      minDate: setToMidNight(new Date()),
      timeScale: {
        enable: false,
      },
      maxDate: addDuration(
        new Date(),
        new Duration({ days: BookingController.worker.daysToAllowBookings })
      ),
      eventSettings: {
        dataSource: BookingController.timePickerObjects,
        allowAdding: false,
        allowDeleting: false,
        allowEditing: false,

        fields: {
          subject: { name: "displayDate" },
          startTime: { name: "from" },
          endTime: { name: "to" },
        },
      },
    });

    scheduleObj.appendTo("#schedule");
    scheduleObj.actionComplete = (args) => {
      if (
        args.requestType === "viewNavigate" ||
        args.requestType === "dateNavigate"
      ) {
        console.log(scheduleObj.getCurrentViewDates());

        loadBookingMakerTimeData(
          scheduleObj.getCurrentViewDates(),
          BookingController.worker,
          [60]
        );
        console.log(
          "BookingController.timePickerObjects",
          BookingController.timePickerObjects
        );
        scheduleObj.addEvent(BookingController.timePickerObjects);
      }
    };
    console.log(scheduleObj.getCurrentViewDates());
    loadBookingMakerTimeData(
      scheduleObj.getCurrentViewDates(),
      BookingController.worker,
      [60]
    );
    console.log(BookingController.timePickerObjects);
    // scheduleObj.addEvent(data);
  });

  function onEventClick(args: schedule.EventClickArgs): void {
    console.log(args.event);
    const timePickerObj = TimePickerObj.fromScheduleEvent(args.event);
    console.log(timePickerObj);
    $bookingMakerStore.date = timePickerObj.displayDate;
    $bookingMakerStore.currentStep += 1;
  }
</script>

<div id="schedule"></div>
