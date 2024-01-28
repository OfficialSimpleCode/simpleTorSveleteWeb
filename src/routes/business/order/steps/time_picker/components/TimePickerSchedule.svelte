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
  import { loadBookingMakerTimeData } from "../helpers/load_data";
  import { onEventClick } from "../helpers/on_tap_time_obj";
  const { Week } = schedule;

  sync.registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCfEx0Q3xbf1x0ZFRHallSTnZYUiweQnxTdEFjWH1ZcXVQRWBbWUxxWg=="
  );
  var data = [
    {
      Id: 1,
      Subject: "Testing",
      StartTime: addDuration(new Date(), new Duration({ minutes: 200 })),
      EndTime: addDuration(new Date(), new Duration({ minutes: 220 })),
    },
    {
      Id: 2,
      Subject: "Vacation",
      StartTime: new Date(),
      EndTime: addDuration(new Date(), new Duration({ minutes: 60 })),
    },
  ];
  let scheduleObj: schedule.Schedule;
  onMount(() => {
    Schedule.Inject(Week);
    scheduleObj = new schedule.Schedule({
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
          subject: { name: "displayDate" },
          startTime: { name: "from" },
          endTime: { name: "to" },
        },
        allowDeleting: false,
        allowEditing: false,
      },
    });

    scheduleObj.appendTo("#schedule");

    loadBookingMakerTimeData(
      scheduleObj.getCurrentViewDates(),
      BookingController.worker,
      [60]
    );
    scheduleObj.addEvent(BookingController.timePickerObjects);

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
    console.log(BookingController.timePickerObjects);
  });
  function add() {
    console.log(new Date());
    console.log(addDuration(new Date(), new Duration({ minutes: 60 })));
    let Data = [
      {
        Id: 3,
        Subject: "",
        StartTime: new Date(),
        EndTime: addDuration(new Date(), new Duration({ minutes: 60 })),
      },
      {
        Id: 4,
        Subject: "",
        StartTime: new Date(),
        EndTime: addDuration(new Date(), new Duration({ minutes: 60 })),
      },
    ];
    scheduleObj.addEvent(Data);
    scheduleObj.refresh();
  }
  // var data = [
  //   {
  //     Id: 1,
  //     Subject: "Testing",
  //     StartTime: new Date(2018, 1, 11, 9, 0),
  //     EndTime: new Date(2018, 1, 11, 10, 0),
  //     IsAllDay: false,
  //   },
  //   {
  //     Id: 2,
  //     Subject: "Vacation",
  //     StartTime: new Date(2018, 1, 13, 9, 0),
  //     EndTime: new Date(2018, 1, 13, 10, 0),
  //     IsAllDay: false,
  //   },
  // ];
  // Schedule.Inject(Week);
  // const scheduleObj = new schedule.Schedule({
  //   width: "100%",
  //   height: "550px",
  //   views: ["Week"],
  //   selectedDate: new Date(2018, 1, 15),
  //   eventSettings: { dataSource: data },
  // });
  // onMount(() => {
  //   scheduleObj.appendTo("#schedule");
  // });

  // function onclick() {
  //   let Data = [
  //     {
  //       Id: 3,
  //       Subject: "Conference",
  //       StartTime: new Date(2018, 1, 12, 9, 0),
  //       EndTime: new Date(2018, 1, 12, 10, 0),
  //       IsAllDay: false,
  //     },
  //     {
  //       Id: 4,
  //       Subject: "Meeting",
  //       StartTime: new Date(2018, 1, 15, 10, 0),
  //       EndTime: new Date(2018, 1, 15, 11, 30),
  //       IsAllDay: false,
  //     },
  //   ];
  //   scheduleObj.addEvent(Data);
  // }
</script>

<div id="schedule"></div>
<div
  role="button"
  tabindex="0"
  class="btn btn-ghost btn-circle"
  on:click={() => {}}
  on:keypress={() => {}}
></div>
