<script lang="ts">
  import BookingController from "$lib/controllers/booking_controller";
  import { Duration } from "$lib/models/core/duration";
  import { setToMidNight } from "$lib/utils/dates_utils";
  import { addDuration } from "$lib/utils/duration_utils";
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
  import { Schedule } from "@syncfusion/ej2-schedule";
  import "@syncfusion/ej2-schedule/styles/material.css";
  import "@syncfusion/ej2-splitbuttons/styles/material.css";
  import { onMount } from "svelte";
  import { applyCategoryColor } from "../helpers/event_renderer";
  import { loadBookingMakerTimeData } from "../helpers/load_data";
  import { onEventClick } from "../helpers/on_tap_time_obj";
  const { Week } = schedule;

  sync.registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCfEx0Q3xbf1x0ZFRHallSTnZYUiweQnxTdEFjWH1ZcXVQRWBbWUxxWg=="
  );

  onMount(() => {
    Schedule.Inject(Week);
    BookingController.scheduleObj = new schedule.Schedule({
      width: "100%",
      height: "100%",
      views: ["Week"],
      workHours: { highlight: false },
      showQuickInfo: false,
      eventClick: onEventClick,
      minDate: setToMidNight(new Date()),
      timeScale: {},
      maxDate: addDuration(
        new Date(),
        new Duration({ days: BookingController.worker.daysToAllowBookings })
      ),

      eventSettings: {
        fields: {
          id: "id",
          subject: { name: "displayDate" },
          startTime: { name: "from" },
          endTime: { name: "to" },
        },
        enableMaxHeight: true,
        template: "#apptemplate",
        allowEditing: false,
      },
      eventRendered: (args: schedule.EventRenderedArgs) =>
        applyCategoryColor(args),
    });

    BookingController.scheduleObj.appendTo("#schedule");

    //when the user interact with the schedule and navigate between
    //dates need to load the new dates
    BookingController.scheduleObj.actionComplete = (args) => {
      if (
        args.requestType === "viewNavigate" ||
        args.requestType === "dateNavigate"
      ) {
        //delete the exsit events
        BookingController.scheduleObj.deleteEvent(
          Object.values(BookingController.timePickerObjects)
        );
        loadBookingMakerTimeData(
          BookingController.scheduleObj.getCurrentViewDates(),
          BookingController.worker,
          [30]
        );

        BookingController.scheduleObj.addEvent(
          Object.values(BookingController.timePickerObjects)
        );
      }
    };
    console.log(BookingController.timePickerObjects);
  });
</script>

<div id="schedule"></div>
