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

  onMount(() => {
    sync.registerLicense(
      "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCfEx0RHxbf1x0ZFRGallSTnddUiweQnxTdEFjWH1ccXRQRWFfV0x2XQ=="
    );

    Schedule.Inject(WorkWeek);
    let scheduleObj = new schedule.Schedule({
      width: "100%",
      height: "100%",
      selectedDate: new Date(2024, 1, 29),
      views: ["WorkWeek"],
      workHours: { highlight: false },
      showQuickInfo: false,
      timeScale: {
        enable: false,
      },
      eventSettings: {
        dataSource: BookingController.timePickerObjects,
        allowAdding: false,
        enableMaxHeight: true,
        allowDeleting: false,
        allowEditing: false,

        fields: {
          id: "id",
          subject: { name: "displayDate" },
          startTime: { name: "from" },
          endTime: { name: "to" },
        },
      },
    });
    scheduleObj.appendTo("#schedule");
  });
</script>

<div id="schedule"></div>
