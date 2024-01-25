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

  import BookingController from "$lib/controllers/booking_controller";
  import { Schedule } from "@syncfusion/ej2-schedule";
  import "@syncfusion/ej2-schedule/styles/material.css";
  import "@syncfusion/ej2-splitbuttons/styles/material.css";
  import { loadData } from "../steps/time_picker/helpers/load_data";
  const { WorkWeek } = schedule;

  loadData([new Date(2024, 1, 29)], BookingController.worker, [60]);
  console.log(BookingController.timePickerObjects);

  let data: object[] = [
    {
      Subject: "Paris",
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 15, 10, 50),
    },
    {
      Subject: "Paris",
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 15, 10, 50),
    },
    {
      Subject: "Paris",
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 15, 10, 50),
    },
    {
      Subject: "Paris",
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 15, 10, 50),
    },
  ];

  onMount(() => {
    sync.registerLicense(
      "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCfEx0RHxbf1x0ZFRGallSTnddUiweQnxTdEFjWH1ccXRQRWFfV0x2XQ=="
    );

    Schedule.Inject(WorkWeek);
    let scheduleObj = new schedule.Schedule({
      width: "100%",
      height: "100%",
      selectedDate: new Date(2018, 1, 15),
      views: ["WorkWeek"],
      enablePersistence: true,
      eventSettings: {
        dataSource: data,
        allowAdding: false,

        allowDeleting: false,
        allowEditing: false,
      },
    });
    scheduleObj.appendTo("#schedule");
  });
</script>

<div id="schedule"></div>
